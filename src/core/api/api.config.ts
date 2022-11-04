import { QueryClientConfig } from "@tanstack/react-query";

// ⛔️ Only use in the test utils ⛔️
export const testQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: () => {
      /** Ignore me 😅 */
    },
  },
};
