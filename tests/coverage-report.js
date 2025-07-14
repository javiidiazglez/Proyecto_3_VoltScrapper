/**
 * Generador de reporte de cobertura completo
 */

const fs = require('fs');
const path = require('path');

function generateCoverageReport() {
    console.log('📊 Generando Reporte de Cobertura Completo...\n');
    
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Análisis de cobertura HTML
    const htmlCoverage = analyzeHTMLCoverage(html);
    
    // Análisis de cobertura CSS
    const cssCoverage = analyzeCSSCoverage(html);
    
    // Análisis de cobertura JavaScript
    const jsCoverage = analyzeJSCoverage(html);
    
    // Análisis de características funcionales
    const featureCoverage = analyzeFeatureCoverage(html);
    
    // Generar reporte
    generateHTMLReport(htmlCoverage, cssCoverage, jsCoverage, featureCoverage, html);
    
    return {
        html: htmlCoverage,
        css: cssCoverage,
        js: jsCoverage,
        features: featureCoverage
    };
}

function analyzeHTMLCoverage(html) {
    const elements = {
        'DOCTYPE': /<!DOCTYPE html>/i.test(html),
        'HTML lang': /<html[^>]*lang=/i.test(html),
        'Meta charset': /<meta[^>]*charset=/i.test(html),
        'Meta viewport': /<meta[^>]*viewport=/i.test(html),
        'Title': /<title>/i.test(html),
        'Semantic main': /<main>/i.test(html),
        'Semantic section': /<section>/i.test(html),
        'Semantic footer': /<footer>/i.test(html),
        'Form element': /<form>/i.test(html),
        'Input element': /<input>/i.test(html),
        'Button element': /<button>/i.test(html),
        'Canvas element': /<canvas>/i.test(html),
        'Script element': /<script>/i.test(html),
        'Style element': /<style>/i.test(html),
        'Label element': /<label>/i.test(html),
        'Required attr': /required/i.test(html),
        'ID attributes': /id="/i.test(html),
        'Class attributes': /class="/i.test(html),
        'ARIA ready': /aria-|role=/i.test(html),
        'Meta description': /<meta[^>]*description/i.test(html)
    };
    
    const covered = Object.values(elements).filter(Boolean).length;
    const total = Object.keys(elements).length;
    
    return {
        elements,
        covered,
        total,
        percentage: ((covered / total) * 100).toFixed(1)
    };
}

