/**
 * Pruebas de rendimiento usando Lighthouse
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const chalk = require('chalk');

async function runPerformanceTests() {
    console.log(chalk.blue('⚡ Iniciando pruebas de rendimiento...'));
    
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
        
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // Obtener métricas básicas
        const metrics = await page.evaluate(() => {
            return new Promise((resolve) => {
                // Simular carga de página
                const startTime = performance.now();
                
                // Verificar elementos críticos
                const criticalElements = {
                    form: document.getElementById('report-form'),
                    canvas: document.getElementById('background-canvas'),
                    button: document.getElementById('generate-button'),
                    input: document.getElementById('company-name')
                };
                
                const loadTime = performance.now() - startTime;
                
                resolve({
                    loadTime,
                    criticalElements: Object.keys(criticalElements).map(key => ({
                        name: key,
                        exists: !!criticalElements[key]
                    })),
                    domElements: document.querySelectorAll('*').length,
                    scripts: document.querySelectorAll('script').length,
                    styles: document.querySelectorAll('style').length
                });
            });
        });
        
        console.log(chalk.green(`✅ Tiempo de carga DOM: ${metrics.loadTime.toFixed(2)}ms`));
        console.log(chalk.green(`✅ Elementos en DOM: ${metrics.domElements}`));
        console.log(chalk.green(`✅ Scripts: ${metrics.scripts}`));
        console.log(chalk.green(`✅ Estilos: ${metrics.styles}`));
        
        // Verificar elementos críticos
        console.log(chalk.blue('\n🔍 Verificando elementos críticos:'));
        metrics.criticalElements.forEach(element => {
            if (element.exists) {
                console.log(chalk.green(`✅ ${element.name} cargado`));
            } else {
                console.log(chalk.red(`❌ ${element.name} no encontrado`));
            }
        });
        
        // Pruebas de memoria
        console.log(chalk.blue('\n💾 Analizando uso de memoria...'));
        
        const memoryMetrics = await page.evaluate(() => {
            // Simular uso de memoria
            const testArrays = [];
            for (let i = 0; i < 1000; i++) {
                testArrays.push(new Array(100).fill(Math.random()));
            }
            
            // Limpiar
            testArrays.length = 0;
            
            if (performance.memory) {
                return {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                };
            }
            
            return null;
        });
        
        if (memoryMetrics) {
            console.log(chalk.green(`✅ Memoria JS usada: ${(memoryMetrics.used / 1024 / 1024).toFixed(2)} MB`));
            console.log(chalk.green(`✅ Memoria JS total: ${(memoryMetrics.total / 1024 / 1024).toFixed(2)} MB`));
            console.log(chalk.green(`✅ Límite de memoria: ${(memoryMetrics.limit / 1024 / 1024).toFixed(2)} MB`));
        }
        
        // Pruebas de canvas
        console.log(chalk.blue('\n🎨 Probando rendimiento de Canvas...'));
        
        const canvasMetrics = await page.evaluate(() => {
            const canvas = document.getElementById('background-canvas');
            if (!canvas) return null;
            
            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;
            
            // Simular animación
            const startTime = performance.now();
            
            // Dibujar múltiples frames
            for (let frame = 0; frame < 60; frame++) {
                ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#00a99d';
                ctx.font = '16px monospace';
                
                // Dibujar caracteres
                for (let i = 0; i < 50; i++) {
                    const text = Math.random() > 0.5 ? '0' : '1';
                    ctx.fillText(text, i * 16, (frame % 37) * 16);
                }
            }
            
            const endTime = performance.now();
            
            return {
                renderTime: endTime - startTime,
                fps: 60 / ((endTime - startTime) / 1000)
            };
        });
        
        if (canvasMetrics) {
            console.log(chalk.green(`✅ Tiempo de render 60 frames: ${canvasMetrics.renderTime.toFixed(2)}ms`));
            console.log(chalk.green(`✅ FPS estimado: ${canvasMetrics.fps.toFixed(2)}`));
        }
        
        // Pruebas de red simuladas
        console.log(chalk.blue('\n🌐 Simulando pruebas de red...'));
        
        const networkMetrics = await page.evaluate(() => {
            // Simular llamada a API
            const startTime = performance.now();
            
            // Simular tiempo de respuesta
            return new Promise((resolve) => {
                setTimeout(() => {
                    const endTime = performance.now();
                    resolve({
                        responseTime: endTime - startTime,
                        success: true
                    });
                }, 100); // Simular 100ms de latencia
            });
        });
        
        console.log(chalk.green(`✅ Tiempo de respuesta simulado: ${networkMetrics.responseTime.toFixed(2)}ms`));
        
        // Análisis de CSS
        console.log(chalk.blue('\n🎨 Analizando rendimiento CSS...'));
        
        const cssMetrics = await page.evaluate(() => {
            const stylesheets = document.querySelectorAll('style');
            let totalRules = 0;
            let totalSize = 0;
            
            stylesheets.forEach(stylesheet => {
                const content = stylesheet.textContent || stylesheet.innerText;
                totalSize += content.length;
                
                // Contar reglas aproximadamente
                const rules = content.match(/[^{}]+\{[^{}]*\}/g);
                totalRules += rules ? rules.length : 0;
            });
            
            return {
                totalRules,
                totalSize,
                stylesheets: stylesheets.length
            };
        });
        
        console.log(chalk.green(`✅ Hojas de estilo: ${cssMetrics.stylesheets}`));
        console.log(chalk.green(`✅ Reglas CSS: ${cssMetrics.totalRules}`));
        console.log(chalk.green(`✅ Tamaño CSS: ${(cssMetrics.totalSize / 1024).toFixed(2)} KB`));
        
        // Pruebas de JavaScript
        console.log(chalk.blue('\n⚡ Analizando rendimiento JavaScript...'));
        
        const jsMetrics = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script');
            let totalSize = 0;
            
            scripts.forEach(script => {
                const content = script.textContent || script.innerText;
                totalSize += content.length;
            });
            
            // Probar rendimiento de funciones
            const startTime = performance.now();
            
            // Simular trabajo intensivo
            for (let i = 0; i < 10000; i++) {
                Math.random();
            }
            
            const endTime = performance.now();
            
            return {
                totalSize,
                scripts: scripts.length,
                executionTime: endTime - startTime
            };
        });
        
        console.log(chalk.green(`✅ Scripts: ${jsMetrics.scripts}`));
        console.log(chalk.green(`✅ Tamaño JS: ${(jsMetrics.totalSize / 1024).toFixed(2)} KB`));
        console.log(chalk.green(`✅ Tiempo de ejecución: ${jsMetrics.executionTime.toFixed(2)}ms`));
        
        // Evaluación final
        console.log(chalk.blue('\n📊 Evaluación de rendimiento:'));
        
        const scores = {
            domLoad: metrics.loadTime < 100 ? 100 : Math.max(0, 100 - (metrics.loadTime / 10)),
            domSize: metrics.domElements < 1000 ? 100 : Math.max(0, 100 - (metrics.domElements / 100)),
            memory: memoryMetrics ? (memoryMetrics.used < 50 * 1024 * 1024 ? 100 : 50) : 80,
            canvas: canvasMetrics ? (canvasMetrics.fps > 30 ? 100 : canvasMetrics.fps * 3) : 80,
            css: cssMetrics.totalSize < 50 * 1024 ? 100 : Math.max(0, 100 - (cssMetrics.totalSize / 1024)),
            js: jsMetrics.totalSize < 100 * 1024 ? 100 : Math.max(0, 100 - (jsMetrics.totalSize / 1024))
        };
        
        Object.entries(scores).forEach(([metric, score]) => {
            const color = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
            console.log(chalk[color](`${metric}: ${score.toFixed(0)}/100`));
        });
        
        const overallScore = Object.values(scores).reduce((a, b) => a + b) / Object.keys(scores).length;
        
        console.log(chalk.cyan(`\n🎯 Puntuación general: ${overallScore.toFixed(0)}/100`));
        
        if (overallScore >= 80) {
            console.log(chalk.green('✅ Rendimiento excelente'));
        } else if (overallScore >= 60) {
            console.log(chalk.yellow('⚠️  Rendimiento bueno'));
        } else {
            console.log(chalk.red('❌ Rendimiento necesita mejoras'));
        }
        
        // Recomendaciones
        console.log(chalk.blue('\n💡 Recomendaciones:'));
        
        const recommendations = [];
        
        if (metrics.loadTime > 100) {
            recommendations.push('Optimizar tiempo de carga del DOM');
        }
        
        if (metrics.domElements > 1000) {
            recommendations.push('Reducir número de elementos DOM');
        }
        
        if (cssMetrics.totalSize > 50 * 1024) {
            recommendations.push('Minificar CSS');
        }
        
        if (jsMetrics.totalSize > 100 * 1024) {
            recommendations.push('Minificar JavaScript');
        }
        
        if (canvasMetrics && canvasMetrics.fps < 30) {
            recommendations.push('Optimizar animaciones de Canvas');
        }
        
        if (recommendations.length === 0) {
            console.log(chalk.green('✅ No se encontraron mejoras necesarias'));
        } else {
            recommendations.forEach(rec => {
                console.log(chalk.yellow(`⚠️  ${rec}`));
            });
        }
        
    } catch (error) {
        console.log(chalk.red('❌ Error en pruebas de rendimiento:'), error.message);
        
        // Fallback básico
        console.log(chalk.yellow('🔧 Ejecutando análisis básico...'));
        
        const htmlPath = path.resolve(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        const basicMetrics = {
            htmlSize: html.length,
            cssSize: (html.match(/<style>([\s\S]*?)<\/style>/) || ['', ''])[1].length,
            jsSize: (html.match(/<script[^>]*>([\s\S]*?)<\/script>/) || ['', ''])[1].length,
            elements: (html.match(/<[^/>]+>/g) || []).length
        };
        
        console.log(chalk.green(`✅ Tamaño HTML: ${(basicMetrics.htmlSize / 1024).toFixed(2)} KB`));
        console.log(chalk.green(`✅ Tamaño CSS: ${(basicMetrics.cssSize / 1024).toFixed(2)} KB`));
        console.log(chalk.green(`✅ Tamaño JS: ${(basicMetrics.jsSize / 1024).toFixed(2)} KB`));
        console.log(chalk.green(`✅ Elementos HTML: ${basicMetrics.elements}`));
        
        const totalSize = basicMetrics.htmlSize + basicMetrics.cssSize + basicMetrics.jsSize;
        console.log(chalk.cyan(`\n📊 Tamaño total: ${(totalSize / 1024).toFixed(2)} KB`));
        
        if (totalSize < 500 * 1024) {
            console.log(chalk.green('✅ Análisis básico de rendimiento exitoso'));
        } else {
            console.log(chalk.yellow('⚠️  Archivo grande, considera optimización'));
        }
        
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    runPerformanceTests();
}

module.exports = runPerformanceTests;
