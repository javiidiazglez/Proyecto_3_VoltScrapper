/**
 * Validador de HTML simplificado
 */

const fs = require('fs');
const path = require('path');

function validateHTML() {
    console.log('🔍 Validando HTML...');
    
    try {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        console.log('📄 Archivo HTML leído correctamente');
        
        // Validación manual básica
        const checks = [
            {
                name: 'DOCTYPE declaration',
                test: /<!DOCTYPE html>/i,
                passed: false
            },
            {
                name: 'HTML tag with lang attribute',
                test: /<html[^>]*lang=["']es["']/i,
                passed: false
            },
            {
                name: 'Head section',
                test: /<head>/i,
                passed: false
            },
            {
                name: 'Meta charset',
                test: /<meta[^>]*charset=["']UTF-8["']/i,
                passed: false
            },
            {
                name: 'Meta viewport',
                test: /<meta[^>]*name=["']viewport["']/i,
                passed: false
            },
            {
                name: 'Title tag',
                test: /<title>[^<]+<\/title>/i,
                passed: false
            },
            {
                name: 'Body section',
                test: /<body>/i,
                passed: false
            },
            {
                name: 'Form with proper structure',
                test: /<form[^>]*id=["']report-form["']/i,
                passed: false
            },
            {
                name: 'Input with required attribute',
                test: /<input[^>]*required/i,
                passed: false
            },
            {
                name: 'Button with type submit',
                test: /<button[^>]*type=["']submit["']/i,
                passed: false
            },
            {
                name: 'Canvas element',
                test: /<canvas[^>]*id=["']background-canvas["']/i,
                passed: false
            },
            {
                name: 'Semantic HTML5 elements',
                test: /<(main|section|footer|header)/i,
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
        
        console.log(`\n📊 Validación: ${passed}/${checks.length} checks pasados`);
        
        if (passed >= checks.length * 0.8) { // 80% de checks pasados
            console.log('✅ Validación HTML exitosa');
            return true;
        } else {
            console.log('❌ Validación HTML fallida');
            return false;
        }
        
    } catch (error) {
        console.log('❌ Error al validar HTML:', error.message);
        return false;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const result = validateHTML();
    process.exit(result ? 0 : 1);
}

module.exports = validateHTML;
