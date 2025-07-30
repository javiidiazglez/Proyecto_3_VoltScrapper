# 🚀 Configuración del Proyecto VoltScrapper

Esta guía detalla la configuración completa del proyecto VoltScrapper, desde la instalación hasta el despliegue en GitHub Pages.

## 📋 Prerrequisitos

- **Git** instalado en el sistema
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)
- **Conexión a internet** para webhooks y recursos externos
- **Editor de código** (recomendado: VS Code)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/javiidiazglez/Proyecto_3_VoltScrapper.git
cd Proyecto_3_VoltScrapper
```

### 2. Estructura del Proyecto
```
Proyecto_3_VoltScrapper/
├── index.html                 # Página principal
├── favicon.svg                # Icono del sitio
├── config/
│   └── config.js             # Configuración del cliente
├── tests/
│   ├── test-unico.js         # Suite de pruebas
│   ├── coverage-report.js    # Reporte de cobertura
│   └── README.md             # Documentación de pruebas
├── docs/
│   ├── SETUP.md              # Este archivo
│   ├── SECURITY.md           # Políticas de seguridad
│   └── config.md             # Documentación de configuración
├── coverage/
│   └── index.html            # Reporte visual de cobertura
├── _layouts/
│   └── default.html          # Layout para Jekyll/GitHub Pages
├── package.json              # Dependencias y scripts
├── jest.config.js            # Configuración de Jest
├── _config.yml               # Configuración de Jekyll
├── Gemfile                   # Dependencias de Ruby
└── README.md                 # Documentación principal
```

### 3. Configuración del Entorno

#### Variables de Configuración
El proyecto utiliza `config/config.js` para la configuración del cliente:

```javascript
// config/config.js
const CONFIG = {
    WEBHOOK_URL: 'https://hook.eu2.make.com/tu_webhook_id',
    PROJECT_NAME: 'VoltScrapper - Análisis Empresarial',
    PROJECT_VERSION: '1.0.0',
    ENVIRONMENT: 'production'
};
```

#### Configuración de Desarrollo Local
```bash
# Servidor con Python 3
python -m http.server 8000

# Servidor con Python 2
python -m SimpleHTTPServer 8000

# Servidor con Node.js
npx http-server

# Con Live Server en VS Code
# Instalar extensión "Live Server" y hacer clic derecho → "Open with Live Server"
```

## 🚀 Configuración de GitHub Pages

### 1. Subir el Proyecto a GitHub
```bash
# Si es un repositorio nuevo
git init
git add .
git commit -m "Configuración inicial para GitHub Pages"
git remote add origin https://github.com/javiidiazglez/Proyecto_3_VoltScrapper.git
git push -u origin main

# Si ya existe el repositorio
git add .
git commit -m "Actualización del proyecto"
git push origin main
```

### 2. Configurar GitHub Pages en el Repositorio

1. Ve a tu repositorio en GitHub
2. Clic en **Settings** (Configuración)
3. Scroll down hasta la sección **Pages**
4. En **Source** selecciona **Deploy from a branch**
5. Selecciona la rama **main**
6. Selecciona **/ (root)** como carpeta
7. Clic en **Save**

### 3. Configuración Automática con Jekyll

El archivo `_config.yml` ya está configurado:
```yaml
title: VoltScrapper
description: Generador de Análisis Empresarial Automatizado
theme: minima
plugins:
  - jekyll-feed
