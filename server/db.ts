import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { 
  InsertUser, users,
  contentBlocks, InsertContentBlock, ContentBlock,
  contentVersions, InsertContentVersion,
  investors, InsertInvestor, Investor,
  investorDocuments, InsertInvestorDocument,
  documentAccessLogs, InsertDocumentAccessLog,
  mediaLibrary, InsertMediaLibrary,
  analyticsEvents, InsertAnalyticsEvent,
  auditLogs, InsertAuditLog,
  notifications, InsertNotification,
  scheduledPublishing, InsertScheduledPublishing
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: pg.Pool | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================
// USER MANAGEMENT
// ============================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    }
  });

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = 'super_admin';
    updateSet.role = 'super_admin';
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onConflictDoUpdate({
    target: users.openId,
    set: updateSet,
  });
}

// ============================================
// CONTENT BLOCKS
// ============================================

export async function getContentBlock(blockKey: string): Promise<ContentBlock | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(contentBlocks).where(eq(contentBlocks.blockKey, blockKey)).limit(1);
  return result[0] ?? null;
}

export async function getAllContentBlocks(status?: string): Promise<ContentBlock[]> {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return await db.select().from(contentBlocks).where(eq(contentBlocks.status, status));
  }
  return await db.select().from(contentBlocks);
}

export async function createContentBlock(block: InsertContentBlock): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(contentBlocks).values(block);
}

export async function updateContentBlock(
  blockId: number,
  updates: Partial<Omit<InsertContentBlock, 'id' | 'blockKey'>>,
  userId: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(contentBlocks)
    .set({ ...updates, updatedBy: userId, updatedAt: new Date() })
    .where(eq(contentBlocks.id, blockId));
}

export async function deleteContentBlock(blockId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(contentBlocks).where(eq(contentBlocks.id, blockId));
}

// ============================================
// CONTENT VERSIONS
// ============================================

export async function getContentVersions(blockId: number): Promise<InsertContentVersion[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contentVersions).where(eq(contentVersions.blockId, blockId));
}

export async function rollbackContentVersion(versionId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(contentVersions)
    .set({ isActive: true })
    .where(eq(contentVersions.id, versionId));
}

// ============================================
// INVESTORS
// ============================================

export async function getAllInvestors(): Promise<Investor[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(investors);
}

export async function rejectInvestor(id: number, notes: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(investors)
    .set({ status: "rejected", rejectionNotes: notes, updatedAt: new Date() })
    .where(eq(investors.id, id));
}

export async function updateInvestor(
  id: number,
  updates: Partial<Omit<InsertInvestor, 'id'>>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(investors)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(investors.id, id));
}

// ============================================
// DOCUMENTS
// ============================================

export async function getAllDocuments(): Promise<InsertInvestorDocument[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(investorDocuments);
}

// ============================================
// AUDIT LOGS
// ============================================

export async function createAuditLog(log: InsertAuditLog): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values({ ...log, createdAt: new Date() });
}

export async function getAuditLogs(limit = 50): Promise<InsertAuditLog[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(auditLogs).orderBy(auditLogs.createdAt).limit(limit);
}

// ============================================
// ANALYTICS
// ============================================

export async function getAnalyticsSummary(): Promise<InsertAnalyticsEvent[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(analyticsEvents);
}
