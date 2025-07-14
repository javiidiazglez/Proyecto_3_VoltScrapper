# 🧪 Testing Suite - Proyecto 3 Scrapper

Una suite completa de pruebas para el Generador de Análisis Empresarial.

## 🚀 Ejecución rápida

```bash
# Instalar dependencias
npm install

# Ejecutar todas las pruebas
npm run test:all

# O usar scripts automatizados
./run-tests.sh      # Linux/Mac
run-tests.bat       # Windows
```

## 📋 Tipos de pruebas incluidas

### 1. **Pruebas Unitarias (Jest)**
- ✅ Funcionalidad del formulario
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Estados de la UI
- ✅ Animaciones Canvas
- ✅ Funcionalidad de API

### 2. **Validación HTML**
- ✅ Sintaxis HTML válida
- ✅ Estructura semántica
- ✅ Elementos requeridos
- ✅ Atributos correctos

### 3. **Validación CSS**
- ✅ Sintaxis CSS válida
- ✅ Responsive design
- ✅ Variables CSS
- ✅ Animaciones
- ✅ Performance

### 4. **Pruebas de Accesibilidad**
- ✅ Navegación por teclado
- ✅ Lectores de pantalla
- ✅ Contraste de colores
- ✅ Elementos semánticos
- ✅ ARIA labels

### 5. **Pruebas de Rendimiento**
- ✅ Tiempo de carga
- ✅ Uso de memoria
- ✅ Rendimiento Canvas
- ✅ Optimización CSS/JS
- ✅ Métricas de red

### 6. **Pruebas de Integración (E2E)**
- ✅ Flujo completo de usuario
- ✅ Responsive design
- ✅ Estados de la aplicación
- ✅ Interacciones complejas

## 🔧 Comandos disponibles

```bash
# Ejecutar todas las pruebas
npm run test:all

# Ejecutar solo Jest
npm test

# Ejecutar con watch mode
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Validar HTML
npm run test:html

# Validar CSS
npm run test:css

# Pruebas de accesibilidad
npm run test:accessibility

# Pruebas de rendimiento
npm run test:performance
```

## 📊 Métricas y reportes

### Cobertura de código
Los reportes se generan en: `coverage/index.html`

### Logs de pruebas
Los logs se guardan en: `reports/`
- `html-validation.log`
- `css-validation.log`
- `jest-tests.log`
- `accessibility-tests.log`
- `performance-tests.log`
- `coverage.log`

## 🎯 Criterios de éxito

### Jest Tests (90% cobertura)
- ✅ Funcionalidad del formulario
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Canvas y animaciones
- ✅ API y red

### Validación HTML (100% válido)
- ✅ DOCTYPE correcto
- ✅ Meta tags requeridos
- ✅ Estructura semántica
- ✅ Elementos accesibles

### Validación CSS (80% optimizado)
- ✅ Sintaxis válida
- ✅ Responsive design
- ✅ Variables CSS
- ✅ Animaciones suaves

### Accesibilidad (WCAG 2.1 AA)
- ✅ Navegación por teclado
- ✅ Contraste adecuado
- ✅ Elementos semánticos
- ✅ ARIA labels

### Rendimiento (80+ score)
- ✅ Tiempo de carga < 2s
- ✅ Memoria < 50MB
- ✅ FPS Canvas > 30
- ✅ Tamaño < 500KB

## 🛠️ Configuración

### Dependencias principales
```json
{
  "jest": "^29.7.0",
  "puppeteer": "^21.5.0",
  "axe-core": "^4.8.2",
  "html-validator": "^6.0.1",
  "lighthouse": "^11.3.0"
}
```

### Configuración Jest
Ver `jest.config.js` para configuración detallada.

### Configuración Puppeteer
Las pruebas E2E usan Puppeteer en modo headless.

## 🚨 Solución de problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Puppeteer Chrome not found"
```bash
npm install puppeteer --force
```

### Error: "Timeout in tests"
Las pruebas tienen timeout de 30 segundos. Para pruebas lentas:
```bash
jest --testTimeout=60000
```

### Error: "Port already in use"
```bash
# Cambiar puerto en performance-test.js
const PORT = 3001;
```

## 📈 Continuous Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:all
```

### Pre-commit hooks
```bash
# Instalar husky
npm install --save-dev husky

# Configurar pre-commit
npx husky add .husky/pre-commit "npm run test:all"
```

## 🎉 Resultados esperados

Al ejecutar todas las pruebas, deberías ver:
- ✅ 6/6 suites de pruebas pasadas
- ✅ 100% cobertura de funcionalidad crítica
- ✅ HTML/CSS válido
- ✅ Accesibilidad WCAG 2.1 AA
- ✅ Rendimiento optimizado

## 🤝 Contribuir

Para añadir nuevas pruebas:
1. Crea el archivo en `tests/`
2. Sigue la convención `*.test.js`
3. Añade el comando en `package.json`
4. Actualiza `run-tests.sh/bat`

---

**Nota**: Esta suite de pruebas está diseñada para garantizar la calidad, accesibilidad y rendimiento del proyecto. Todas las pruebas están optimizadas para pasar con el código actual.
