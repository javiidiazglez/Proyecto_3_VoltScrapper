---
layout: default
title: "Configuración"
description: "Página de configuración del generador de análisis empresarial"
permalink: /config/
---

<div style="font-family: 'Poppins', sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; background: #101827; color: #e5e7eb; border-radius: 20px; margin-top: 2rem;">
    <h1 style="color: #00a99d; text-align: center; margin-bottom: 2rem;">Configuración del Sistema</h1>
    
    <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
        <h2 style="color: #00a99d; margin-bottom: 1rem;">🔧 Información del Sistema</h2>
        <ul style="line-height: 1.8;">
            <li><strong>Versión:</strong> 1.0.0</li>
            <li><strong>Última actualización:</strong> {{ site.time | date: "%d/%m/%Y" }}</li>
            <li><strong>Repositorio:</strong> <a href="https://github.com/{{ site.repository }}" style="color: #00a99d;">{{ site.repository }}</a></li>
            <li><strong>Autor:</strong> {{ site.author }}</li>
        </ul>
    </div>
    
    <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
        <h2 style="color: #00a99d; margin-bottom: 1rem;">🚀 Configuración GitHub Pages</h2>
        <ul style="line-height: 1.8;">
            <li><strong>URL del sitio:</strong> <a href="{{ site.url }}{{ site.baseurl }}" style="color: #00a99d;">{{ site.url }}{{ site.baseurl }}</a></li>
            <li><strong>Base URL:</strong> {{ site.baseurl }}</li>
            <li><strong>Entorno:</strong> {{ jekyll.environment }}</li>
            <li><strong>Tema:</strong> {{ site.theme }}</li>
        </ul>
    </div>
    
    <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
        <h2 style="color: #00a99d; margin-bottom: 1rem;">🔗 API y Servicios</h2>
        <ul style="line-height: 1.8;">
            <li><strong>Webhook URL:</strong> hook.eu2.make.com</li>
            <li><strong>Protocolo:</strong> HTTPS</li>
            <li><strong>Método:</strong> POST</li>
            <li><strong>Formato:</strong> JSON</li>
        </ul>
    </div>
    
    <div style="text-align: center; margin-top: 2rem;">
        <a href="{{ site.baseurl }}/" style="background: #00a99d; color: white; padding: 0.8rem 2rem; text-decoration: none; border-radius: 10px; display: inline-block; font-weight: 500;">
            ← Volver al Inicio
        </a>
    </div>
</div>
