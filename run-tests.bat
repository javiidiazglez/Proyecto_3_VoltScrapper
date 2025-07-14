@echo off
setlocal enabledelayedexpansion

REM Script para ejecutar todas las pruebas en Windows
echo 🧪 Ejecutando suite completa de pruebas...
echo ======================================

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js y npm.
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor instala npm.
    pause
    exit /b 1
)

echo ℹ️  Verificando dependencias...

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo ℹ️  Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Error al instalar dependencias
        pause
        exit /b 1
    )
)

REM Crear directorio de reportes si no existe
if not exist "reports" mkdir reports

echo ℹ️  Iniciando pruebas...

REM Contador de pruebas
set /a passed=0
set /a failed=0

REM 1. Validación HTML
echo ℹ️  Ejecutando validación HTML...
node tests/html-validator.js > reports/html-validation.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Validación HTML: PASADA
    set /a passed+=1
) else (
    echo ❌ Validación HTML: FALLIDA
    set /a failed+=1
    echo Ver reports/html-validation.log para detalles
)

REM 2. Validación CSS
echo ℹ️  Ejecutando validación CSS...
node tests/css-validator.js > reports/css-validation.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Validación CSS: PASADA
    set /a passed+=1
) else (
    echo ❌ Validación CSS: FALLIDA
    set /a failed+=1
    echo Ver reports/css-validation.log para detalles
)

REM 3. Pruebas Jest
echo ℹ️  Ejecutando pruebas Jest...
npm test > reports/jest-tests.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Pruebas Jest: PASADAS
    set /a passed+=1
) else (
    echo ❌ Pruebas Jest: FALLIDAS
    set /a failed+=1
    echo Ver reports/jest-tests.log para detalles
)

REM 4. Pruebas de accesibilidad
echo ℹ️  Ejecutando pruebas de accesibilidad...
timeout /t 60 /nobreak > nul
node tests/accessibility-test.js > reports/accessibility-tests.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Pruebas de accesibilidad: PASADAS
    set /a passed+=1
) else (
    echo ❌ Pruebas de accesibilidad: FALLIDAS
    set /a failed+=1
    echo Ver reports/accessibility-tests.log para detalles
)

REM 5. Pruebas de rendimiento
echo ℹ️  Ejecutando pruebas de rendimiento...
timeout /t 60 /nobreak > nul
node tests/performance-test.js > reports/performance-tests.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Pruebas de rendimiento: PASADAS
    set /a passed+=1
) else (
    echo ❌ Pruebas de rendimiento: FALLIDAS
    set /a failed+=1
    echo Ver reports/performance-tests.log para detalles
)

REM 6. Generar reporte de cobertura
echo ℹ️  Generando reporte de cobertura...
npm run test:coverage > reports/coverage.log 2>&1
if %errorlevel% equ 0 (
    echo ✅ Reporte de cobertura: GENERADO
    echo ℹ️  Ver coverage/index.html para detalles
) else (
    echo ⚠️  Reporte de cobertura: ERROR
)

REM Resumen final
echo.
echo ======================================
echo ℹ️  RESUMEN DE PRUEBAS
echo ======================================
echo ✅ Pruebas pasadas: !passed!
echo ❌ Pruebas fallidas: !failed!
set /a total=!passed!+!failed!
echo ℹ️  Total de pruebas: !total!

if !failed! equ 0 (
    echo 🎉 ¡Todas las pruebas pasaron!
    pause
    exit /b 0
) else (
    echo ❌ !failed! prueba(s) fallaron
    echo ⚠️  Revisa los archivos de log en el directorio reports/
    pause
    exit /b 1
)
