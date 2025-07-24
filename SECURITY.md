# 🔒 Configuración de Seguridad

Este documento explica cómo manejar la configuración sensible del proyecto de forma segura.

## 📁 Archivos de Configuración

### `.env` - Variables de Entorno
```bash
# Archivo protegido - NO subir a GitHub
WEBHOOK_URL=[URL_PROTEGIDA_DEL_WEBHOOK]
PROJECT_NAME=Generador Análisis Empresarial
PROJECT_VERSION=1.0.0
ENVIRONMENT=production
```

### `config.js` - Configuración del Cliente
- **Propósito**: Configuración para el navegador
- **Seguridad**: URLs públicas y configuración general
- **Uso**: Cargado en `index.html`

### `.gitignore` - Archivos Protegidos
- ✅ `.env` y variantes
- ✅ Archivos de editor
- ✅ Logs y temporales
- ✅ Cache y builds

## 🚀 Configuración del Proyecto

### Para Desarrollo Local:
1. **Copia el archivo `.env.example`** (si existe)
2. **Renombra a `.env`**
3. **Actualiza las URLs** con tus valores
4. **No subas `.env` a GitHub**

### Para Producción (GitHub Pages):
1. **Variables públicas** → `config.js`
2. **Variables sensibles** → Variables de entorno del servidor
3. **URLs de webhook** → Configuración segura

## 🔧 Uso en el Código

### JavaScript (Cliente):
```javascript
// Usar configuración desde config.js
const webhookUrl = CONFIG.WEBHOOK_URL;
const projectName = CONFIG.PROJECT_NAME;
```

### Variables Disponibles:
- `CONFIG.WEBHOOK_URL` - URL del webhook de Make.com
- `CONFIG.PROJECT_NAME` - Nombre del proyecto
- `CONFIG.PROJECT_VERSION` - Versión actual
- `CONFIG.ENVIRONMENT` - Entorno (development/production)

## ⚠️ Importante

### ❌ NO hacer:
- Subir archivos `.env` a GitHub
- Hardcodear URLs sensibles en el código
- Compartir webhooks en repositorios públicos

### ✅ SÍ hacer:
- Usar variables de configuración
- Documentar la configuración necesaria
- Mantener `.gitignore` actualizado
- Rotar webhooks si se comprometen

## 🔄 Actualización de Webhooks

Si necesitas cambiar la URL del webhook:

1. **Actualiza `.env`**:
   ```bash
   WEBHOOK_URL=nueva_url_aqui
   ```

2. **Actualiza `config.js`**:
   ```javascript
   WEBHOOK_URL: 'nueva_url_aqui'
   ```

3. **Prueba la configuración**:
   ```bash
   curl -X POST -H "Content-Type: application/json" \
   -d '{"company_name": "Test"}' NUEVA_URL
   ```

## 👥 Para el Equipo

### Al clonar el repositorio:
1. Crear tu propio archivo `.env`
2. Solicitar las URLs de webhook al equipo
3. Verificar que `.env` está en `.gitignore`
4. Probar la configuración localmente

---

**📝 Nota**: Este sistema protege las URLs sensibles mientras mantiene la funcionalidad del proyecto en GitHub Pages.
