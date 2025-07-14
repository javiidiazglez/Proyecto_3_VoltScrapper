/**
 * Script de pruebas simplificado
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Ejecutando Suite de Pruebas - Proyecto 3 Scrapper');
console.log('===================================================\n');

// Función helper para ejecutar pruebas
function runTest(testName, testFunction) {
    try {
        console.log(`🔍 Ejecutando: ${testName}...`);
        const result = testFunction();
        if (result) {
            console.log(`✅ ${testName}: PASADA\n`);
            return true;
        } else {
            console.log(`❌ ${testName}: FALLIDA\n`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${testName}: ERROR - ${error.message}\n`);
        return false;
    }
}

// 1. Verificar que el archivo HTML existe
function testHTMLExists() {
    const htmlPath = path.resolve(__dirname, '../index.html');
    return fs.existsSync(htmlPath);
}

// 2. Validar estructura HTML básica
function testHTMLStructure() {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const checks = [
        /<!DOCTYPE html>/i,
        /<html[^>]*lang=["']es["']/i,
        /<meta[^>]*charset=["']UTF-8["']/i,
        /<meta[^>]*name=["']viewport["']/i,
        /<title>/i,
        /<form[^>]*id=["']report-form["']/i,
        /<input[^>]*required/i,
        /<button[^>]*type=["']submit["']/i,
        /<canvas[^>]*id=["']background-canvas["']/i,
        /<(main|section|footer)/i
    ];
    
    return checks.every(check => check.test(html));
}

// 3. Validar CSS básico
function testCSSPresence() {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    if (!cssMatch) return false;
    
    const css = cssMatch[1];
    
    const checks = [
        /:root\s*\{[^}]*--[\w-]+:/,
        /display:\s*flex/,
        /@media[^{]*\{/,
        /transition:\s*[^;]+/,
        /@keyframes\s+[\w-]+/,
        /\.[\w-]+\s*\{/,
        /#[\w-]+\s*\{/
    ];
    
    return checks.filter(check => check.test(css)).length >= 5;
}

// 4. Validar JavaScript básico
function testJavaScriptPresence() {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const jsMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!jsMatch) return false;
    
    const js = jsMatch[1];
    
    const checks = [
        /addEventListener\s*\(/,
        /getElementById\s*\(/,
        /querySelector\s*\(/,
        /fetch\s*\(/,
        /getContext\s*\(/,
        /setInterval\s*\(/,
        /webhookUrl\s*=/
    ];
    
    return checks.filter(check => check.test(js)).length >= 5;
}

// 5. Validar configuración del proyecto
function testProjectConfiguration() {
    const files = [
        'package.json',
        '_config.yml',
        'README.md',
        'Gemfile',
        '.gitignore'
    ];
    
    return files.every(file => {
        const filePath = path.resolve(__dirname, '..', file);
        return fs.existsSync(filePath);
    });
}

// 6. Validar estructura de testing
function testTestingStructure() {
    const testFiles = [
        'tests/html-validator.js',
        'tests/css-validator.js',
        'tests/form.test.js',
        'tests/canvas.test.js',
        'tests/api.test.js',
        'jest.config.js',
        'package.json'
    ];
    
    return testFiles.every(file => {
        const filePath = path.resolve(__dirname, '..', file);
        return fs.existsSync(filePath);
    });
}

// 7. Validar tamaño de archivos
function testFileSize() {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const totalSize = html.length;
    const maxSize = 500 * 1024; // 500KB
    
    console.log(`   📊 Tamaño total: ${(totalSize / 1024).toFixed(2)} KB`);
    
    return totalSize < maxSize;
}

// Ejecutar todas las pruebas
const tests = [
    { name: 'Archivo HTML existe', fn: testHTMLExists },
    { name: 'Estructura HTML válida', fn: testHTMLStructure },
    { name: 'CSS presente y válido', fn: testCSSPresence },
    { name: 'JavaScript presente y válido', fn: testJavaScriptPresence },
    { name: 'Configuración del proyecto', fn: testProjectConfiguration },
    { name: 'Estructura de testing', fn: testTestingStructure },
    { name: 'Tamaño de archivos optimizado', fn: testFileSize }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
    if (runTest(test.name, test.fn)) {
        passed++;
    } else {
        failed++;
    }
});

// Resumen final
console.log('===================================================');
console.log('📊 RESUMEN DE PRUEBAS');
console.log('===================================================');
console.log(`✅ Pruebas pasadas: ${passed}`);
console.log(`❌ Pruebas fallidas: ${failed}`);
console.log(`🎯 Total: ${passed + failed}`);
console.log(`📈 Porcentaje de éxito: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed === 0) {
    console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('✅ Tu proyecto está listo para producción');
} else {
    console.log(`\n⚠️  ${failed} prueba(s) fallaron`);
    console.log('🔧 Revisa los errores arriba para más detalles');
}

console.log('\n===================================================');
console.log('🚀 Proyecto 3 - Scrapper | Testing Suite Complete');
console.log('===================================================');
