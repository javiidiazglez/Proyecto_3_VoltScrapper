# Generador Análisis Empresarial

Una herramienta web para generar reportes de inteligencia de negocio e investigación corporativa en tiempo real.

## 🌐 Sitio Web

**URL del sitio**: https://kephril.github.io/Proyecto_3_Scrapper/

## 📊 Estado de Cobertura

[![Cobertura](https://img.shields.io/badge/Cobertura-76.8%25-brightgreen)](./coverage/index.html)

- **HTML**: 55.0% (11/20 elementos)
- **CSS**: 94.4% (17/18 características)
- **JavaScript**: 77.8% (14/18 funcionalidades)
- **Features**: 80.0% (12/15 características)

📄 [Reporte completo de cobertura](./coverage/index.html)

## 🚀 Características

- **Interfaz moderna**: Diseño limpio y profesional con efectos visuales
- **Análisis en tiempo real**: Generación de reportes empresariales instantáneos
- **Responsive**: Adaptable a todos los dispositivos
- **Efectos visuales**: Animación Matrix de fondo
- **Integración API**: Conectado con webhook para procesamiento de datos

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (ES6+)
- Jekyll (GitHub Pages)
- Canvas API para animaciones

## 🧪 Testing y Calidad

Este proyecto incluye una suite completa de pruebas para garantizar la calidad del código:

### Pruebas Automatizadas
- **Pruebas unitarias**: Jest para funcionalidades JavaScript
- **Validación HTML**: Validación de estructura y semántica
- **Validación CSS**: Verificación de sintaxis y mejores prácticas
- **Pruebas de accesibilidad**: Verificación de estándares WCAG
- **Pruebas de rendimiento**: Análisis de velocidad y optimización
- **Pruebas de integración**: Testing end-to-end con Puppeteer

### Ejecutar las pruebas
```bash
# Ejecutar todas las pruebas
./run-tests.sh

# Windows
./run-tests.bat

# Generar reporte de cobertura
node tests/coverage-report.js
```

### Resultados de las pruebas
- ✅ **Validación HTML**: Estructura válida y semántica
- ✅ **Validación CSS**: Sintaxis correcta y optimizada
- ✅ **Pruebas unitarias**: Todas las funciones críticas cubiertas
- ✅ **Accesibilidad**: Cumple estándares WCAG básicos
- ✅ **Rendimiento**: Tiempo de carga optimizado
- ✅ **Integración**: Funcionalidad completa verificada

## 📱 Uso

1. Visita la página web
2. Introduce el nombre de la empresa a analizar
3. Haz clic en "Generar Análisis"
4. Espera a que se procese la información
5. Revisa el reporte generado en el iframe

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

## 📄 Estructura del proyecto

```
Proyecto_3_Scrapper/
├── index.html          # Página principal
├── _config.yml         # Configuración Jekyll
├── Gemfile            # Dependencias Ruby
├── README.md          # Documentación
└── .github/
    └── workflows/
        └── pages.yml   # CI/CD GitHub Actions
```

## 🔧 Configuración

El archivo `_config.yml` contiene toda la configuración necesaria para Jekyll y GitHub Pages.

## 👥 Contribuidores

Proyecto 3 - Grupo 2. TanDEM

## 📝 Licencia

© 2025. Todos los derechos reservados.

---

**Nota**: Este proyecto utiliza un webhook externo para el procesamiento de datos empresariales.
