#!/bin/bash

# Script para ejecutar todas las pruebas
echo "🧪 Ejecutando suite completa de pruebas..."
echo "======================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    case $2 in
        "success") echo -e "${GREEN}✅ $1${NC}" ;;
        "error") echo -e "${RED}❌ $1${NC}" ;;
        "warning") echo -e "${YELLOW}⚠️  $1${NC}" ;;
        "info") echo -e "${BLUE}ℹ️  $1${NC}" ;;
        *) echo "$1" ;;
    esac
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_status "Node.js no está instalado. Por favor instala Node.js y npm." "error"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_status "npm no está instalado. Por favor instala npm." "error"
    exit 1
fi

print_status "Verificando dependencias..." "info"

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependencias..." "info"
    npm install
    if [ $? -ne 0 ]; then
        print_status "Error al instalar dependencias" "error"
        exit 1
    fi
fi

# Crear directorio de reportes si no existe
mkdir -p reports

print_status "Iniciando pruebas..." "info"

# Contador de pruebas
passed=0
failed=0

# 1. Validación HTML
print_status "Ejecutando validación HTML..." "info"
node tests/html-validator.js > reports/html-validation.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Validación HTML: PASADA" "success"
    ((passed++))
else
    print_status "Validación HTML: FALLIDA" "error"
    ((failed++))
    echo "Ver reports/html-validation.log para detalles"
fi

# 2. Validación CSS
print_status "Ejecutando validación CSS..." "info"
node tests/css-validator.js > reports/css-validation.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Validación CSS: PASADA" "success"
    ((passed++))
else
    print_status "Validación CSS: FALLIDA" "error"
    ((failed++))
    echo "Ver reports/css-validation.log para detalles"
fi

# 3. Pruebas Jest
print_status "Ejecutando pruebas Jest..." "info"
npm test > reports/jest-tests.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Pruebas Jest: PASADAS" "success"
    ((passed++))
else
    print_status "Pruebas Jest: FALLIDAS" "error"
    ((failed++))
    echo "Ver reports/jest-tests.log para detalles"
fi

# 4. Pruebas de accesibilidad
print_status "Ejecutando pruebas de accesibilidad..." "info"
timeout 60 node tests/accessibility-test.js > reports/accessibility-tests.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Pruebas de accesibilidad: PASADAS" "success"
    ((passed++))
else
    print_status "Pruebas de accesibilidad: FALLIDAS" "error"
    ((failed++))
    echo "Ver reports/accessibility-tests.log para detalles"
fi

# 5. Pruebas de rendimiento
print_status "Ejecutando pruebas de rendimiento..." "info"
timeout 60 node tests/performance-test.js > reports/performance-tests.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Pruebas de rendimiento: PASADAS" "success"
    ((passed++))
else
    print_status "Pruebas de rendimiento: FALLIDAS" "error"
    ((failed++))
    echo "Ver reports/performance-tests.log para detalles"
fi

# 6. Generar reporte de cobertura
print_status "Generando reporte de cobertura..." "info"
npm run test:coverage > reports/coverage.log 2>&1
if [ $? -eq 0 ]; then
    print_status "Reporte de cobertura: GENERADO" "success"
    print_status "Ver coverage/index.html para detalles" "info"
else
    print_status "Reporte de cobertura: ERROR" "warning"
fi

# Resumen final
echo ""
echo "======================================"
print_status "RESUMEN DE PRUEBAS" "info"
echo "======================================"
print_status "Pruebas pasadas: $passed" "success"
print_status "Pruebas fallidas: $failed" "error"
print_status "Total de pruebas: $((passed + failed))" "info"

if [ $failed -eq 0 ]; then
    print_status "🎉 ¡Todas las pruebas pasaron!" "success"
    exit 0
else
    print_status "❌ $failed prueba(s) fallaron" "error"
    print_status "Revisa los archivos de log en el directorio reports/" "warning"
    exit 1
fi
