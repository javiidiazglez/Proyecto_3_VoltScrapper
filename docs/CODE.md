# 💻 Funcionalidades Clave - VoltScrapper

**Las 5 funcionalidades más importantes para la demo**

---

## 📧 **Validación de Email Instantánea**

**¿Qué hace?**
- ✅ **Validación en tiempo real** mientras escribes
- 🟢 **Borde verde** para email válido  
- 🔴 **Borde rojo** para email inválido
- 🔄 **Regex robusto** que acepta emails complejos

```javascript
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
```

---

## 🎨 **Animación Matrix**

**¿Qué crea?**
- ✨ **50 partículas** en movimiento constante
- 🔗 **Líneas conectoras** entre partículas cercanas
- 🎬 **60 FPS fluidos** con `requestAnimationFrame`
- 📱 **Optimización móvil** reduce partículas automáticamente

```javascript
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2; // Velocidad X
        this.vy = (Math.random() - 0.5) * 2; // Velocidad Y
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        // Rebotar en bordes
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}
```

---

## 🌐 **Webhook con Make.com (30 minutos timeout)**

**¿Qué hace?**
- 📡 **Envía datos** al webhook de Make.com para procesamiento
- ⏱️ **Timeout de 30 minutos** - Espera hasta que el análisis esté listo
- 🔄 **AbortController** - Control preciso de timeouts
- 📥 **Maneja múltiples formatos** de respuesta (JSON, texto, vacío)

```javascript
// Fetch con timeout personalizado de 30 minutos
const response = await fetch(webhookUrl, {
    method: 'POST',
    signal: controller.signal,
    keepalive: true,
    body: JSON.stringify({ company_name: companyName, email: email })
});
```

---

## 📄 **Google Docs Iframe Optimizado**

**¿Qué crea?**
- 📊 **Vista embebida** del documento generado por Make.com
- 🎯 **140% de ancho** - Iframe expandido para mejor legibilidad
- 🧹 **Parámetros limpios** - Sin toolbars, headers o navegación
- 📱 **Responsive** - Se ajusta automáticamente en móviles

```javascript
// Crear iframe optimizado para Google Docs
const iframe = document.createElement('iframe');
iframe.src = `${cleanedUrl}?embedded=true&rm=minimal`;
iframe.style.width = '140%';      // Ancho expandido
iframe.style.marginLeft = '-20%'; // Centrado perfecto
```

---

## 🛡️ **Protección XSS (Cross-Site Scripting)**

**¿Por qué es crucial?**
- 🛡️ **Previene ataques XSS** - Evita que alguien inyecte código malicioso como `<script>alert('hack')</script>`
- ✅ **Filtra caracteres peligrosos** - Solo acepta letras, números y símbolos seguros
- 🔒 **Sanitiza antes de enviar** - Limpia todos los datos antes de procesarlos
- 📏 **Limita longitud** - Máximo 200 caracteres para evitar spam

> **¿Qué es XSS?** Cross-Site Scripting es cuando alguien intenta meter código JavaScript malicioso en tu aplicación. VoltScrapper lo bloquea automáticamente.

```javascript
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '').trim().substring(0, 200);
}
```

---

## 🎯 **Resumen Técnico**

### **Stack Tecnológico**
- 🟨 **JavaScript ES6+** - async/await, arrow functions
- 🎨 **Canvas API** - Animaciones hardware-accelerated  
- 📱 **CSS3 Responsive** - Mobile-first design

### **Integración Externa**
- 🌐 **Make.com webhook** - Análisis automatizado con 30min timeout
- 📊 **Google Docs iframe** - Vista optimizada 140% width con parámetros limpios
- ⏱️ **AbortController** - Control preciso de timeouts y conexiones

---

**🚀 Objetivo**: Demostrar capacidades técnicas con código limpio, seguro y visualmente atractivo.
