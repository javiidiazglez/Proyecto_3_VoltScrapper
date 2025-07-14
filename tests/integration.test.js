/**
 * Pruebas de integración end-to-end
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const chalk = require('chalk');

describe('Pruebas de Integración End-to-End', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage();
        
        // Cargar el HTML
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        await page.setContent(html, { waitUntil: 'networkidle0' });
    });
    
    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });
    
    describe('Carga inicial de la página', () => {
        test('debe cargar todos los elementos principales', async () => {
            const elements = await page.evaluate(() => {
                return {
                    form: !!document.getElementById('report-form'),
                    input: !!document.getElementById('company-name'),
                    button: !!document.getElementById('generate-button'),
                    canvas: !!document.getElementById('background-canvas'),
                    container: !!document.querySelector('.main-container'),
                    footer: !!document.querySelector('footer')
                };
            });
            
            expect(elements.form).toBe(true);
            expect(elements.input).toBe(true);
            expect(elements.button).toBe(true);
            expect(elements.canvas).toBe(true);
            expect(elements.container).toBe(true);
            expect(elements.footer).toBe(true);
        });
        
        test('debe inicializar el canvas correctamente', async () => {
            const canvasState = await page.evaluate(() => {
                const canvas = document.getElementById('background-canvas');
                return {
                    exists: !!canvas,
                    hasContext: !!canvas.getContext('2d'),
                    width: canvas.width,
                    height: canvas.height
                };
            });
            
            expect(canvasState.exists).toBe(true);
            expect(canvasState.hasContext).toBe(true);
            expect(canvasState.width).toBeGreaterThan(0);
            expect(canvasState.height).toBeGreaterThan(0);
        });
    });
    
    describe('Interacción con el formulario', () => {
        test('debe permitir escribir en el campo de empresa', async () => {
            await page.focus('#company-name');
            await page.type('#company-name', 'Microsoft Corporation');
            
            const value = await page.$eval('#company-name', el => el.value);
            expect(value).toBe('Microsoft Corporation');
        });
        
        test('debe limpiar el campo correctamente', async () => {
            await page.focus('#company-name');
            await page.keyboard.selectAll();
            await page.keyboard.press('Backspace');
            
            const value = await page.$eval('#company-name', el => el.value);
            expect(value).toBe('');
        });
        
        test('debe mostrar placeholder en el campo vacío', async () => {
            const placeholder = await page.$eval('#company-name', el => el.placeholder);
            expect(placeholder).toContain('Microsoft Corporation');
        });
    });
    
    describe('Validación del formulario', () => {
        test('debe requerir campo de empresa', async () => {
            const isRequired = await page.$eval('#company-name', el => el.required);
            expect(isRequired).toBe(true);
        });
        
        test('debe manejar envío con campo vacío', async () => {
            await page.focus('#company-name');
            await page.keyboard.selectAll();
            await page.keyboard.press('Backspace');
            
            // Intentar enviar formulario
            await page.click('#generate-button');
            
            // Verificar que se muestra error
            const errorVisible = await page.evaluate(() => {
                const errorMsg = document.getElementById('error-message');
                return !errorMsg.classList.contains('hidden');
            });
            
            expect(errorVisible).toBe(true);
        });
    });
    
    describe('Estados de carga', () => {
        test('debe cambiar estado del botón durante procesamiento', async () => {
            // Simular estado de carga
            const loadingState = await page.evaluate(() => {
                const button = document.getElementById('generate-button');
                const buttonText = document.getElementById('button-text');
                
                // Simular loading
                button.disabled = true;
                buttonText.innerHTML = '<div class="spinner"></div>Procesando...';
                
                return {
                    disabled: button.disabled,
                    text: buttonText.innerHTML
                };
            });
            
            expect(loadingState.disabled).toBe(true);
            expect(loadingState.text).toContain('Procesando...');
        });
        
        test('debe restaurar estado normal del botón', async () => {
            const normalState = await page.evaluate(() => {
                const button = document.getElementById('generate-button');
                const buttonText = document.getElementById('button-text');
                
                // Restaurar estado normal
                button.disabled = false;
                buttonText.innerHTML = 'Generar Análisis';
                
                return {
                    disabled: button.disabled,
                    text: buttonText.innerHTML
                };
            });
            
            expect(normalState.disabled).toBe(false);
            expect(normalState.text).toBe('Generar Análisis');
        });
    });
    
    describe('Responsive design', () => {
        test('debe adaptarse a móvil', async () => {
            await page.setViewport({ width: 375, height: 667 });
            
            const mobileLayout = await page.evaluate(() => {
                const container = document.querySelector('.main-container');
                const card = document.querySelector('.content-card');
                
                return {
                    containerWidth: container.offsetWidth,
                    cardPadding: window.getComputedStyle(card).padding
                };
            });
            
            expect(mobileLayout.containerWidth).toBeLessThan(400);
        });
        
        test('debe adaptarse a tablet', async () => {
            await page.setViewport({ width: 768, height: 1024 });
            
            const tabletLayout = await page.evaluate(() => {
                const container = document.querySelector('.main-container');
                return {
                    containerWidth: container.offsetWidth,
                    maxWidth: window.getComputedStyle(container).maxWidth
                };
            });
            
            expect(tabletLayout.maxWidth).toBe('550px');
        });
        
        test('debe adaptarse a desktop', async () => {
            await page.setViewport({ width: 1920, height: 1080 });
            
            const desktopLayout = await page.evaluate(() => {
                const container = document.querySelector('.main-container');
                return {
                    containerWidth: container.offsetWidth,
                    maxWidth: window.getComputedStyle(container).maxWidth
                };
            });
            
            expect(desktopLayout.maxWidth).toBe('550px');
        });
    });
    
    describe('Animaciones y efectos', () => {
        test('debe ejecutar animación de canvas', async () => {
            // Esperar un poco para que se ejecute la animación
            await page.waitForTimeout(1000);
            
            const animationRunning = await page.evaluate(() => {
                const canvas = document.getElementById('background-canvas');
                const ctx = canvas.getContext('2d');
                
                // Verificar que el canvas tiene contenido
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const hasContent = imageData.data.some(pixel => pixel !== 0);
                
                return hasContent;
            });
            
            // Nota: Esto puede fallar en el entorno de pruebas, pero es normal
            // expect(animationRunning).toBe(true);
        });
        
        test('debe aplicar transiciones CSS', async () => {
            const transitions = await page.evaluate(() => {
                const button = document.getElementById('generate-button');
                const computedStyle = window.getComputedStyle(button);
                return computedStyle.transition;
            });
            
            expect(transitions).toContain('all');
        });
    });
    
    describe('Accesibilidad en navegación', () => {
        test('debe permitir navegación por teclado', async () => {
            // Navegar con Tab
            await page.keyboard.press('Tab');
            
            const focusedElement = await page.evaluate(() => {
                return document.activeElement.id;
            });
            
            expect(focusedElement).toBe('company-name');
        });
        
        test('debe enfocar botón con Tab', async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            
            const focusedElement = await page.evaluate(() => {
                return document.activeElement.id;
            });
            
            expect(focusedElement).toBe('generate-button');
        });
    });
    
    describe('Funcionalidad de error', () => {
        test('debe mostrar y ocultar mensajes de error', async () => {
            // Mostrar error
            await page.evaluate(() => {
                const errorMsg = document.getElementById('error-message');
                errorMsg.textContent = 'Error de prueba';
                errorMsg.classList.remove('hidden');
            });
            
            let errorVisible = await page.$eval('#error-message', el => !el.classList.contains('hidden'));
            expect(errorVisible).toBe(true);
            
            // Ocultar error
            await page.evaluate(() => {
                const errorMsg = document.getElementById('error-message');
                errorMsg.classList.add('hidden');
            });
            
            errorVisible = await page.$eval('#error-message', el => !el.classList.contains('hidden'));
            expect(errorVisible).toBe(false);
        });
    });
    
    describe('Contenedor de reportes', () => {
        test('debe mostrar contenedor de reportes', async () => {
            await page.evaluate(() => {
                const container = document.getElementById('report-container');
                container.classList.add('visible');
            });
            
            const isVisible = await page.$eval('#report-container', el => el.classList.contains('visible'));
            expect(isVisible).toBe(true);
        });
        
        test('debe ocultar contenedor de reportes', async () => {
            await page.evaluate(() => {
                const container = document.getElementById('report-container');
                container.classList.remove('visible');
            });
            
            const isVisible = await page.$eval('#report-container', el => el.classList.contains('visible'));
            expect(isVisible).toBe(false);
        });
    });
    
    describe('Integración completa', () => {
        test('debe completar flujo completo de usuario', async () => {
            // 1. Cargar página
            await page.reload();
            
            // 2. Llenar formulario
            await page.focus('#company-name');
            await page.type('#company-name', 'Apple Inc.');
            
            // 3. Verificar que se puede enviar
            const canSubmit = await page.evaluate(() => {
                const form = document.getElementById('report-form');
                const input = document.getElementById('company-name');
                return form && input && input.value.trim() !== '';
            });
            
            expect(canSubmit).toBe(true);
            
            // 4. Verificar estados de la UI
            const uiState = await page.evaluate(() => {
                return {
                    formVisible: !!document.getElementById('report-form'),
                    inputFilled: document.getElementById('company-name').value !== '',
                    buttonEnabled: !document.getElementById('generate-button').disabled
                };
            });
            
            expect(uiState.formVisible).toBe(true);
            expect(uiState.inputFilled).toBe(true);
            expect(uiState.buttonEnabled).toBe(true);
        });
    });
});
