import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e", timeout: 30000, use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [ { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }, { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } } ],
  webServer: { command: "npm run dev -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI, timeout: 120000, env: { RESEND_API_KEY: "test-key", CONTACT_TO_EMAIL: "test@example.com", CONTACT_FROM_EMAIL: "site@example.com", UPSTASH_REDIS_REST_URL: "https://example.com", UPSTASH_REDIS_REST_TOKEN: "test-token" } }
});
