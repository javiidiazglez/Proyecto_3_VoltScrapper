#!/bin/bash

# Script para desplegar en GitHub Pages
echo "🚀 Iniciando despliegue en GitHub Pages..."

# Verificar si estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "❌ Error: No se encontró un repositorio git"
    echo "Ejecuta: git init"
    exit 1
fi

# Agregar todos los archivos
echo "📁 Agregando archivos al repositorio..."
git add .

# Commit
echo "💾 Creando commit..."
read -p "Ingresa el mensaje del commit: " commit_message
git commit -m "${commit_message:-"Despliegue automático"}"

# Push
echo "🔄 Enviando cambios a GitHub..."
git push origin main

echo "✅ Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/"
echo "⏳ Puede tardar unos minutos en actualizarse"
