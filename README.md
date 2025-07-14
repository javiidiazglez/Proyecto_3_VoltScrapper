# 📊 Generador Análisis Empresarial
## **Proyecto 3 - TanDEM Grupo 2** 🎯

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)]## 👥 Equipo

**TanDEM - Grupo 2**

- José Javier Díaz González
- Laura del Carmen Ilarraza Prendes  
- Andrea San Román Río
- Noemi Martin Garcia
- Elvis Ebudo Nwaigweiaz.github.io/Proyecto_3_Scrapper/) [![Jekyll](https://img.shields.io/badge/Jekyll-Ready-red)](https://jekyllrb.com/) [![TanDEM](https://img.shields.io/badge/TanDEM-Grupo%202-blue)](#) [![Tests](https://img.shields.io/badge/Tests-31%2F31-brightgreen)](./tests/test-unico.js) [![Coverage](https://img.shields.io/badge/Coverage-91.1%25-brightgreen)](./coverage/index.html)

</div>

Una herramienta web moderna para generar reportes de inteligencia de negocio e investigación corporativa en tiempo real con animaciones visuales avanzadas. Desarrollado por el **Grupo 2 del TanDEM**.

## 🌐 Sitio Web

**🔗 URL del sitio**: [https://javiidiaz.github.io/Proyecto_3_Scrapper/](https://javiidiaz.github.io/Proyecto_3_Scrapper/)

> 💡 **Acceso directo**: El sitio está desplegado automáticamente en GitHub Pages con Jekyll

## 📊 Estado de Cobertura

<div align="center">

![Coverage Visualization](./coverage-visual.svg)

[![HTML](https://img.shields.io/badge/HTML-100%25-brightgreen)](#) [![CSS](https://img.shields.io/badge/CSS-100%25-brightgreen)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-77.8%25-yellow)](#) [![Features](https://img.shields.io/badge/Features-86.7%25-green)](#)

</div>

### 🎯 Resultados del Testing
- **✅ Pruebas pasadas**: 31/31 (100% éxito)
- **🏆 Cobertura total**: 91.1% (¡Excelente!)
- **⚡ Rendimiento**: 19.51 KB optimizado
- **🎨 Calidad**: HTML y CSS al 100%

### 📈 Cobertura Detallada
```
🎯 RESUMEN DE COBERTURA FINAL:
==================================
HTML: ████████████████████ 100.0% (20/20) ✨
CSS:  ████████████████████ 100.0% (18/18) ✨
JS:   ████████████████░░░░  77.8% (14/18) 
FEAT: ████████████████░░░░  86.7% (13/15) 
==================================
TOTAL: ██████████████████░░  91.1% 🏆 EXCELENTE
```

📄 **[Ver test unificado](./tests/test-unico.js)** | 📊 **[Reporte interactivo](./coverage/index.html)**

## 🚀 Características Principales

- **🎨 Interfaz moderna**: Diseño limpio y profesional con efectos visuales Matrix
- **⚡ Análisis en tiempo real**: Generación de reportes empresariales instantáneos
- **📱 Responsive**: Adaptable a todos los dispositivos (móvil, tablet, desktop)
- **✨ Efectos visuales**: Animación Matrix de fondo con Canvas API
- **🔗 Integración API**: Conectado con webhook para procesamiento de datos
- **♿ Accesibilidad**: Cumple estándares WCAG con navegación por teclado
- **🎯 Testing completo**: 31 pruebas automatizadas con 91.1% de cobertura

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica moderna
- **CSS3** - Variables CSS, Flexbox, Grid, Animaciones
- **JavaScript ES6+** - Funcionalidades interactivas avanzadas
- **Canvas API** - Animaciones de fondo dinámicas

### Despliegue & CI/CD
- **Jekyll** - Generador de sitios estáticos
- **GitHub Pages** - Hosting automático
- **GitHub Actions** - Integración continua

### Testing & Calidad
- **Test Suite Unificado** - 31 pruebas en un solo archivo
- **Coverage Report** - Análisis detallado de cobertura
- **Validación HTML/CSS** - Estándares web modernos
- **Testing de Accesibilidad** - Estándares WCAG

## 🧪 Testing y Calidad

Este proyecto incluye un sistema de testing unificado y completo:

### Test Único Completo
- **31 pruebas automatizadas** en un solo archivo
- **Validación HTML**: Estructura y semántica
- **Validación CSS**: Sintaxis y mejores prácticas
- **Validación JavaScript**: Funcionalidades y rendimiento
- **Pruebas de accesibilidad**: Estándares básicos
- **Pruebas de rendimiento**: Optimización de tamaño

> 📚 **Para más documentación sobre el testing**: [Ver documentación completa de testing](./tests/README.md)

### Ejecutar las pruebas
```bash
# Ejecutar TODAS las pruebas y generar reportes
./run-all-tests.sh      # Linux/Mac
./run-all-tests.bat     # Windows

# Ejecutar solo las pruebas principales
node tests/test-unico.js

# Generar solo el reporte de cobertura
node tests/coverage-report.js
```

### Resultados de las pruebas
- ✅ **31/31 pruebas pasadas** (100% éxito)
- ✅ **HTML**: Estructura válida y semántica
- ✅ **CSS**: Sintaxis correcta y optimizada (100%)
- ✅ **JavaScript**: Funcionalidades completas
- ✅ **Accesibilidad**: Estándares básicos cumplidos
- ✅ **Rendimiento**: Tamaño optimizado (19.51 KB)
- ✅ **Cobertura**: 91.1% promedio

📚 **[Ver documentación completa de testing](./tests/README.md)**

## 📱 Guía de Uso

### 🎯 Proceso de Análisis Empresarial

1. **🌐 Accede al sitio**: [javiidiaz.github.io/Proyecto_3_Scrapper](https://javiidiaz.github.io/Proyecto_3_Scrapper/)
2. **📝 Introduce el nombre**: Escribe el nombre de la empresa a analizar
3. **🚀 Genera el análisis**: Haz clic en "Generar Análisis" 
4. **⏳ Espera el procesamiento**: El sistema procesará la información en tiempo real
5. **📊 Revisa el reporte**: Analiza los resultados en el iframe integrado

### ✨ Características de la Interfaz
- **Animación de fondo**: Efecto Matrix dinámico
- **Formulario intuitivo**: Validación en tiempo real
- **Feedback visual**: Estados de carga y errores
- **Responsive design**: Funciona en cualquier dispositivo

## 🌐 Despliegue

Este proyecto está configurado para funcionar con GitHub Pages usando Jekyll.

### Configuración local

```bash
# Instalar dependencias
bundle install

# Ejecutar servidor local
bundle exec jekyll serve
```

### Configuración GitHub Pages

1. Ve a Settings > Pages en tu repositorio
2. Selecciona "Deploy from a branch"
3. Elige la rama `main` o `gh-pages`
4. Guarda la configuración

## 📄 Arquitectura del Proyecto

```
📁 Proyecto_3_Scrapper/
├── 🌐 index.html              # Página principal con funcionalidad completa
├── 🧪 tests/                  # Suite de testing unificada
│   ├── test-unico.js          # 31 pruebas automatizadas (100% éxito)
│   ├── coverage-report.js     # Generador de reportes (91.1%)
│   └── README.md              # Documentación de testing
├── 📊 coverage/               # Reportes de cobertura
│   └── index.html             # Dashboard interactivo de métricas
├── 🚀 run-all-tests.sh        # Script completo Linux/Mac
├── 🚀 run-all-tests.bat       # Script completo Windows
├── ⚙️ _config.yml             # Configuración Jekyll optimizada
├── 💎 Gemfile                 # Dependencias Ruby para GitHub Pages
├── 📋 README.md               # Documentación principal
├── 🔧 deploy.sh/.bat          # Scripts de despliegue
├── 👀 view-coverage.sh/.bat   # Visualizadores de coverage
└── 🔄 .github/workflows/      # CI/CD automatizado
    └── pages.yml              # Despliegue automático a GitHub Pages
```

### 🏗️ Características de la Arquitectura
- **📁 Estructura modular**: Organización clara y mantenible
- **🧪 Testing centralizado**: Todo en `tests/test-unico.js`
- **📊 Reportes automáticos**: Coverage y métricas en tiempo real
- **🚀 Scripts automatizados**: Ejecución simple con un comando

## 🔧 Configuración

El archivo `_config.yml` contiene toda la configuración necesaria para Jekyll y GitHub Pages.

## 👥 Equipo de Desarrollo

<div align="center">

### 🎯 **Proyecto 3 - TanDEM Grupo 2**

**‍💻 José Javier Díaz González**  
**�‍�💻 Laura del Carmen Ilarraza Prendes**  
**👩‍💻 Andrea San Román Río**  
**👩‍💻 Noemi Martin Garcia**  
**👨‍💻 Elvis Ebudo Nwaigwe**

> **💡 Filosofía del equipo**: "Código limpio, testing completo, documentación clara"

</div>

## 📊 Estadísticas del Proyecto

<div align="center">

### 🏆 **Métricas de Rendimiento**

| 📊 **Métrica** | 📈 **Valor** | 🎯 **Estado** |
|----------------|--------------|---------------|
| **💾 Líneas de código** | ~500 líneas | 📊 Optimizado |
| **⚡ Tamaño total** | 19.51 KB | 🚀 Ultraligero |
| **🧪 Pruebas** | 31/31 | ✅ 100% éxito |
| **📊 Cobertura** | 91.1% | 🏆 Excelente |
| **🎨 HTML Coverage** | 100% | ✨ Perfecto |
| **💎 CSS Coverage** | 100% | ✨ Perfecto |
| **⏱️ Tiempo de carga** | < 2 segundos | 🚀 Rápido |
| **🌐 Compatibilidad** | Todos los navegadores | 🔄 Universal |

### 📈 **Progreso del Proyecto**
```
🎯 DESARROLLO COMPLETO:
==========================
✅ Análisis y diseño    [████████████████████] 100%
✅ Frontend desarrollo  [████████████████████] 100%
✅ Backend integración  [████████████████████] 100%
✅ Testing y QA         [████████████████████] 100%
✅ Documentación        [████████████████████] 100%
✅ Despliegue          [████████████████████] 100%
==========================
🏆 PROYECTO TERMINADO: 100% COMPLETO
```

</div>

## 📝 Licencia y Créditos

<div align="center">

### 🏆 **© 2025 TanDEM - Grupo 2**
#### **Todos los derechos reservados**

---

### 🎯 **Reconocimientos y Logros**
- **🏅 Desarrollo**: Equipo TanDEM Grupo 2 completo
- **🧪 Testing**: Suite automatizada de 31 pruebas (100% éxito)
- **🚀 Despliegue**: GitHub Pages + Jekyll (automático)
- **🏆 Calidad**: 91.1% de cobertura de código
- **⚡ Performance**: 19.51 KB optimizado

---

**⭐ Si te gusta este proyecto, ¡dale una estrella! ⭐**

[![GitHub](https://img.shields.io/badge/GitHub-Proyecto_3_Scrapper-181717?logo=github)](https://github.com/javiidiaz/Proyecto_3_Scrapper)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Ver_Sitio-brightgreen)](https://javiidiaz.github.io/Proyecto_3_Scrapper/)
[![TanDEM](https://img.shields.io/badge/TanDEM-Grupo%202-blue)](#)

**Desarrollado con ❤️ por el equipo TanDEM Grupo 2**

</div>

---

**📌 Nota importante**: Este proyecto utiliza un webhook externo para el procesamiento de datos empresariales y está completamente optimizado para producción con testing exhaustivo y documentación completa.
