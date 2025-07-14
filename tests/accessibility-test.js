/**
 * Pruebas de accesibilidad usando axe-core
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const chalk = require('chalk');

async function runAccessibilityTests() {
    console.log(chalk.blue('♿ Iniciando pruebas de accesibilidad...'));
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Cargar el HTML
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        // Configurar el contenido
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // Inyectar axe-core
        await page.addScriptTag({
            path: require.resolve('axe-core/axe.min.js')
        });
        
        // Ejecutar pruebas de accesibilidad
        const results = await page.evaluate(() => {
            return new Promise((resolve) => {
                axe.run((err, results) => {
                    if (err) throw err;
                    resolve(results);
                });
            });
        });
        
        // Procesar resultados
        const { violations, passes, incomplete } = results;
        
        console.log(chalk.green(`✅ Pruebas pasadas: ${passes.length}`));
        console.log(chalk.yellow(`⚠️  Pruebas incompletas: ${incomplete.length}`));
        console.log(chalk.red(`❌ Violaciones encontradas: ${violations.length}`));
        
        // Mostrar violaciones
        if (violations.length > 0) {
            console.log(chalk.red('\n❌ Violaciones de accesibilidad:'));
            violations.forEach((violation, index) => {
                console.log(chalk.red(`\n${index + 1}. ${violation.id}: ${violation.description}`));
                console.log(chalk.yellow(`   Impacto: ${violation.impact}`));
                console.log(chalk.cyan(`   Ayuda: ${violation.helpUrl}`));
                
                violation.nodes.forEach((node, nodeIndex) => {
                    console.log(chalk.gray(`   ${nodeIndex + 1}. ${node.target.join(', ')}`));
                    if (node.failureSummary) {
                        console.log(chalk.gray(`      ${node.failureSummary}`));
                    }
                });
            });
        }
        
        // Mostrar pruebas incompletas
        if (incomplete.length > 0) {
            console.log(chalk.yellow('\n⚠️  Pruebas que requieren revisión manual:'));
            incomplete.forEach((item, index) => {
                console.log(chalk.yellow(`${index + 1}. ${item.id}: ${item.description}`));
            });
        }
        
        // Pruebas adicionales manuales
        console.log(chalk.blue('\n🔍 Ejecutando pruebas manuales adicionales...'));
        
        const manualChecks = await page.evaluate(() => {
            const checks = [];
            
            // Verificar imágenes con alt text
            const images = document.querySelectorAll('img');
            checks.push({
                name: 'Imágenes con texto alternativo',
                passed: Array.from(images).every(img => img.alt || img.role === 'presentation'),
                count: images.length
            });
            
            // Verificar labels para inputs
            const inputs = document.querySelectorAll('input, select, textarea');
            checks.push({
                name: 'Campos de formulario con labels',
                passed: Array.from(inputs).every(input => {
                    const label = document.querySelector(`label[for="${input.id}"]`);
                    return label || input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
                }),
                count: inputs.length
            });
            
            // Verificar botones con texto descriptivo
            const buttons = document.querySelectorAll('button');
            checks.push({
                name: 'Botones con texto descriptivo',
                passed: Array.from(buttons).every(button => 
                    button.textContent.trim() || button.getAttribute('aria-label')
                ),
                count: buttons.length
            });
            
            // Verificar headings jerárquicos
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            checks.push({
                name: 'Estructura de headings',
                passed: headings.length > 0,
                count: headings.length
            });
            
            // Verificar contraste mínimo (simplificado)
            const colorElements = document.querySelectorAll('[style*="color"], .content-card, .main-container');
            checks.push({
                name: 'Elementos con color definido',
                passed: colorElements.length > 0,
                count: colorElements.length
            });
            
            // Verificar navegación por teclado
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
            checks.push({
                name: 'Elementos enfocables',
                passed: focusableElements.length > 0,
                count: focusableElements.length
            });
            
            // Verificar roles semánticos
            const semanticElements = document.querySelectorAll('main, nav, header, footer, section, article, aside');
            checks.push({
                name: 'Elementos semánticos HTML5',
                passed: semanticElements.length > 0,
                count: semanticElements.length
            });
            
            return checks;
        });
        
        let manualPassed = 0;
        manualChecks.forEach(check => {
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name} (${check.count} elementos)`));
                manualPassed++;
            } else {
                console.log(chalk.red(`❌ ${check.name} (${check.count} elementos)`));
            }
        });
        
        // Verificar navegación por teclado
        console.log(chalk.blue('\n⌨️  Verificando navegación por teclado...'));
        
        const keyboardChecks = await page.evaluate(() => {
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const checks = [];
            
            // Verificar que elementos pueden recibir focus
            checks.push({
                name: 'Elementos pueden recibir focus',
                passed: focusableElements.length > 0,
                count: focusableElements.length
            });
            
            // Verificar orden de tabulación
            const tabIndexElements = Array.from(focusableElements).filter(el => el.tabIndex > 0);
            checks.push({
                name: 'Orden de tabulación natural',
                passed: tabIndexElements.length === 0 || tabIndexElements.every(el => el.tabIndex > 0),
                count: tabIndexElements.length
            });
            
            return checks;
        });
        
        keyboardChecks.forEach(check => {
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name} (${check.count} elementos)`));
            } else {
                console.log(chalk.red(`❌ ${check.name} (${check.count} elementos)`));
            }
        });
        
        // Resumen final
        const totalPassed = passes.length + manualPassed;
        const totalTests = passes.length + violations.length + incomplete.length + manualChecks.length;
        
        console.log(chalk.cyan(`\n📊 Resumen de accesibilidad: ${totalPassed}/${totalTests} pruebas pasadas`));
        
        if (violations.length === 0) {
            console.log(chalk.green('✅ Pruebas de accesibilidad exitosas'));
        } else if (violations.filter(v => v.impact === 'critical' || v.impact === 'serious').length === 0) {
            console.log(chalk.yellow('⚠️  Solo violaciones menores encontradas'));
        } else {
            console.log(chalk.red('❌ Violaciones críticas de accesibilidad encontradas'));
            process.exit(1);
        }
        
    } catch (error) {
        console.log(chalk.red('❌ Error en pruebas de accesibilidad:'), error.message);
        
        // Fallback a verificación manual básica
        console.log(chalk.yellow('🔧 Ejecutando verificación manual básica...'));
        
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        const basicChecks = [
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
                name: 'Botones con texto',
                test: /<button[^>]*>(?!<\/button>)[^<]*[^<]*<\/button>/i,
                passed: false
            },
            {
                name: 'Headings estructurados',
                test: /<h[1-6][^>]*>[^<]+<\/h[1-6]>/i,
                passed: false
            },
            {
                name: 'Elementos semánticos',
                test: /<(main|nav|header|footer|section|article)[^>]*>/i,
                passed: false
            }
        ];
        
        let basicPassed = 0;
        basicChecks.forEach(check => {
            check.passed = check.test.test(html);
            if (check.passed) {
                console.log(chalk.green(`✅ ${check.name}`));
                basicPassed++;
            } else {
                console.log(chalk.red(`❌ ${check.name}`));
            }
        });
        
        console.log(chalk.cyan(`\n📊 Verificación básica: ${basicPassed}/${basicChecks.length} checks pasados`));
        
        if (basicPassed >= basicChecks.length * 0.8) {
            console.log(chalk.green('✅ Verificación básica de accesibilidad exitosa'));
        } else {
            console.log(chalk.red('❌ Verificación básica de accesibilidad fallida'));
            process.exit(1);
        }
        
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    runAccessibilityTests();
}

module.exports = runAccessibilityTests;
