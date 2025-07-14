#!/bin/bash
echo "📊 Abriendo reporte de cobertura..."
if command -v xdg-open > /dev/null; then
    xdg-open coverage/index.html
elif command -v open > /dev/null; then
    open coverage/index.html
else
    echo "❌ No se pudo abrir automáticamente. Abre manualmente: coverage/index.html"
fi
echo "✅ Reporte disponible en: coverage/index.html"
