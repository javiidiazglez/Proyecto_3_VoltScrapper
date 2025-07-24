@echo off
echo 🧪 Ejecutando Suite Completa de Pruebas y Cobertura
echo ==================================================

echo.
echo 🔍 1. Ejecutando pruebas principales...
node tests/test-unico.js

echo.
echo 📊 2. Generando reporte de cobertura...
node tests/coverage-report.js

echo.
echo ✅ Proceso completo terminado!
echo 📄 Pruebas: tests/test-unico.js
echo 📊 Cobertura: coverage/index.html
echo ==================================================
pause
