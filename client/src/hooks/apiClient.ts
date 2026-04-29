import { API_URL } from "../const";
import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@server/routers/_app";

export const api = createTRPCClient<AppRouter>({
  url: `${API_URL}/trpc`,
});