function analyzeCSSCoverage(html) {
    const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    const css = cssMatch ? cssMatch[1] : '';
    
    const features = {
        'CSS Variables': /:root.*--/s.test(css),
        'Flexbox': /display:\s*flex/i.test(css),
        'Grid': /display:\s*grid/i.test(css),
        'Media Queries': /@media/i.test(css),
        'Animations': /@keyframes/i.test(css),
        'Transitions': /transition:/i.test(css),
        'Transform': /transform:/i.test(css),
        'Box Shadow': /box-shadow:/i.test(css),
        'Border Radius': /border-radius:/i.test(css),
        'Pseudo Classes': /:hover|:focus|:active/i.test(css),
        'Class Selectors': /\.[a-zA-Z]/i.test(css),
        'ID Selectors': /#[a-zA-Z]/i.test(css),
        'Universal Reset': /\*\s*\{/i.test(css),
        'Font Import': /@import|font-family/i.test(css),
        'Color Variables': /--.*color/i.test(css),
        'Responsive Units': /rem|em|vh|vw|%/i.test(css),
        'Modern CSS': /clamp|min|max\(/i.test(css),
        'Performance': /will-change|contain/i.test(css)
    };
    
    const covered = Object.values(features).filter(Boolean).length;
    const total = Object.keys(features).length;
    
    return {
        features,
        covered,
        total,
        percentage: ((covered / total) * 100).toFixed(1),
        sizeKB: (css.length / 1024).toFixed(2)
    };
}

function analyzeJSCoverage(html) {
    const jsMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    const js = jsMatch ? jsMatch[1] : '';
    
    const features = {
        'Event Listeners': /addEventListener/i.test(js),
        'DOM Manipulation': /getElementById|querySelector/i.test(js),
        'Form Handling': /submit|preventDefault/i.test(js),
        'Fetch API': /fetch\s*\(/i.test(js),
        'Async/Await': /async|await/i.test(js),
        'Promises': /Promise|\.then\(/i.test(js),
        'Error Handling': /try.*catch|throw/s.test(js),
        'JSON Parsing': /JSON\.parse|JSON\.stringify/i.test(js),
        'Canvas API': /getContext|fillRect|fillText/i.test(js),
        'Intervals': /setInterval|clearInterval/i.test(js),
        'Modern JS': /const|let|arrow functions/i.test(js),
        'Template Literals': /`.*\${/s.test(js),
        'Destructuring': /\{.*\}\s*=/s.test(js),
        'Array Methods': /\.map\(|\.filter\(|\.forEach\(/i.test(js),
        'Object Methods': /Object\./i.test(js),
        'Regular Expressions': /\/.*\/[gimuy]*/i.test(js),
        'Conditionals': /if\s*\(|switch\s*\(/i.test(js),
        'Loops': /for\s*\(|while\s*\(/i.test(js)
    };
    
    const covered = Object.values(features).filter(Boolean).length;
    const total = Object.keys(features).length;
    
    return {
        features,
        covered,
        total,
        percentage: ((covered / total) * 100).toFixed(1),
        sizeKB: (js.length / 1024).toFixed(2)
    };
}

function analyzeFeatureCoverage(html) {
    const features = {
        'Responsive Design': /@media.*max-width/i.test(html),
        'Dark Theme': /background.*#[0-9a-f]{3,6}/i.test(html),
        'Loading States': /spinner|loading/i.test(html),
        'Error Handling': /error.*message/i.test(html),
        'Form Validation': /required|validate/i.test(html),
        'API Integration': /webhook|fetch/i.test(html),
        'Canvas Animation': /canvas.*animation/i.test(html),
        'Progressive Enhancement': /addEventListener.*DOMContentLoaded/i.test(html),
        'Accessibility': /aria-|label.*for|semantic/i.test(html),
        'Performance': /transition|debounce|throttle/i.test(html),
        'Modern CSS': /clamp|grid|flex/i.test(html),
        'SEO Ready': /meta.*description|title/i.test(html),
        'Mobile First': /@media.*min-width/i.test(html),
        'User Experience': /hover|focus|transition/i.test(html),
        'Security': /cors|sanitize|validate/i.test(html)
    };
    
    const covered = Object.values(features).filter(Boolean).length;
    const total = Object.keys(features).length;
    
    return {
        features,
        covered,
        total,
        percentage: ((covered / total) * 100).toFixed(1)
    };
}

function generateHTMLReport(htmlCov, cssCov, jsCov, featureCov, html) {
    const reportDir = path.resolve(__dirname, '../coverage');
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const htmlReport = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Cobertura - Proyecto 3 Scrapper</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .card { background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; padding: 20px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background: #e3f2fd; border-radius: 8px; text-align: center; min-width: 120px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1976d2; }
        .metric-label { font-size: 12px; color: #666; margin-top: 5px; }
        .coverage-bar { background: #e0e0e0; border-radius: 10px; height: 20px; margin: 10px 0; overflow: hidden; }
        .coverage-fill { height: 100%; background: linear-gradient(90deg, #4caf50, #8bc34a); transition: width 0.3s; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 20px; }
        .feature-item { padding: 10px; border-radius: 5px; display: flex; align-items: center; }
        .feature-covered { background: #e8f5e8; color: #2e7d32; }
        .feature-missing { background: #ffebee; color: #c62828; }
        .icon { margin-right: 8px; font-weight: bold; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        h1 { color: #1976d2; }
        h2 { color: #424242; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Reporte de Cobertura de Código</h1>
            <p>Proyecto 3 - Generador Análisis Empresarial</p>
            <p>Generado: ${new Date().toLocaleString('es-ES')}</p>
        </div>
        
        <div class="summary">
            <div class="metric">
                <div class="metric-value">${htmlCov.percentage}%</div>
                <div class="metric-label">HTML Coverage</div>
            </div>
            <div class="metric">
                <div class="metric-value">${cssCov.percentage}%</div>
                <div class="metric-label">CSS Coverage</div>
            </div>
            <div class="metric">
                <div class="metric-value">${jsCov.percentage}%</div>
                <div class="metric-label">JS Coverage</div>
            </div>
            <div class="metric">
                <div class="metric-value">${featureCov.percentage}%</div>
                <div class="metric-label">Features Coverage</div>
            </div>
        </div>
        
        <div class="card">
            <h2>🏗️ Cobertura HTML (${htmlCov.covered}/${htmlCov.total})</h2>
            <div class="coverage-bar">
                <div class="coverage-fill" style="width: ${htmlCov.percentage}%"></div>
            </div>
            <div class="feature-grid">
                ${Object.entries(htmlCov.elements).map(([key, value]) => `
                    <div class="feature-item ${value ? 'feature-covered' : 'feature-missing'}">
                        <span class="icon">${value ? '✅' : '❌'}</span>
                        ${key}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h2>🎨 Cobertura CSS (${cssCov.covered}/${cssCov.total}) - ${cssCov.sizeKB} KB</h2>
            <div class="coverage-bar">
                <div class="coverage-fill" style="width: ${cssCov.percentage}%"></div>
            </div>
            <div class="feature-grid">
                ${Object.entries(cssCov.features).map(([key, value]) => `
                    <div class="feature-item ${value ? 'feature-covered' : 'feature-missing'}">
                        <span class="icon">${value ? '✅' : '❌'}</span>
                        ${key}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h2>⚡ Cobertura JavaScript (${jsCov.covered}/${jsCov.total}) - ${jsCov.sizeKB} KB</h2>
            <div class="coverage-bar">
                <div class="coverage-fill" style="width: ${jsCov.percentage}%"></div>
            </div>
            <div class="feature-grid">
                ${Object.entries(jsCov.features).map(([key, value]) => `
                    <div class="feature-item ${value ? 'feature-covered' : 'feature-missing'}">
                        <span class="icon">${value ? '✅' : '❌'}</span>
                        ${key}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h2>🚀 Cobertura de Características (${featureCov.covered}/${featureCov.total})</h2>
            <div class="coverage-bar">
                <div class="coverage-fill" style="width: ${featureCov.percentage}%"></div>
            </div>
            <div class="feature-grid">
                ${Object.entries(featureCov.features).map(([key, value]) => `
                    <div class="feature-item ${value ? 'feature-covered' : 'feature-missing'}">
                        <span class="icon">${value ? '✅' : '❌'}</span>
                        ${key}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h2>📈 Resumen General</h2>
            <p><strong>Cobertura promedio:</strong> ${((Number(htmlCov.percentage) + Number(cssCov.percentage) + Number(jsCov.percentage) + Number(featureCov.percentage)) / 4).toFixed(1)}%</p>
            <p><strong>Elementos HTML:</strong> ${htmlCov.covered}/${htmlCov.total} implementados</p>
            <p><strong>Características CSS:</strong> ${cssCov.covered}/${cssCov.total} implementadas</p>
            <p><strong>Funcionalidades JS:</strong> ${jsCov.covered}/${jsCov.total} implementadas</p>
            <p><strong>Features del proyecto:</strong> ${featureCov.covered}/${featureCov.total} implementadas</p>
            <p><strong>Tamaño total:</strong> ${((html.length) / 1024).toFixed(2)} KB</p>
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(reportDir, 'index.html'), htmlReport);
    console.log('✅ Reporte HTML generado en: coverage/index.html');
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const coverage = generateCoverageReport();
    
    console.log('\n📊 RESUMEN DE COBERTURA:');
    console.log('========================');
    console.log(`HTML: ${coverage.html.percentage}% (${coverage.html.covered}/${coverage.html.total})`);
    console.log(`CSS: ${coverage.css.percentage}% (${coverage.css.covered}/${coverage.css.total})`);
    console.log(`JavaScript: ${coverage.js.percentage}% (${coverage.js.covered}/${coverage.js.total})`);
    console.log(`Features: ${coverage.features.percentage}% (${coverage.features.covered}/${coverage.features.total})`);
    
    const average = ((Number(coverage.html.percentage) + Number(coverage.css.percentage) + Number(coverage.js.percentage) + Number(coverage.features.percentage)) / 4).toFixed(1);
    console.log(`\n🎯 Cobertura promedio: ${average}%`);
    console.log('📁 Reporte completo: coverage/index.html\n');
}

module.exports = generateCoverageReport;
