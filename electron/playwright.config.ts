import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  testIgnore: "./core/**",
  retries: 0,
  timeout: 120000,
};

export default config;
