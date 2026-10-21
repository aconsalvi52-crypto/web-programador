# 🚀 Portfolio Comercial & Landing Page - Desarrollo Web Argentina

Landing Page y Portfolio comercial interactivo de nivel **Awwwards** con estética **Cyber-Developer**, diseñado para ofrecer servicios de Desarrollo Web y E-Commerce en Argentina.

---

## ⚡ Características Principales

- **Estética Cyber-Developer:** Dark Mode moderno (`#08080c`), grilla técnica estilo plano de ingeniería y tarjetas con **Glassmorphism** (`backdrop-filter: blur(16px)`).
- **Tipografía:** *Space Grotesk* para títulos y *JetBrains Mono* para código, precios y badges.
- **Cursor Interactivo & Spotlight:** Cursor doble fluido con inercia (`lerp`) y linterna radial tipo Vercel/Linear (se desactiva automáticamente en celulares).
- **Hero con Canvas Interactivo:** Red de partículas conectadas en HTML5 Canvas con repulsión al mouse + título con degradado y animación suave.
- **Showcase Interactivo (Mini Tienda Demo):**
  - Vista Desktop & Vista Mobile con chasis de smartphone y Dynamic Island.
  - Carrito de compras funcional interactivo.
  - Generador de pedidos automáticos a WhatsApp con modal estilo WhatsApp Dark Mode.
- **Cotizador / Calculadora de Presupuestos en Vivo:** Selector visual de los 6 planes comerciales + 7 adicionales con checkboxes neón, cálculo de 50% de anticipo y botón directo a WhatsApp.
- **Tarifas y Comparativa de 6 Planes:** Desde "Código en Mano" hasta "E-Commerce Full Automatizado".
- **Sección Educativa:** Información transparente sobre aranceles de NIC Argentina (`.com.ar`), dominios internacionales y mantenimiento preventivo.
- **Formulario Dual & Widgets Flotantes:** Envío directo por WhatsApp o Email.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Maquetación semántica y SEO optimizado.
- **CSS3 / Vanilla CSS:** Sistema de diseño personalizado, efectos 3D Tilt, animación de gradientes y spotlight.
- **JavaScript (ES6+):** Lógica reactiva para el carrito, simulador de presupuesto, canvas y partículas.
- **Tailwind CSS (CDN):** Utilidades rápidas de espaciado y maquetación.
- **FontAwesome 6 (CDN):** Iconografía vectorial nítida.

---

## 📱 Configuración de Datos de Contacto

Podés personalizar tu teléfono, correo y redes editando las primeras líneas de `js/app.js`:

```javascript
const CONTACTO = {
  whatsapp: "542216415898",
  email: "tu_correo@hotmail.com",
  instagram: "@tu_usuario",
  nombreDev: "Tu Nombre | Senior Dev",
  ciudad: "Buenos Aires, Argentina"
};
```

---

## 🌐 Despliegue en GitHub Pages

Para publicar esta web gratis y tener tu propio enlace público en internet:
1. En tu repositorio de GitHub, andá a **Settings** > **Pages**.
2. En **Build and deployment** > **Branch**, seleccioná `main` y la carpeta `/ (root)`.
3. Hacé clic en **Save**. En un par de minutos tu página estará activa en:  
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`
