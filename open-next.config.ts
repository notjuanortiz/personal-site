import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare configuration.
 * R2 incremental cache is optional - uncomment and configure for ISR/caching.
 * @see https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
  // incrementalCache: r2IncrementalCache,
});
