// Configuración del proyecto - Variables de entorno
// ================================================

// IMPORTANTE: Este archivo debe ser actualizado manualmente
// Las variables sensibles están protegidas en .env (server-side)

const CONFIG = {
    // Webhook URL (configuración ofuscada para cliente)
    WEBHOOK_URL: ['https://hook.eu2.make.com/', '1qcydci1g8342nh74ibrfvkzzvvoeg81'].join(''),
    
    // Configuración del proyecto
    PROJECT_NAME: 'Generador Análisis Empresarial',
    PROJECT_VERSION: '1.0.0',
    ENVIRONMENT: 'production',
    
    // URLs del proyecto
    GITHUB_PAGES_URL: 'https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/',
    
    // Configuración de la aplicación
    API_TIMEOUT: 30000, // 30 segundos
    RETRY_ATTEMPTS: 3,
    
    // Configuración de UI
    LOADING_DELAY: 300,
    SUCCESS_MESSAGE_DURATION: 5000,
    ERROR_MESSAGE_DURATION: 8000
};

// Exportar configuración para uso en la aplicación
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Para uso en el navegador
window.CONFIG = CONFIG;
