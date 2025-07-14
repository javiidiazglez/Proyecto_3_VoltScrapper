/**
 * Configuración de Jest
 */
module.exports = {
    displayName: 'Proyecto 3 - Scrapper Tests',
    testEnvironment: 'node',
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
        'text'
    ],
    testTimeout: 10000,
    verbose: true,
    bail: false,
    maxWorkers: 1
};
