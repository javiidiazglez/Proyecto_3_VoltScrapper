// Setup básico para Jest
const { JSDOM } = require('jsdom');

// Configurar DOM global
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost'
});

global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

// Mock para fetch API
global.fetch = jest.fn();

// Mock para Canvas API
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillStyle: '',
    font: '',
    fillText: jest.fn(),
    fillRect: jest.fn(),
    clearRect: jest.fn(),
}));

// Mock para setInterval y clearInterval
global.setInterval = jest.fn();
global.clearInterval = jest.fn();

// Mock para getComputedStyle
global.getComputedStyle = jest.fn(() => ({
    getPropertyValue: jest.fn(() => '#00a99d')
}));

// Configurar timeout
jest.setTimeout(10000);
