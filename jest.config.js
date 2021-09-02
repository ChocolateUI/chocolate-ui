module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["./tests/setup.ts"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{ts,tsx,js,jsx,mjs}',
  ],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'report',
      },
    ],
  ],
  testURL: "http://localhost",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "!components/**/style.{js,jsx,ts,tsx}"
  ],
};