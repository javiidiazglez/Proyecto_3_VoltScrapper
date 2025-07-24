// Configuración del proyecto - Variables de entorno
// ================================================

// IMPORTANTE: Este archivo debe ser actualizado manualmente

const CONFIG = {
    // Webhook URL (configuración ofuscada para cliente)
    WEBHOOK_URL: ['https://hook.eu2.make.com/', 'qjdyqwdoir5xcgk3l5844nkohpa0fhun'].join(''),
    
    PROJECT_NAME: "Generador Análisis Empresarial",
    PROJECT_VERSION: "1.0.0",
    ENVIRONMENT: "production",
    GITHUB_PAGES_URL: "https://javiidiazglez.github.io/Proyecto_3_VoltScrapper/",
    API_TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
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
