/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const buildJestConfig = async (config: Config): Promise<Config> => {
  return await createJestConfig(config)();
};

const buildConfig = async (): Promise<Config> => {
  const node = await buildJestConfig({
    displayName: { name: "NODE", color: "red" },
    testMatch: ["**/*.node.test.ts?(x)"],
    testEnvironment: "node",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  });

  const db = await buildJestConfig({
    displayName: { name: "DB", color: "green" },
    testMatch: ["**/*.db.test.ts?(x)"],
    testEnvironment: "node",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  });

  const dom = await buildJestConfig({
    displayName: { name: "DOM", color: "blue" },
    testMatch: ["**/*.dom.test.ts?(x)"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  });

  const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/src/__tests__/**/*.{js,jsx,ts,tsx}",
    ],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["node_modules"],
    coverageProvider: "babel",
    coverageReporters: ["lcov"],
    projects: [node, db, dom],
  };

  return config;
};

export default buildConfig;
