---
layout: default
title: "Configuración - VoltScrapper"
description: "Configuración técnica detallada del proyecto VoltScrapper"
permalink: /docs/config/
---

# ⚙️ Configuración del Proyecto VoltScrapper

Esta página detalla toda la configuración técnica del proyecto VoltScrapper - Generador de Análisis Empresarial.

## � Archivos de Configuración

### `config/config.js` - Configuración Principal
```javascript
const CONFIG = {
    // URL del webhook de Make.com
    WEBHOOK_URL: 'https://hook.eu2.make.com/tu_webhook_id_real',
    
    // Información del proyecto
    PROJECT_NAME: 'VoltScrapper - Análisis Empresarial',
    PROJECT_VERSION: '1.0.0',
    ENVIRONMENT: 'production'
};

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
```

### `_config.yml` - Configuración de Jekyll
```yaml
title: VoltScrapper
description: >-
  Generador automatizado de análisis empresarial usando Canvas API
  y integración con Make.com para procesamiento de datos.

baseurl: "/Proyecto_3_VoltScrapper"
url: "https://javiidiazglez.github.io"

# Configuración de construcción
markdown: kramdown
highlighter: rouge
theme: minima

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap

# Exclusiones
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
  - tests/
  - coverage/
```

### `package.json` - Configuración de Node.js
```json
{
  "name": "voltscrapper",
  "version": "1.0.0",
  "description": "Generador automatizado de análisis empresarial",
  "main": "index.html",
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "coverage:open": "start coverage/index.html"
  },
  "dependencies": {},
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

## 📋 Información General

| 🔧 **Parámetro** | 📈 **Valor** | 📝 **Descripción** |
|------------------|--------------|-------------------|
| **Versión** | 1.0.0 | Versión actual del sistema |
| **Entorno** | Producción | GitHub Pages optimizado |
| **Framework** | Jekyll | Generador de sitios estáticos |
| **Stack** | HTML5 + CSS3 + JavaScript ES6+ | Tecnologías principales |
| **Timer** | 30 minutos | Tiempo máximo de procesamiento |
| **Favicon** | favicon.svg | Icono único del sitio |

## 🔗 Configuración de API

### Webhook Principal (Make.com)
```
URL: [Visible en config/config.js]
Método: POST
Content-Type: application/json
Timeout: 30 minutos (1,800 segundos)
Reintento: Automático con exponential backoff
```

### Formato de Petición
```json
{
  "company_name": "Nombre de la empresa sanitizado",
  "email": "usuario@validado.com"
}
```

### Validación de Email
```javascript
// Regex de validación implementada
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validación en tiempo real con feedback visual
function validateEmail(email) {
    return emailRegex.test(email);
}
```

### Formato de Respuesta Esperada
```json
{
  "status": "success",
  "message": "Análisis generado correctamente",
  "WebViewLink": "https://docs.google.com/document/d/ID_DOCUMENTO/edit",
  "data": {
    "documentId": "ID_DOCUMENTO",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

## 🎨 Configuración de Estilos

### Variables CSS Principales
```css
:root {
    /* Colores principales */
    --primary-color: #4a90e2;
    --primary-hover: #357abd;
    --secondary-color: #f39c12;
    
    /* Estados */
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --error-color: #e74c3c;
    
    /* Fondos */
    --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-overlay: rgba(0, 0, 0, 0.7);
    
    /* Texto */
    --text-primary: #ffffff;
    --text-secondary: #ecf0f1;
    --text-muted: rgba(255, 255, 255, 0.8);
}
```

### Configuración Responsive
```css
/* Breakpoints principales */
@media (max-width: 768px) {
    .container { max-width: 100%; padding: 0 20px; }
    .iframe-container iframe { width: 100%; margin-left: 0; }
}

@media (max-width: 480px) {
    .form-container { width: 95%; }
    .btn { font-size: 16px; }
}
```

## ⏱️ Configuración del Timer

### Timer de Procesamiento (30 minutos)
```javascript
const TIMER_CONFIG = {
    duration: 30 * 60,     // 30 minutos en segundos
    interval: 1000,        // Actualizar cada segundo
    format: 'MM:SS',       // Formato de visualización
    autoStart: true,       // Iniciar automáticamente
    showWarning: 300       // Advertencia en últimos 5 minutos
};

// Implementación del timer
function startProcessingTimer() {
    let timeLeft = TIMER_CONFIG.duration;
    const timerDisplay = document.getElementById('timer-display');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
        timeLeft--;
    }, TIMER_CONFIG.interval);
}
```

## 📊 Configuración del Iframe

### Iframe Optimizado para Google Docs
```css
.iframe-container iframe {
    width: 140%;                    /* Ancho expandido */
    height: 1100px;                 /* Altura mínima */
    border: none;                   /* Sin borde */
    margin-left: -20%;              /* Centrado perfecto */
    border-radius: 8px;             /* Bordes redondeados */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}
```

### Parámetros de URL de Google Docs
```javascript
// Parámetros para vista limpia
const googleDocsParams = [
    'embedded=true',        // Vista embebida
    'rm=minimal',          // Interfaz mínima
    'chrome=false',        // Sin barra de herramientas
    'headers=false'        // Sin encabezados
].join('&');
```

## 🧪 Configuración de Testing

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text', 'lcov'],
    testMatch: ['**/tests/**/*.js'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/tests/coverage-report.js'
    ]
};
```

### Scripts de Testing
```bash
# Windows
run-all-tests.bat        # Ejecutar todas las pruebas
view-coverage.bat        # Ver reporte de cobertura

# Linux/macOS
./run-all-tests.sh       # Ejecutar todas las pruebas
./view-coverage.sh       # Ver reporte de cobertura

# NPM
npm test                 # Ejecutar pruebas con Jest
npm run test:coverage    # Generar reporte de cobertura
```

### Métricas de Calidad
| 🎯 **Métrica** | 📈 **Objetivo** | ✅ **Actual** |
|----------------|-----------------|---------------|
| **Pruebas Unitarias** | 100% éxito | 31/31 ✅ |
| **Cobertura HTML** | ≥90% | 100% ✅ |
| **Cobertura CSS** | ≥90% | 100% ✅ |
| **Cobertura JavaScript** | ≥70% | 77.8% ✅ |

## 🌐 Configuración de Despliegue

### GitHub Pages
```yaml
# Configuración automática
source: main branch
build: Jekyll
domain: javiidiazglez.github.io/Proyecto_3_VoltScrapper
ssl: Habilitado (HTTPS)
auto-deploy: true
```

### Scripts de Despliegue
```bash
# Windows
deploy.bat              # Despliegue automatizado

# Linux/macOS
./deploy.sh             # Despliegue automatizado

# Manual
git add .
git commit -m "Deploy: $(date)"
git push origin main
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad (GitHub Pages)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

### Validaciones de Entrada
```javascript
// Sanitización de inputs
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '').trim();
}

// Validación de nombre de empresa
function validateCompanyName(name) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]+$/;
    return pattern.test(name) && name.length >= 2 && name.length <= 100;
}
```

### Configuración de CORS
```javascript
// Headers para requests seguros
const secureHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};
```

## 🚀 Configuración de Performance

### Optimizaciones Aplicadas
- ✅ **CSS**: Variables CSS, flexbox/grid optimizado
- ✅ **JavaScript**: ES6+ con debouncing y throttling
- ✅ **HTML**: Estructura semántica, meta tags completos
- ✅ **Canvas**: Animación Matrix optimizada (60 FPS)
- ✅ **Responsive**: Media queries eficientes
- ✅ **Iframe**: Lazy loading y parámetros optimizados
- ✅ **Forms**: Validación asíncrona con feedback inmediato

### Métricas de Rendimiento
| 📊 **Métrica** | 🎯 **Valor** |
|----------------|--------------|
| **Tamaño Total** | ~20 KB |
| **HTML** | 4.5 KB |
| **CSS** | 8.0 KB |
| **JavaScript** | 7.5 KB |
| **Tiempo de Carga** | < 2 segundos |
| **Time to Interactive** | < 3 segundos |

## � Configuración Mobile

### Viewport y Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### Optimizaciones Táctiles
```css
/* Área mínima de toque */
.btn, .input-field {
    min-height: 44px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
```

## �🔧 Comandos de Mantenimiento

### Verificación del Sistema
```bash
# Verificar estado del sitio
curl -I https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/

# Probar funcionalidad local
python -m http.server 8000
# Visitar: http://localhost:8000

# Validar HTML
npx html-validate index.html

# Verificar configuración de Jest
npm test -- --verbose
```

### Actualización de Dependencias
```bash
# Actualizar gems de Ruby
bundle update

# Actualizar dependencias de Node.js
npm update

# Verificar versiones
bundle list
npm list
```

## 📚 Enlaces de Configuración

- 🏠 **[Página Principal](../)**
- 🧪 **[Documentación de Testing](../tests/README.md)**
- 📖 **[Setup del Proyecto](./SETUP.md)**
- 🔒 **[Configuración de Seguridad](./SECURITY.md)**
- � **[Reporte de Cobertura](../coverage/index.html)**

## 🔍 Variables de Entorno por Contexto

### Desarrollo Local
```javascript
// Para desarrollo, modificar config/config.js temporalmente
const CONFIG = {
    WEBHOOK_URL: 'https://webhook-de-desarrollo.com/test',
    PROJECT_NAME: 'VoltScrapper - Desarrollo',
    ENVIRONMENT: 'development'
};
```

### Producción (GitHub Pages)
```javascript
// Configuración optimizada para producción
const CONFIG = {
    WEBHOOK_URL: 'https://hook.eu2.make.com/tu_webhook_id',
    PROJECT_NAME: 'VoltScrapper - Análisis Empresarial',
    ENVIRONMENT: 'production'
};
```

### Testing
```javascript
// Para el entorno de pruebas
const CONFIG = {
    WEBHOOK_URL: 'https://httpbin.org/post', // Mock endpoint
    PROJECT_NAME: 'VoltScrapper - Test',
    ENVIRONMENT: 'test'
};
```

---

**📝 Nota**: Esta configuración está optimizada para GitHub Pages con funcionalidad completa, incluyendo timer de 30 minutos, validación avanzada, manejo robusto de webhooks y iframe optimizado para Google Docs. Todas las características están implementadas sin dependencias externas y con máxima compatibilidad.
