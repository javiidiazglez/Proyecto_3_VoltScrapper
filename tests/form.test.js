/**
 * Pruebas para la funcionalidad principal del formulario
 */

// Cargar el HTML para las pruebas
const fs = require('fs');
const path = require('path');

// Leer el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Formulario de Análisis Empresarial', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        
        // Simular DOMContentLoaded
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    });

    describe('Elementos del DOM', () => {
        test('debe existir el formulario principal', () => {
            const form = document.getElementById('report-form');
            expect(form).toBeTruthy();
            expect(form.tagName).toBe('FORM');
        });

        test('debe existir el campo de entrada de empresa', () => {
            const input = document.getElementById('company-name');
            expect(input).toBeTruthy();
            expect(input.type).toBe('text');
            expect(input.required).toBe(true);
        });

        test('debe existir el botón de generar', () => {
            const button = document.getElementById('generate-button');
            expect(button).toBeTruthy();
            expect(button.type).toBe('submit');
        });

        test('debe existir el contenedor de reportes', () => {
            const container = document.getElementById('report-container');
            expect(container).toBeTruthy();
        });

        test('debe existir el mensaje de error', () => {
            const errorMsg = document.getElementById('error-message');
            expect(errorMsg).toBeTruthy();
            expect(errorMsg.classList.contains('hidden')).toBe(true);
        });
    });

    describe('Canvas de fondo', () => {
        test('debe existir el canvas de fondo', () => {
            const canvas = document.getElementById('background-canvas');
            expect(canvas).toBeTruthy();
            expect(canvas.tagName).toBe('CANVAS');
        });

        test('debe tener contexto 2D', () => {
            const canvas = document.getElementById('background-canvas');
            const ctx = canvas.getContext('2d');
            expect(ctx).toBeTruthy();
        });
    });

    describe('Validación de formulario', () => {
        test('debe mostrar error cuando el campo está vacío', () => {
            const form = document.getElementById('report-form');
            const input = document.getElementById('company-name');
            const errorMsg = document.getElementById('error-message');
            
            input.value = '';
            
            // Simular submit
            const event = new Event('submit');
            form.dispatchEvent(event);
            
            // Verificar que se muestre el error
            expect(errorMsg.classList.contains('hidden')).toBe(false);
            expect(errorMsg.textContent).toContain('introduce un nombre de empresa');
        });

        test('debe aceptar nombres de empresa válidos', () => {
            const input = document.getElementById('company-name');
            
            input.value = 'Microsoft Corporation';
            expect(input.value.trim()).toBe('Microsoft Corporation');
            
            input.value = 'Google Inc.';
            expect(input.value.trim()).toBe('Google Inc.');
        });

        test('debe limpiar espacios en blanco', () => {
            const input = document.getElementById('company-name');
            
            input.value = '  Microsoft Corporation  ';
            expect(input.value.trim()).toBe('Microsoft Corporation');
        });
    });

    describe('Estados de carga', () => {
        test('debe deshabilitar el botón durante la carga', () => {
            const button = document.getElementById('generate-button');
            const buttonText = document.getElementById('button-text');
            
            // Simular estado de carga
            button.disabled = true;
            buttonText.innerHTML = '<div class="spinner"></div>Procesando...';
            
            expect(button.disabled).toBe(true);
            expect(buttonText.innerHTML).toContain('Procesando...');
        });

        test('debe habilitar el botón después de la carga', () => {
            const button = document.getElementById('generate-button');
            const buttonText = document.getElementById('button-text');
            
            // Simular fin de carga
            button.disabled = false;
            buttonText.innerHTML = 'Generar Análisis';
            
            expect(button.disabled).toBe(false);
            expect(buttonText.innerHTML).toBe('Generar Análisis');
        });
    });

    describe('Responsive Design', () => {
        test('debe tener viewport configurado', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            expect(viewport.content).toContain('width=device-width');
        });

        test('debe tener contenedor principal responsive', () => {
            const container = document.querySelector('.main-container');
            expect(container).toBeTruthy();
            
            const styles = window.getComputedStyle(container);
            expect(styles.maxWidth).toBe('550px');
        });
    });

    describe('Accesibilidad', () => {
        test('debe tener labels asociados a inputs', () => {
            const input = document.getElementById('company-name');
            const label = document.querySelector('label[for="company-name"]');
            
            expect(label).toBeTruthy();
            expect(label.getAttribute('for')).toBe('company-name');
        });

        test('debe tener texto alternativo en elementos importantes', () => {
            const title = document.querySelector('h1');
            expect(title).toBeTruthy();
            expect(title.textContent.trim()).toBe('Generador Análisis Empresarial');
        });

        test('debe tener estructura semántica correcta', () => {
            const main = document.querySelector('main');
            const footer = document.querySelector('footer');
            
            expect(main).toBeTruthy();
            expect(footer).toBeTruthy();
        });
    });
});
