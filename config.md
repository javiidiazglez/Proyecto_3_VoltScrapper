# ⚙️ Configuración del Sistema

Documentación técnica de configuración para el **Generador de Análisis Empresarial**.

## 📋 Información General

| 🔧 **Parámetro** | 📈 **Valor** | 📝 **Descripción** |
|------------------|--------------|-------------------|
| **Versión** | 1.0.0 | Versión actual del sistema |
| **Entorno** | Producción | GitHub Pages |
| **Framework** | Jekyll | Generador de sitios estáticos |
| **Lenguaje** | HTML5 + CSS3 + JavaScript ES6+ | Stack tecnológico |

## 🌐 Configuración de Despliegue

### GitHub Pages
```yaml
# Configuración automática
source: main branch
build: Jekyll
domain: javiidiazglez.github.io/Proyecto_3_Scrapper
ssl: Habilitado (HTTPS)
```

### Variables de Entorno
```javascript
// Variables CSS principales
:root {
  --background-color: #050810;
  --card-background: #101827;
  --accent-color: #00a99d;
  --text-color: #e5e7eb;
  --border-color: rgba(0, 169, 157, 0.4);
}
```

## � Configuración de API

### Webhook Principal
```
URL: https://hook.eu2.make.com/1qcydci1g8342nh74ibrfvkzzvvoeg81
Método: POST
Content-Type: application/json
Timeout: 30 segundos
```

### Formato de Petición
```json
{
  "company_name": "Nombre de la empresa"
}
```

### Formato de Respuesta Esperada
```json
{
  "WebViewLink": "https://docs.google.com/document/d/[ID]/edit?usp=sharing"
}
```

## 📊 Configuración de Testing

### Scripts Disponibles
```bash
# Ejecutar todas las pruebas
./run-all-tests.sh        # Linux/Mac
./run-all-tests.bat       # Windows

# Solo test único
node test-unico.js

# Solo reporte de cobertura
node tests/coverage-report.js

# Ver reporte de cobertura
./view-coverage.sh        # Linux/Mac
./view-coverage.bat       # Windows
```

### Métricas de Calidad
| 🎯 **Métrica** | 📈 **Objetivo** | ✅ **Actual** |
|----------------|-----------------|---------------|
| **Pruebas** | 100% éxito | 31/31 ✅ |
| **Cobertura HTML** | ≥90% | 100% ✅ |
| **Cobertura CSS** | ≥90% | 100% ✅ |
| **Cobertura JS** | ≥70% | 77.8% ✅ |

## 🛠️ Configuración de Desarrollo

### Estructura de Archivos
```
📁 Proyecto_3_Scrapper/
├── 🌐 index.html              # Aplicación principal
├── ⚙️ _config.yml             # Configuración Jekyll
├── 💎 Gemfile                 # Dependencias Ruby
├── 🧪 tests/                  # Suite de testing
│   ├── test-unico.js          # 31 pruebas automatizadas
│   ├── coverage-report.js     # Generador de reportes
│   └── README.md              # Documentación de testing
├── 📊 coverage/               # Reportes de cobertura
├── 📄 *.md                    # Documentación
└── 🔄 Scripts de testing      # Automatización
```

### Dependencias
```ruby
# Gemfile
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "jekyll-feed"
gem "jekyll-sitemap"
```

## 🚀 Configuración de Performance

### Optimizaciones Aplicadas
- ✅ **CSS**: Variables CSS, minificación automática
- ✅ **JavaScript**: ES6+ con optimizaciones de DOM
- ✅ **HTML**: Estructura semántica, meta tags completos
- ✅ **Canvas**: Animación Matrix optimizada (60 FPS)
- ✅ **Responsive**: Media queries y Flexbox/Grid

### Métricas de Rendimiento
| 📊 **Métrica** | 🎯 **Valor** |
|----------------|--------------|
| **Tamaño total** | 19.51 KB |
| **HTML** | 4.24 KB |
| **CSS** | 7.79 KB |
| **JavaScript** | 7.48 KB |
| **Tiempo de carga** | < 2 segundos |

## 🔧 Comandos de Mantenimiento

### Verificación del Sistema
```bash
# Verificar estado del sitio
curl -I https://javiidiazglez.github.io/Proyecto_3_Scrapper/

# Probar webhook
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"custom_webhook": "Test Company"}' \
  https://hook.eu2.make.com/qjdyqwdoir5xcgk3l5844nkohpa0fhun

# Validar HTML
npx html-validate index.html
```

### Actualización de Dependencias
```bash
# Actualizar gems
bundle update

# Verificar versiones
bundle list
```

## 📚 Enlaces de Configuración

- 🏠 **[Página Principal](../)**
- 🧪 **[Documentación de Testing](../tests/README.md)**
- 📖 **[Setup del Proyecto](../SETUP.md)**
- 📊 **[Cobertura Visual](../coverage-visual.svg)**

---

## 🔒 Configuración de Seguridad

### Headers de Seguridad (GitHub Pages)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### Validaciones Implementadas
- ✅ Sanitización de inputs
- ✅ Validación de formularios
- ✅ Manejo seguro de errores
- ✅ HTTPS obligatorio

---

**📝 Nota**: Esta configuración está optimizada para GitHub Pages y Make.com webhooks. Cualquier cambio debe probarse en el entorno de desarrollo antes del despliegue.
