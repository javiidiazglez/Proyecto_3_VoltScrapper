@echo off
echo 🚀 Iniciando despliegue en GitHub Pages...

REM Verificar si estamos en un repositorio git
if not exist ".git" (
    echo ❌ Error: No se encontró un repositorio git
    echo Ejecuta: git init
    pause
    exit /b 1
)

REM Agregar todos los archivos
echo 📁 Agregando archivos al repositorio...
git add .

REM Commit
echo 💾 Creando commit...
set /p commit_message="Ingresa el mensaje del commit: "
if "%commit_message%"=="" set commit_message=Despliegue automático
git commit -m "%commit_message%"

REM Push
echo 🔄 Enviando cambios a GitHub...
git push origin main

echo ✅ Despliegue completado!
echo 🌐 Tu sitio estará disponible en: https://kephril.github.io/Proyecto_3_Scrapper/
echo ⏳ Puede tardar unos minutos en actualizarse
pause
