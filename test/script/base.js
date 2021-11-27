const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    roots: ['<rootDir>/', '<rootDir>/test/'],
    verbose: true,
    // Jest 环境准备好后的拓展脚本
    setupFilesAfterEnv: [
        '<rootDir>/test/script/setup.ts',
    ],
    testMatch: ['<rootDir>/test/**/*.(spec|test).(js|jsx|ts|tsx)'],
    testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
    transformIgnorePatterns: ['/node_modules/', '/scripts/'],
    // 使用 ts-jest 来执行 typescript 编写的测试用例
    transform: {
        '.*\\.tsx?$': 'ts-jest',
    },
    snapshotSerializers: ['jest-serializer-html'],
    collectCoverage: false,
    collectCoverageFrom: [
        // glob模式，非正则模式
        'src/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/test/**',
        '!**/dist/**',
    ],
    coverageReporters: ['text', 'lcov', 'clover', 'json'],
    reporters: ['default'],
    moduleNameMapper: {
        // 文件资源的 mock
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/__mocks__/fileMock.js',
        // 样式文件的 mock
        '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
            // https://kulshekhar.github.io/ts-jest/user/config/babelConfig
            babelConfig: true,
        },
    },
};
