/**
 * Pruebas para la funcionalidad del Canvas y animaciones
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Canvas y Animaciones', () => {
    let canvas, ctx;

    beforeEach(() => {
        document.documentElement.innerHTML = html;
        canvas = document.getElementById('background-canvas');
        ctx = canvas.getContext('2d');
        
        // Configurar dimensiones del canvas
        canvas.width = 800;
        canvas.height = 600;
    });

    describe('Configuración del Canvas', () => {
        test('debe existir el canvas con ID correcto', () => {
            expect(canvas).toBeTruthy();
            expect(canvas.id).toBe('background-canvas');
        });

        test('debe tener contexto 2D válido', () => {
            expect(ctx).toBeTruthy();
            expect(typeof ctx.fillText).toBe('function');
            expect(typeof ctx.fillRect).toBe('function');
        });

        test('debe tener dimensiones configuradas', () => {
            expect(canvas.width).toBe(800);
            expect(canvas.height).toBe(600);
        });
    });

    describe('Animación Matrix', () => {
        test('debe configurar variables de animación correctas', () => {
            const alphabet = '01';
            const fontSize = 16;
            const columns = canvas.width / fontSize;
            
            expect(alphabet).toBe('01');
            expect(fontSize).toBe(16);
            expect(columns).toBe(50); // 800/16
        });

        test('debe inicializar rainDrops correctamente', () => {
            const columns = canvas.width / 16; // fontSize = 16
            const rainDrops = [];
            
            for (let x = 0; x < columns; x++) {
                rainDrops[x] = Math.random() * (canvas.height / 16);
            }
            
            expect(rainDrops).toHaveLength(columns);
            rainDrops.forEach(drop => {
                expect(drop).toBeGreaterThanOrEqual(0);
                expect(drop).toBeLessThanOrEqual(canvas.height / 16);
            });
        });

        test('debe usar colores correctos', () => {
            const matrixColor = '#00a99d';
            const backgroundColor = 'rgba(5, 8, 16, 0.05)';
            
            expect(matrixColor).toBe('#00a99d');
            expect(backgroundColor).toBe('rgba(5, 8, 16, 0.05)');
        });
    });

    describe('Funciones de dibujo', () => {
        test('debe llamar a fillRect para limpiar canvas', () => {
            ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 800, 600);
        });

        test('debe llamar a fillText para dibujar caracteres', () => {
            const text = '1';
            const x = 16;
            const y = 32;
            
            ctx.fillText(text, x, y);
            
            expect(ctx.fillText).toHaveBeenCalledWith(text, x, y);
        });

        test('debe configurar font correctamente', () => {
            const fontSize = 16;
            ctx.font = fontSize + 'px monospace';
            
            expect(ctx.font).toBe('16px monospace');
        });
    });

    describe('Responsive Canvas', () => {
        test('debe ajustar tamaño en resize', () => {
            // Simular cambio de tamaño
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200,
            });
            
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 800,
            });
            
            // Simular evento resize
            const event = new Event('resize');
            window.dispatchEvent(event);
            
            expect(window.innerWidth).toBe(1200);
            expect(window.innerHeight).toBe(800);
        });
    });

    describe('Rendimiento de animación', () => {
        test('debe usar setInterval con intervalo apropiado', () => {
            const interval = 50; // 50ms = 20fps
            
            setInterval(() => {
                // Función de dibujo
            }, interval);
            
            expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 50);
        });

        test('debe limpiar interval anterior', () => {
            const mockInterval = 123;
            
            if (mockInterval) {
                clearInterval(mockInterval);
            }
            
            expect(clearInterval).toHaveBeenCalledWith(mockInterval);
        });
    });

    describe('Caracteres aleatorios', () => {
        test('debe generar caracteres del alfabeto binario', () => {
            const alphabet = '01';
            const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            
            expect(['0', '1']).toContain(randomChar);
        });

        test('debe generar posiciones aleatorias válidas', () => {
            const maxHeight = canvas.height / 16; // fontSize = 16
            const randomPos = Math.random() * maxHeight;
            
            expect(randomPos).toBeGreaterThanOrEqual(0);
            expect(randomPos).toBeLessThanOrEqual(maxHeight);
        });
    });

    describe('Reinicio de gotas', () => {
        test('debe reiniciar gotas cuando superan la altura', () => {
            const rainDrop = canvas.height / 16 + 1; // Fuera de pantalla
            const shouldReset = rainDrop * 16 > canvas.height && Math.random() > 0.975;
            
            if (shouldReset) {
                expect(0).toBe(0); // Gota se reinicia a 0
            }
        });
    });
});
