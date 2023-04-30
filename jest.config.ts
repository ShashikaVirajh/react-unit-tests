import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'],
  coverageReporters: ['text-summary', 'lcov'],
  transformIgnorePatterns: ['/node_modules/(?!axios)/']
};

export default config;
