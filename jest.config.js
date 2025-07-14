/**
 * Configuración de Jest
 */
module.exports = {
    displayName: 'Proyecto 3 - Scrapper Tests',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: [
        '<rootDir>/tests/**/*.test.js'
    ],
    collectCoverageFrom: [
        'index.html',
        '!node_modules/**',
        '!tests/**',
        '!coverage/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'html',
        'text',
        'text-summary',
        'lcov'
    ],
    testTimeout: 30000,
    verbose: true,
    bail: false,
    maxWorkers: '50%',
    testSequencer: '@jest/test-sequencer'
};
