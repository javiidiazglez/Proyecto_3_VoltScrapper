# Generador Análisis Empresarial

Una herramienta web para generar reportes de inteligencia de negocio e investigación corporativa en tiempo real.

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
