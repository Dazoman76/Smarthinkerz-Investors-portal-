import { eq } from "drizzle-orm";
import { desc, and, or, like, sql } from "drizzle-orm/expressions";
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

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for Render/Neon Postgres
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
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

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

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

// ============================================
// CONTENT BLOCKS
// ============================================

export async function getContentBlock(blockKey: string): Promise<ContentBlock | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot fetch content block: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(contentBlocks)
      .where(eq(contentBlocks.blockKey, blockKey))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("[Database] Failed to get content block:", error);
    throw error;
  }
}

export async function createContentBlock(block: InsertContentBlock): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create content block: database not available");
    return;
  }

  try {
    await db.insert(contentBlocks).values(block);
  } catch (error) {
    console.error("[Database] Failed to create content block:", error);
    throw error;
  }
}
