# 🏍️ BOXER MOTO AI ACADEMY

> **Impulsa tu futuro con Inteligencia Artificial al estilo Boxer Moto.**

![Version](https://img.shields.io/badge/version-1.0.0-00ff88?style=for-the-badge)
![Status](https://img.shields.io/badge/status-production--ready-00ccff?style=for-the-badge)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-ffffff?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-00ff88?style=for-the-badge)

---

## 📌 Descripción del Proyecto

**Boxer Moto AI Academy** es una plataforma educativa tecnológica de alto nivel, diseñada para democratizar el aprendizaje de Inteligencia Artificial con una estética futurista inspirada en la cultura Boxer Moto. Combina cursos profesionales de IA, un chatbot especializado con Gemini API y una experiencia visual premium que transmite velocidad, innovación y futuro digital.

La plataforma está construida únicamente con **HTML5, CSS3 y JavaScript Vanilla** — sin frameworks — garantizando máxima portabilidad, rendimiento optimizado y código 100% mantenible.

---

## 🎯 Características Principales

- **Landing page futurista** con hero section animado y CTA de alta conversión
- **Historia de la IA** — evolución, impacto y proyección tecnológica
- **5 cursos profesionales** de Inteligencia Artificial con certificación
- **Sección "Sobre Mí"** — perfil profesional del fundador con timeline y estadísticas
- **Sección de Instructores** con tarjetas profesionales
- **Chatbot IA** integrado con Google Gemini API y base de conocimiento privada
- **Formulario de contacto** con validaciones JavaScript avanzadas
- **Diseño 100% responsivo** — mobile-first
- **Arquitectura modular y escalable**

---

## 🗂️ Arquitectura del Proyecto

```
/boxer-moto-ai-academy
│
├── index.html                  # Punto de entrada principal
│
├── /css
│   ├── styles.css              # Estilos globales y componentes
│   ├── responsive.css          # Breakpoints y diseño adaptativo
│   └── animations.css          # Keyframes y transiciones
│
├── /js
│   ├── app.js                  # Inicializador principal
│   ├── chatbot.js              # Lógica del chatbot con Gemini API
│   ├── courses.js              # Renderizado dinámico de cursos
│   ├── instructors.js          # Módulo de instructores
│   ├── about.js                # Sección "Sobre Mí"
│   ├── contact.js              # Validación y envío del formulario
│   ├── knowledge-base.js       # Base de conocimiento privada (JSON)
│   └── ui.js                   # Utilidades UI, scroll, animaciones
│
├── /assets
│   ├── /images                 # Imágenes optimizadas
│   ├── /icons                  # Íconos SVG personalizados
│   └── /videos                 # Recursos multimedia
│
├── .env.example                # Plantilla de variables de entorno
└── README.md                   # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos previos

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Servidor local (Live Server, Python HTTP Server, etc.)
- API Key de Google AI Studio (Gemini)

### Pasos de instalación

**1. Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/boxer-moto-ai-academy.git
cd boxer-moto-ai-academy
```

**2. Configurar variables de entorno**
```bash
cp .env.example .env
```
Editar `.env` y agregar tu API Key de Gemini:
```
GEMINI_API_KEY=tu_api_key_aqui
```

**3. Iniciar servidor local**

Con Python:
```bash
python -m http.server 8080
```

Con Node.js (npx):
```bash
npx serve .
```

Con VS Code Live Server:
- Instalar extensión Live Server
- Click derecho en `index.html` → "Open with Live Server"

**4. Abrir en navegador**
```
http://localhost:8080
```

---

## 🔐 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `GEMINI_API_KEY` | API Key de Google Gemini (Google AI Studio) | ✅ Sí |

### Obtener API Key de Gemini

1. Ir a [Google AI Studio](https://aistudio.google.com/)
2. Crear una cuenta o iniciar sesión
3. Navegar a **API Keys** → **Create API Key**
4. Copiar la clave y agregarla al archivo `.env`

> ⚠️ **Importante:** Nunca subas tu `.env` real al repositorio. El archivo `.gitignore` ya lo excluye por defecto.

---

## 🤖 Chatbot IA — Gemini API

El chatbot está construido sobre **Google Gemini Flash** y opera con una base de conocimiento privada que restringe sus respuestas exclusivamente al contexto de Boxer Moto AI Academy.

### Comportamiento del Chatbot

El asistente **solo responde** sobre los siguientes temas:

- ✅ Información institucional de Boxer Moto AI Academy
- ✅ Historia y evolución de la Inteligencia Artificial
- ✅ Cursos disponibles, módulos, precios y certificaciones
- ✅ Perfil del fundador e instructores
- ✅ Preguntas frecuentes (FAQ)
- ✅ Proceso de inscripción y contacto
- ❌ Temas externos no relacionados con la plataforma

### Integración técnica

```javascript
// Ejemplo de llamada a la API
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: KNOWLEDGE_BASE_CONTEXT }]
      },
      contents: [
        { role: "user", parts: [{ text: userMessage }] }
      ]
    })
  }
);
```

### Base de Conocimiento (`knowledge-base.js`)

```javascript
// Estructura de la base de conocimiento privada
const KNOWLEDGE_BASE = {
  institution: { /* info institucional */ },
  aiHistory:   { /* historia de la IA */ },
  courses:     [ /* 5 cursos completos */ ],
  founder:     { /* perfil del fundador */ },
  instructors: [ /* equipo docente */ ],
  faq:         [ /* preguntas frecuentes */ ],
  philosophy:  { /* filosofía Boxer Moto */ }
};
```

---

## 📚 Cursos Disponibles

| # | Curso | Nivel | Duración | Precio COP |
|---|-------|-------|----------|-----------|
| 1 | Fundamentos de Inteligencia Artificial | Básico | 40 horas | $320.000 |
| 2 | Introducción a Machine Learning | Básico-Intermedio | 50 horas | $480.000 |
| 3 | Machine Learning y Algoritmos Genéticos | Intermedio | 60 horas | $650.000 |
| 4 | Fundamentos de Deep Learning | Intermedio-Avanzado | 70 horas | $820.000 |
| 5 | Aplicaciones de Deep Learning | Avanzado | 80 horas | $980.000 |

Todos los cursos incluyen **certificado digital**, **proyecto final** y acceso al **campus virtual**.

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#00ff88` | Verde tecnológico — CTAs, acentos |
| `--color-secondary` | `#00ccff` | Azul eléctrico — bordes, highlights |
| `--color-bg-dark` | `#0a0a0f` | Fondo principal oscuro |
| `--color-bg-card` | `#12121a` | Fondo de tarjetas |
| `--color-text` | `#ffffff` | Texto principal |
| `--color-text-muted` | `#8888aa` | Texto secundario |

### Tipografía

- **Principal:** `Orbitron` — títulos futuristas
- **Secundaria:** `Inter` — texto de cuerpo y UI
- **Monoespaciada:** `JetBrains Mono` — código y datos técnicos

---

## 🧩 Navegación

| Sección | ID Anchor | Descripción |
|---------|-----------|-------------|
| Inicio | `#home` | Hero section principal |
| Sobre Mí | `#about` | Perfil del fundador |
| Cursos | `#courses` | Catálogo de cursos |
| Instructores | `#instructors` | Equipo docente |
| Chatbot IA | `#chatbot` | Asistente inteligente |
| Contáctanos | `#contact` | Formulario de contacto |

---

## ⚙️ Buenas Prácticas Implementadas

- **Clean Code** — nomenclatura clara, funciones con responsabilidad única
- **SOLID** — principios aplicados en la arquitectura de módulos JS
- **Modularidad** — cada sección tiene su propio archivo JS independiente
- **Responsive Design** — mobile-first con breakpoints en 480px, 768px, 1024px, 1440px
- **Accesibilidad** — atributos ARIA, contraste WCAG AA, navegación por teclado
- **Lazy Loading** — imágenes y secciones cargadas bajo demanda
- **Optimización** — CSS crítico inline, JS diferido, assets comprimidos
- **SEO básico** — meta tags, Open Graph y estructura semántica HTML5

---

## 🔧 Scripts de Desarrollo

```bash
# Validar HTML
npx html-validate index.html

# Formatear código
npx prettier --write "**/*.{html,css,js}"

# Minificar CSS
npx clean-css-cli css/styles.css -o css/styles.min.css

# Minificar JS
npx terser js/app.js -o js/app.min.js
```

---

## 🌐 Despliegue

### Netlify (recomendado)
```bash
# Arrastrar carpeta del proyecto al dashboard de Netlify
# O conectar repositorio GitHub para CD automático
```

### GitHub Pages
```bash
git push origin main
# Activar Pages en Settings → Pages → Source: main branch
```

### Servidor propio (Nginx)
```nginx
server {
    listen 80;
    server_name boxermotoai.com;
    root /var/www/boxer-moto-ai-academy;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> ⚠️ **Seguridad en producción:** La API Key de Gemini debe manejarse a través de un backend proxy (Node.js/Express o serverless function) para no exponerla en el cliente.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Hacer fork del repositorio
2. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit con mensaje descriptivo: `git commit -m "feat: agregar sección de testimonios"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo `LICENSE` para más detalles.

---

## 📬 Contacto

**Boxer Moto AI Academy**

- 🌐 Website: [boxermotoai.academy](https://boxermotoai.academy)
- 📧 Email: contacto@boxermotoai.academy
- 📱 WhatsApp: +57 300 000 0000
- 🐙 GitHub: [@boxer-moto-ai](https://github.com/boxer-moto-ai)
- 💼 LinkedIn: [Boxer Moto AI Academy](https://linkedin.com/company/boxer-moto-ai)

---

<div align="center">

**⚡ Construido con pasión por la tecnología y el espíritu Boxer Moto ⚡**

*"La velocidad no es solo para las motos — también es para aprender."*

</div>
