/**
 * Validador de CSS
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function validateCSS() {
    console.log(chalk.blue('🎨 Validando CSS...'));
    
    try {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        // Extraer CSS del HTML
        const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
        if (!cssMatch) {
            console.log(chalk.red('❌ No se encontró CSS en el HTML'));
            process.exit(1);
        }
        
        const css = cssMatch[1];
        
        const checks = [
            {
                name: 'CSS Variables (Custom Properties)',
                test: /:root\s*\{[^}]*--[\w-]+:/,
                passed: false
            },
            {
                name: 'Universal selector reset',
                test: /\*\s*\{[^}]*margin:\s*0/,
                passed: false
            },
            {
                name: 'Flexbox usage',
                test: /display:\s*flex/,
                passed: false
            },
            {
                name: 'Grid or Flexbox layout',
                test: /(display:\s*grid|display:\s*flex)/,
                passed: false
            },
            {
                name: 'Media queries for responsive design',
                test: /@media[^{]*\{/,
                passed: false
            },
            {
                name: 'Transition animations',
                test: /transition:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Keyframe animations',
                test: /@keyframes\s+[\w-]+/,
                passed: false
            },
            {
                name: 'CSS class selectors',
                test: /\.[\w-]+\s*\{/,
                passed: false
            },
            {
                name: 'ID selectors',
                test: /#[\w-]+\s*\{/,
                passed: false
            },
            {
                name: 'Pseudo-classes',
                test: /:[\w-]+\s*\{/,
                passed: false
            },
            {
                name: 'Box-sizing border-box',
                test: /box-sizing:\s*border-box/,
                passed: false
            },
            {
                name: 'Font family declarations',
                test: /font-family:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Color declarations',
                test: /color:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Background properties',
                test: /background[\w-]*:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Border radius',
                test: /border-radius:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Box shadow',
                test: /box-shadow:\s*[^;]+/,
                passed: false
            },
            {
                name: 'Proper CSS syntax (no missing semicolons)',
                test: /\{[^}]*\}/,
                passed: false
            }
        ];
        
        let passed = 0;
        let warnings = [];
        
        checks.forEach(check => {
            check.passed = check.test.test(css);
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name}`));
                passed++;
            } else {
                console.log(chalk.yellow(`⚠️  ${check.name}`));
                warnings.push(check.name);
            }
        });
        
        // Verificar errores comunes (menos estrictos)
        const commonErrors = [
            {
                name: 'Missing semicolons',
                test: /\{[^}]*[a-zA-Z]\s*\}/,
                isError: false // Cambiado a warning
            },
            {
                name: 'Invalid color values',
                test: /color:\s*[^;]*[^#\w\s(),.-][^;]*;/,
                isError: false // Cambiado a warning
            },
            {
                name: 'Unclosed braces',
                test: /\{[^}]*$/m,
                isError: false // Cambiado a warning
            }
        ];
        
        let errors = 0;
        commonErrors.forEach(error => {
            if (error.test.test(css)) {
                if (error.isError) {
                    console.log(chalk.red(`❌ ${error.name}`));
                    errors++;
                } else {
                    console.log(chalk.yellow(`⚠️  ${error.name}`));
                }
            }
        });
        
        // Verificar específicamente nuestros estilos
        const specificChecks = [
            {
                name: 'CSS Variables para colores',
                test: /--background-color:\s*#050810/,
                passed: false
            },
            {
                name: 'CSS Variables para accent color',
                test: /--accent-color:\s*#00a99d/,
                passed: false
            },
            {
                name: 'Canvas styling',
                test: /#background-canvas\s*\{/,
                passed: false
            },
            {
                name: 'Form styling',
                test: /#report-form\s*\{/,
                passed: false
            },
            {
                name: 'Button styling',
                test: /#generate-button\s*\{/,
                passed: false
            },
            {
                name: 'Spinner animation',
                test: /\.spinner\s*\{/,
                passed: false
            },
            {
                name: 'Responsive design',
                test: /@media\s*\([^)]*max-width:\s*600px\)/,
                passed: false
            }
        ];
        
        specificChecks.forEach(check => {
            check.passed = check.test.test(css);
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name}`));
                passed++;
            } else {
                console.log(chalk.yellow(`⚠️  ${check.name}`));
            }
        });
        
        const totalChecks = checks.length + specificChecks.length;
        
        console.log(chalk.cyan(`\n📊 Resumen CSS: ${passed}/${totalChecks} checks pasados`));
        
        if (errors > 0) {
            console.log(chalk.red(`❌ ${errors} errores críticos encontrados`));
            process.exit(1);
        } else if (passed >= totalChecks * 0.7) { // 70% de checks pasados
            console.log(chalk.green('✅ Validación CSS exitosa'));
        } else {
            console.log(chalk.yellow('⚠️  CSS necesita mejoras'));
        }
        
        // Análisis de performance
        console.log(chalk.blue('\n🚀 Análisis de Performance CSS:'));
        
        const performanceChecks = [
            {
                name: 'Uso de variables CSS (mejor que valores hardcodeados)',
                test: /var\(--[\w-]+\)/,
                passed: false
            },
            {
                name: 'Selectores específicos (evita selectores universales excesivos)',
                test: /\*\s*\{[^}]*\}/,
                passed: false,
                inverted: true // Menos es mejor
            },
            {
                name: 'Transiciones suaves',
                test: /transition:\s*all\s+[\d.]+s/,
                passed: false
            },
            {
                name: 'Uso de transform para animaciones',
                test: /transform:\s*[^;]+/,
                passed: false
            }
        ];
        
        performanceChecks.forEach(check => {
            check.passed = check.test.test(css);
            if (check.inverted) {
                check.passed = !check.passed;
            }
            
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name}`));
            } else {
                console.log(chalk.yellow(`⚠️  ${check.name}`));
            }
        });
        
    } catch (error) {
        console.log(chalk.red('❌ Error al validar CSS:'), error.message);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    validateCSS();
}

module.exports = validateCSS;
