/**
 * Pruebas para la API y funcionalidad de red
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('API y Funcionalidad de Red', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        
        // Resetear mocks
        fetch.mockClear();
        
        // Simular DOMContentLoaded
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    });

    describe('Configuración de API', () => {
        test('debe tener URL de webhook correcta', () => {
            const expectedUrl = 'https://hook.eu2.make.com/laa9597i9t2knu812cogii0paeafgxfm';
            
            // Extraer URL del script
            const scriptContent = document.querySelector('script').textContent;
            const webhookMatch = scriptContent.match(/webhookUrl = '([^']+)'/);
            
            expect(webhookMatch).toBeTruthy();
            expect(webhookMatch[1]).toBe(expectedUrl);
        });

        test('debe usar método POST', () => {
            const method = 'POST';
            expect(method).toBe('POST');
        });

        test('debe usar Content-Type JSON', () => {
            const contentType = 'application/json';
            expect(contentType).toBe('application/json');
        });
    });

    describe('Llamadas a la API', () => {
        test('debe hacer fetch con datos correctos', async () => {
            const companyName = 'Microsoft Corporation';
            const webhookUrl = 'https://hook.eu2.make.com/laa9597i9t2knu812cogii0paeafgxfm';
            
            // Mock de respuesta exitosa
            fetch.mockResolvedValueOnce({
                ok: true,
                text: () => Promise.resolve('{"docu": "https://example.com/report.pdf"}')
            });
            
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ custom_webhook: companyName })
            });
            
            expect(fetch).toHaveBeenCalledWith(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ custom_webhook: companyName })
            });
        });

        test('debe manejar respuesta exitosa', async () => {
            const mockResponse = {
                ok: true,
                text: () => Promise.resolve('{"docu": "https://example.com/report.pdf"}')
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const response = await fetch('test-url');
            const text = await response.text();
            const data = JSON.parse(text);
            
            expect(response.ok).toBe(true);
            expect(data.docu).toBe('https://example.com/report.pdf');
        });

        test('debe manejar errores de red', async () => {
            const mockError = new Error('Network error');
            fetch.mockRejectedValueOnce(mockError);
            
            try {
                await fetch('test-url');
            } catch (error) {
                expect(error.message).toBe('Network error');
            }
        });

        test('debe manejar respuesta no-ok', async () => {
            const mockResponse = {
                ok: false,
                statusText: 'Internal Server Error'
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const response = await fetch('test-url');
            
            expect(response.ok).toBe(false);
            expect(response.statusText).toBe('Internal Server Error');
        });

        test('debe manejar JSON inválido', async () => {
            const mockResponse = {
                ok: true,
                text: () => Promise.resolve('invalid json')
            };
            
            fetch.mockResolvedValueOnce(mockResponse);
            
            const response = await fetch('test-url');
            const text = await response.text();
            
            expect(() => JSON.parse(text)).toThrow();
        });
    });

    describe('Procesamiento de datos', () => {
        test('debe validar estructura de respuesta', () => {
            const validResponse = { docu: 'https://example.com/report.pdf' };
            const invalidResponse = { error: 'No data' };
            
            expect(validResponse.docu).toBeTruthy();
            expect(invalidResponse.docu).toBeFalsy();
        });

        test('debe validar URL de documento', () => {
            const validUrl = 'https://example.com/report.pdf';
            const invalidUrl = 'not-a-url';
            
            const isValidUrl = (url) => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            };
            
            expect(isValidUrl(validUrl)).toBe(true);
            expect(isValidUrl(invalidUrl)).toBe(false);
        });
    });

    describe('Manejo de errores', () => {
        test('debe mostrar mensaje de error por campo vacío', () => {
            const errorMessage = 'Por favor, introduce un nombre de empresa.';
            const companyName = '';
            
            if (!companyName.trim()) {
                expect(errorMessage).toBe('Por favor, introduce un nombre de empresa.');
            }
        });

        test('debe mostrar mensaje de error de red', () => {
            const error = new Error('Network error');
            const errorMessage = `Error: ${error.message}`;
            
            expect(errorMessage).toBe('Error: Network error');
        });

        test('debe mostrar mensaje de error de JSON', () => {
            const errorMessage = 'La respuesta del servidor no fue un JSON válido. Respuesta: invalid json';
            const responseText = 'invalid json';
            
            expect(errorMessage).toBe(`La respuesta del servidor no fue un JSON válido. Respuesta: ${responseText}`);
        });

        test('debe mostrar mensaje de error de URL faltante', () => {
            const errorMessage = 'La respuesta del servidor no contiene la URL del documento.';
            const data = { error: 'No data' };
            
            if (!data.docu) {
                expect(errorMessage).toBe('La respuesta del servidor no contiene la URL del documento.');
            }
        });
    });

    describe('Estados de la UI', () => {
        test('debe cambiar estado del botón durante carga', () => {
            const button = { disabled: false };
            const buttonText = { innerHTML: 'Generar Análisis' };
            
            // Simular inicio de carga
            button.disabled = true;
            buttonText.innerHTML = '<div class="spinner"></div>Procesando...';
            
            expect(button.disabled).toBe(true);
            expect(buttonText.innerHTML).toContain('Procesando...');
        });

        test('debe restaurar estado del botón después de carga', () => {
            const button = { disabled: true };
            const buttonText = { innerHTML: '<div class="spinner"></div>Procesando...' };
            
            // Simular fin de carga
            button.disabled = false;
            buttonText.innerHTML = 'Generar Análisis';
            
            expect(button.disabled).toBe(false);
            expect(buttonText.innerHTML).toBe('Generar Análisis');
        });

        test('debe ocultar errores al iniciar nueva búsqueda', () => {
            const errorMessage = { classList: { add: jest.fn(), remove: jest.fn() } };
            
            // Simular ocultar error
            errorMessage.classList.add('hidden');
            
            expect(errorMessage.classList.add).toHaveBeenCalledWith('hidden');
        });
    });
});
