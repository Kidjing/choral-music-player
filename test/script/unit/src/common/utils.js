const baseConfig = require('../../../base');

Object.assign(baseConfig, {
    testMatch: ['<rootDir>/test/unit/src/common/utils.(spec|test).ts'],
    /**
     * 独立模块的单测默认统计覆盖率
     */
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/common/utils.ts'],
    coveragePathIgnorePatterns: [],
    testEnvironmentOptions: {},
});

module.exports = baseConfig;
