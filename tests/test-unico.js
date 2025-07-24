#!/usr/bin/env node

/**
 * Test único completo - Proyecto 3 VoltScrapper
 * Todas las pruebas en un solo archivo
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Ejecutando Suite de Pruebas Completa - Proyecto 3 VoltScrapper');
console.log('='.repeat(60));

// Leer archivo HTML
const htmlPath = path.resolve(__dirname, '../index.html');
let html = '';
let testsPassed = 0;
let testsTotal = 0;

try {
    html = fs.readFileSync(htmlPath, 'utf8');
} catch (error) {
    console.log('❌ Error: No se pudo leer index.html');
    process.exit(1);
}

// Función para ejecutar test
function runTest(name, testFunction) {
    testsTotal++;
    console.log(`🔍 Ejecutando: ${name}...`);
    
    try {
        const result = testFunction();
        if (result) {
            console.log(`✅ ${name}: PASADA`);
            testsPassed++;
        } else {
            console.log(`❌ ${name}: FALLIDA`);
        }
    } catch (error) {
        console.log(`❌ ${name}: ERROR - ${error.message}`);
    }
}

// === PRUEBAS HTML ===
runTest('Archivo HTML existe', () => {
    return html.length > 0;
});

runTest('DOCTYPE válido', () => {
    return /<!DOCTYPE html>/i.test(html);
});

runTest('HTML con lang', () => {
    return /<html[^>]*lang=/i.test(html);
});

runTest('Meta charset', () => {
    return /<meta[^>]*charset=/i.test(html);
});

runTest('Meta viewport', () => {
    return /<meta[^>]*name="viewport"/i.test(html);
});

runTest('Título presente', () => {
    return /<title>/i.test(html);
});

runTest('Formulario presente', () => {
    return /<form/i.test(html);
});

runTest('Input presente', () => {
    return /<input/i.test(html);
});

runTest('Button presente', () => {
    return /<button/i.test(html);
});

runTest('Canvas presente', () => {
    return /<canvas/i.test(html);
});

// === PRUEBAS CSS ===
runTest('CSS embebido presente', () => {
    return /<style/i.test(html);
});

runTest('CSS Variables definidas', () => {
    return /--[a-zA-Z-]+:/g.test(html);
});

runTest('Flexbox usado', () => {
    return /display:\s*flex/i.test(html);
});

runTest('Responsive queries', () => {
    return /@media/i.test(html);
});

runTest('Animaciones CSS', () => {
    return /@keyframes/i.test(html);
});

runTest('Transiciones CSS', () => {
    return /transition:/i.test(html);
});

// === PRUEBAS JAVASCRIPT ===
runTest('JavaScript presente', () => {
    return /<script/i.test(html);
});

runTest('Event listeners', () => {
    return /addEventListener/i.test(html);
});

runTest('DOM queries', () => {
    return /(getElementById|querySelector)/i.test(html);
});

runTest('Funciones definidas', () => {
    return /function\s+\w+/i.test(html);
});

runTest('Canvas context', () => {
    return /getContext/i.test(html);
});

// === PRUEBAS FUNCIONALES ===
runTest('Formulario con action', () => {
    return /<form[^>]*action=/i.test(html);
});

runTest('Input con required', () => {
    return /<input[^>]*required/i.test(html);
});

runTest('Button con type', () => {
    return /<button[^>]*type=/i.test(html);
});

runTest('Estructura semántica', () => {
    return /<main/i.test(html) || /<section/i.test(html);
});

// === PRUEBAS DE ACCESIBILIDAD ===
runTest('Labels para inputs', () => {
    return /<label/i.test(html);
});

runTest('Alt text preparado', () => {
    return /alt=/i.test(html) || !/<img/i.test(html);
});

runTest('Headings estructurados', () => {
    return /<h[1-6]/i.test(html);
});

// === PRUEBAS DE RENDIMIENTO ===
runTest('Tamaño optimizado', () => {
    const sizeKB = html.length / 1024;
    console.log(`   📊 Tamaño: ${sizeKB.toFixed(2)} KB`);
    return sizeKB < 50; // Menos de 50KB
});

runTest('CSS inline optimizado', () => {
    const cssMatches = html.match(/<style[^>]*>(.*?)<\/style>/gis);
    if (cssMatches) {
        const cssLength = cssMatches.join('').length;
        console.log(`   📊 CSS: ${(cssLength / 1024).toFixed(2)} KB`);
        return cssLength < 20000; // Menos de 20KB de CSS
    }
    return true;
});

runTest('JavaScript optimizado', () => {
    const jsMatches = html.match(/<script[^>]*>(.*?)<\/script>/gis);
    if (jsMatches) {
        const jsLength = jsMatches.join('').length;
        console.log(`   📊 JS: ${(jsLength / 1024).toFixed(2)} KB`);
        return jsLength < 15000; // Menos de 15KB de JS
    }
    return true;
});

// === RESUMEN FINAL ===
console.log('='.repeat(60));
console.log('📊 RESUMEN DE PRUEBAS');
console.log('='.repeat(60));
console.log(`✅ Pruebas pasadas: ${testsPassed}`);
console.log(`❌ Pruebas fallidas: ${testsTotal - testsPassed}`);
console.log(`🎯 Total: ${testsTotal}`);
console.log(`📈 Porcentaje de éxito: ${((testsPassed / testsTotal) * 100).toFixed(1)}%`);

if (testsPassed === testsTotal) {
    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('✅ Tu proyecto está listo para producción');
} else {
    console.log('⚠️  Algunas pruebas fallaron, revisa el código');
}

console.log('='.repeat(60));
console.log('🚀 Proyecto 3 - VoltScrapper | Test Suite Complete');
console.log('='.repeat(60));

// Salir con código apropiado
process.exit(testsPassed === testsTotal ? 0 : 1);