```

### 4. URLs de Acceso

Una vez configurado, el sitio estará disponible en:
- **URL principal**: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/
- **Documentación**: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/docs/

### 5. Scripts de Despliegue Automatizado

#### Windows:
```bash
deploy.bat    # Despliegue automatizado
```

#### Linux/macOS:
```bash
./deploy.sh   # Despliegue automatizado
```

## 🧪 Configuración de Pruebas

### Instalación de Dependencias
```bash
npm install
```

### Ejecución de Pruebas

#### Scripts Automáticos:

**Windows:**
```bash
run-all-tests.bat     # Ejecutar todas las pruebas
view-coverage.bat     # Ver reporte de cobertura
```

**Linux/macOS:**
```bash
./run-all-tests.sh    # Ejecutar todas las pruebas
./view-coverage.sh    # Ver reporte de cobertura
```

#### Scripts NPM:
```bash
npm test              # Ejecutar pruebas con Jest
npm run test:coverage # Generar reporte de cobertura
```

### Configuración de Jest
```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text', 'lcov'],
    testMatch: ['**/tests/**/*.js']
};
```

## � Configuración de Desarrollo

### Extensiones Recomendadas para VS Code
```json
{
    "recommendations": [
        "ritwickdey.liveserver",      // Servidor de desarrollo
        "orta.vscode-jest",           // Soporte para Jest
        "tobermory.es6-string-html",  // Sintaxis HTML en JS
        "ms-vscode.vscode-json"       // Mejor soporte JSON
    ]
}
```

### Configuración del Workspace
```json
// .vscode/settings.json
{
    "liveServer.settings.port": 8080,
    "files.associations": {
        "*.md": "markdown"
    }
}
```

## 🌟 Características del Proyecto

### 📧 Validación de Email Avanzada
- **Regex robusto**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- **Feedback visual**: Bordes rojos/verdes según validación
- **Validación en tiempo real**: Después de interacción del usuario
- **Sanitización**: Prevención de XSS y caracteres peligrosos

### ⏱️ Timer de Procesamiento
- **Duración**: 30 minutos máximo de espera
- **Visualización**: Minutos y segundos en tiempo real
- **Funcionalidad**: Cuenta regresiva desde 30:00 hasta 00:00
- **Estados**: Activo durante el procesamiento del webhook

### 📊 Iframe Optimizado para Google Docs
- **Tamaño**: 140% de ancho, 1100px de altura mínima
- **Centrado**: Transform translateX(-50%) para centrado perfecto
- **Responsive**: Ajustes automáticos en dispositivos móviles
- **Parámetros especiales**: Vista limpia sin barras de herramientas

### 🔄 Gestión de Estados
- **Procesamiento**: Spinner animado + timer + mensaje informativo
- **Éxito**: Iframe con documento generado + mensaje de email
- **Error**: Manejo elegante con logging detallado
- **Feedback**: Mensajes claros para el usuario

### 🛡️ Seguridad Implementada
- **URLs configuradas**: Webhook visible en `config.js`
- **Validación de entrada**: Sanitización de todos los inputs
- **Timeout de requests**: Máximo 30 minutos de espera
- **Logging seguro**: Sin exposición de datos sensibles

## 🔍 Verificación de la Instalación

### 1. Prueba Local
```bash
# Iniciar servidor local
python -m http.server 8000

# Abrir en navegador
# http://localhost:8000
```

### 2. Verificar Funcionalidad
- ✅ Interfaz se carga correctamente
- ✅ Formulario acepta inputs válidos
- ✅ Validación de email funciona
- ✅ Timer se activa durante procesamiento
- ✅ Mensaje de correo aparece
- ✅ Iframe se muestra al recibir respuesta

### 3. Ejecutar Suite de Pruebas
```bash
npm test
# Resultado esperado: Todas las pruebas pasan
```

### 4. Verificar GitHub Pages
- Visita: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/
- ✅ Sitio se carga sin errores
- ✅ Funcionalidad completa disponible
- ✅ Webhooks responden correctamente

## 🛠️ Solución de Problemas

### Errores Comunes

#### "CONFIG is not defined"
```javascript
// Verificar en consola del navegador
console.log(typeof CONFIG);
// Debe mostrar "object"
```
**Solución**: Verificar que `config/config.js` existe y se carga en `index.html`

#### Webhook no responde
```bash
# Probar manualmente
curl -X POST -H "Content-Type: application/json" \
-d '{"company_name": "Test", "email": "test@example.com"}' \
[URL_DEL_WEBHOOK]
```
**Solución**: Verificar URL en `config/config.js`

#### Tests fallan
```bash
# Limpiar e instalar dependencias
rm -rf node_modules package-lock.json
npm install
npm test
```

#### GitHub Pages no actualiza
- **Esperar**: 1-5 minutos para propagación
- **Verificar**: Pestaña "Actions" en GitHub
- **Limpiar**: Caché del navegador (Ctrl+F5)

### Logs de Depuración
```javascript
// El proyecto incluye logging detallado
// Abrir DevTools (F12) → Console
// Durante procesamiento verás logs como:
// "Enviando datos: {company_name: '...', email: '...'}"
// "Respuesta recibida: {status: 'success', ...}"
```

## 📞 Soporte y Recursos

### Documentación Relacionada
- **README.md**: Visión general del proyecto
- **SECURITY.md**: Políticas de seguridad
- **config.md**: Configuración detallada
- **tests/README.md**: Documentación de pruebas

### Recursos Externos
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Make.com Webhooks](https://www.make.com/en/help/scenarios/webhooks)

### Información del Sistema
```bash
# Verificar versiones
node --version    # Para npm y dependencias
git --version     # Para control de versiones

# En navegador (DevTools Console)
navigator.userAgent  # Información del navegador
```

---

**🎉 ¡Proyecto listo para producción!** El sitio está optimizado para GitHub Pages con funcionalidad completa, incluyendo timer de 30 minutos, validación avanzada y manejo robusto de webhooks.
