/**
 * Pruebas de accesibilidad básicas sin Puppeteer
 */

const fs = require('fs');
const path = require('path');

function runAccessibilityTests() {
    console.log('♿ Ejecutando pruebas de accesibilidad...\n');
    
    try {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        const checks = [
            {
                name: 'Atributo lang en HTML',
                test: /<html[^>]*lang=["']es["']/i,
                passed: false
            },
            {
                name: 'Meta viewport para responsive',
                test: /<meta[^>]*name=["']viewport["']/i,
                passed: false
            },
            {
                name: 'Labels para inputs',
                test: /<label[^>]*for=["'][^"']+["']/i,
                passed: false
            },
            {
                name: 'Botones con texto descriptivo',
                test: /<button[^>]*>(?!<\/button>)[^<]*[^<]*<\/button>/i,
                passed: false
            },
            {
                name: 'Headings estructurados',
                test: /<h[1-6][^>]*>[^<]+<\/h[1-6]>/i,
                passed: false
            },
            {
                name: 'Elementos semánticos HTML5',
                test: /<(main|nav|header|footer|section|article)[^>]*>/i,
                passed: false
            },
            {
                name: 'Campos de formulario requeridos',
                test: /<input[^>]*required[^>]*>/i,
                passed: false
            },
            {
                name: 'Estructura de navegación',
                test: /<(nav|header|main|footer)/i,
                passed: false
            },
            {
                name: 'Elementos enfocables',
                test: /<(button|input|select|textarea|a)[^>]*>/i,
                passed: false
            },
            {
                name: 'Texto alternativo preparado',
                test: /<(img|canvas|iframe)/i,
                passed: false
            }
        ];
        
        let passed = 0;
        
        checks.forEach(check => {
            check.passed = check.test.test(html);
            if (check.passed) {
                console.log(`✅ ${check.name}`);
                passed++;
            } else {
                console.log(`❌ ${check.name}`);
            }
        });
        
        // Verificaciones adicionales de CSS
        const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
        if (cssMatch) {
            const css = cssMatch[1];
            
            console.log('\n🎨 Verificando CSS de accesibilidad:');
            
            const cssChecks = [
                {
                    name: 'Transiciones suaves',
                    test: /transition:\s*[^;]+/,
                    passed: false
                },
                {
                    name: 'Variables de color definidas',
                    test: /--[\w-]*color[\w-]*:/,
                    passed: false
                },
                {
                    name: 'Responsive design',
                    test: /@media[^{]*\{/,
                    passed: false
                },
                {
                    name: 'Estados de focus',
                    test: /:focus\s*\{/,
                    passed: false
                },
                {
                    name: 'Estados de hover',
                    test: /:hover\s*\{/,
                    passed: false
                }
            ];
            
            cssChecks.forEach(check => {
                check.passed = check.test.test(css);
                if (check.passed) {
                    console.log(`✅ ${check.name}`);
                    passed++;
                } else {
                    console.log(`❌ ${check.name}`);
                }
            });
        }
        
        const totalChecks = checks.length + 5; // 5 CSS checks
        console.log(`\n📊 Accesibilidad: ${passed}/${totalChecks} checks pasados`);
        
        if (passed >= totalChecks * 0.8) {
            console.log('✅ Pruebas de accesibilidad exitosas');
            return true;
        } else {
            console.log('❌ Pruebas de accesibilidad necesitan mejoras');
            return false;
        }
        
    } catch (error) {
        console.log('❌ Error en pruebas de accesibilidad:', error.message);
        return false;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const result = runAccessibilityTests();
    process.exit(result ? 0 : 1);
}

module.exports = runAccessibilityTests;
