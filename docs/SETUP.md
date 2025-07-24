# 🚀 Configuración de GitHub Pages

## Pasos para configurar GitHub Pages:

### 1. Subir el proyecto a GitHub
```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Configuración inicial para GitHub Pages"

# Agregar remote origin
git remote add origin https://github.com/javiidiazglez/Proyecto_3_VoltScrapper.git

# Subir a GitHub
git push -u origin main
```

### 2. Configurar GitHub Pages en el repositorio

1. Ve a tu repositorio en GitHub
2. Clic en **Settings** (Configuración)
3. Scroll down hasta la sección **Pages**
4. En **Source** selecciona **Deploy from a branch**
5. Selecciona la rama **main**
6. Selecciona **/ (root)** como carpeta
7. Clic en **Save**

### 3. Configurar el dominio (opcional)

Si quieres usar un dominio personalizado:
1. En la sección Pages, agrega tu dominio personalizado
2. Habilita **Enforce HTTPS**

### 4. Configurar Actions (automático)

El archivo `.github/workflows/pages.yml` ya está configurado para:
- Detectar cambios en la rama `main`
- Compilar Jekyll automáticamente
- Desplegar en GitHub Pages

### 5. URLs de acceso

Una vez configurado, tu sitio estará disponible en:
- **URL principal**: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/
- **Configuración**: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/config/

### 6. Actualizar el sitio

Para actualizar el sitio, simplemente:
```bash
# Usar el script automático
./deploy.sh   # Linux/Mac
deploy.bat    # Windows

# O manualmente:
git add .
git commit -m "Actualización del sitio"
git push origin main
```

### 7. Verificar el estado

- Las GitHub Actions se ejecutan automáticamente
- Puedes ver el progreso en la pestaña **Actions** de tu repositorio
- El despliegue tarda entre 1-5 minutos

### 8. Solución de problemas

Si el sitio no carga:
1. Verifica que GitHub Pages esté habilitado
2. Revisa los logs en **Actions**
3. Asegúrate de que el archivo `_config.yml` esté correcto
4. Verifica que no haya errores en Jekyll

## 📁 Estructura de archivos para GitHub Pages

```
Proyecto_3_VoltScrapper/
├── index.html              # Página principal
├── _config.yml             # Configuración Jekyll
├── Gemfile                 # Dependencias Ruby
├── README.md               # Documentación
├── config.md               # Página de configuración
├── .gitignore              # Archivos ignorados
├── deploy.sh/.bat          # Scripts de despliegue
├── _layouts/
│   └── default.html        # Layout por defecto
└── .github/
    └── workflows/
        └── pages.yml       # GitHub Actions
```

## ✅ Verificación final

1. ✅ Archivos Jekyll configurados
2. ✅ GitHub Actions configurado
3. ✅ Layout y estructura creados
4. ✅ Scripts de despliegue listos
5. ✅ Documentación completada
6. ✅ Campo de email con validación implementado
7. ✅ Iframe optimizado para Google Docs
8. ✅ Validación en tiempo real activa

## 🆕 Características Actuales

### 📧 Validación de Email
- **Regex de validación**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- **Feedback visual**: Bordes rojos/verdes según validación
- **Validación en tiempo real**: Solo después de interacción del usuario

### 📊 Iframe Optimizado
- **Tamaño**: 140% de ancho, 1100px de altura
- **Centrado**: Transform translateX(-50%) para perfecto centrado
- **Google Docs**: Parámetros especiales para vista limpia
- **Responsive**: Ajustes automáticos en móviles

### 🔄 Procesamiento Mejorado
- **Spinner animado**: Al lado del botón durante el proceso
- **Estados múltiples**: Success, Warning, Error con colores distintivos
- **Datos enviados**: Empresa + Email al webhook

¡Tu sitio está listo para GitHub Pages! 🎉
