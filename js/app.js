/* ==========================================================
   DEV AESTHETIC DESIGN SYSTEM - CYBER DEVELOPER / AWWWARDS
   ========================================================== */

:root {
  --bg-dark: #08080c;
  --bg-surface: #0f1016;
  --bg-card: rgba(15, 16, 22, 0.75);
  --cyan-neon: #00f2fe;
  --cyan-glow: rgba(0, 242, 254, 0.35);
  --purple-neon: #7c3aed;
  --purple-glow: rgba(124, 58, 237, 0.35);
  --terminal-green: #10b981;
  --terminal-glow: rgba(16, 185, 129, 0.35);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-active: rgba(0, 242, 254, 0.3);
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* Fallback utility classes for editor & CSS compatibility */
.bg-cyberDark { background-color: #08080c !important; }
.bg-cyberSurface { background-color: #0f1016 !important; }
.text-neonCyan { color: #00f2fe !important; }
.text-neonPurple { color: #7c3aed !important; }
.text-terminalGreen { color: #10b981 !important; }
.border-neonCyan { border-color: #00f2fe !important; }

/* Base resets & typography */
html {
  scroll-behavior: smooth;
  background-color: var(--bg-dark);
  color: #f1f5f9;
  font-family: var(--font-body);
}

body {
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #08080c;
}
::-webkit-scrollbar-thumb {
  background: #1e2230;
  border-radius: 4px;
  border: 1px solid rgba(0, 242, 254, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: #00f2fe;
}

/* Engineering Blueprint Grid Pattern */
.bg-grid-pattern {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.bg-radial-gradient {
  background: radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 242, 254, 0.05) 45%, transparent 70%);
}

/* ==========================================================
   INTERACTIVE CURSOR & SPOTLIGHT LANTERN
   ========================================================== */

#spotlight-aura {
  position: fixed;
  top: 0;
  left: 0;
  width: 650px;
  height: 650px;
  margin-left: -325px;
  margin-top: -325px;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.09) 0%, rgba(124, 58, 237, 0.05) 35%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.4s ease;
  will-change: transform;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: var(--cyan-neon);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px var(--cyan-neon), 0 0 20px var(--cyan-neon);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  border: 1.5px solid rgba(0, 242, 254, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
              height 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.25s ease,
              background-color 0.25s ease,
              transform 0.05s ease-out;
}

/* Hover state on clickable elements */
.cursor-hover .cursor-ring {
  width: 64px;
  height: 64px;
  border-color: rgba(0, 242, 254, 0.9);
  background: rgba(0, 242, 254, 0.08);
  mix-blend-mode: difference;
}

.cursor-hover .cursor-dot {
  width: 10px;
  height: 10px;
  background-color: #fff;
}

/* Completely disable custom cursor on touch/mobile devices */
@media (pointer: coarse) or (hover: none) {
  .cursor-dot, .cursor-ring, #spotlight-aura {
    display: none !important;
  }
  body, a, button, input, select {
    cursor: auto !important;
  }
}

/* ==========================================================
   GLASSMORPHISM & CYBERCARDS
   ========================================================== */

.glass-nav {
  background: rgba(8, 8, 12, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
}

.glass-card:hover {
  border-color: var(--border-active);
  box-shadow: 0 10px 30px -10px rgba(0, 242, 254, 0.15);
}

/* Interactive Card Spotlight Glow */
.spotlight-card {
  position: relative;
}
.spotlight-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(0, 242, 254, 0.4), transparent 70%);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.spotlight-card:hover::after {
  opacity: 1;
}

/* 3D Tilt perspective wrapper */
.tilt-card-wrapper {
  perspective: 1000px;
}
.tilt-card {
  transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

/* ==========================================================
   DEV TYPOGRAPHY & GRADIENTS
   ========================================================== */

.font-code {
  font-family: var(--font-mono);
}

.font-heading {
  font-family: var(--font-sans);
}

/* ==========================================================
   HERO TITLE SMOOTH GRADIENT & ANIMATION (ELEGANT FADE-IN)
   ========================================================== */

@keyframes hero-fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(22px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-title-smooth {
  animation: hero-fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-text-gradient-flow {
  background: linear-gradient(115deg, #ffffff 0%, #d8f5ff 20%, #00f2fe 45%, #c084fc 75%, #00f2fe 100%);
  background-size: 250% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hero-gradient-flow 8s ease infinite;
}

.text-gradient-cyan {
  background: linear-gradient(135deg, #ffffff 10%, #00f2fe 70%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-purple {
  background: linear-gradient(135deg, #00f2fe 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-emerald {
  background: linear-gradient(135deg, #10b981 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ==========================================================
   SIMULADOR / COTIZADOR INTERACTIVO DE PRESUPUESTO
   ========================================================== */

.addon-card-active {
  border-color: rgba(0, 242, 254, 0.6) !important;
  background: rgba(0, 242, 254, 0.06) !important;
  box-shadow: 0 0 20px -5px rgba(0, 242, 254, 0.2) !important;
}

.budget-plan-btn.active {
  border-color: #00f2fe !important;
  background: rgba(0, 242, 254, 0.14) !important;
  color: #00f2fe !important;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.25) !important;
}

.receipt-ticket {
  background: radial-gradient(circle at top right, rgba(0, 242, 254, 0.08) 0%, rgba(15, 16, 22, 0.95) 60%);
  border: 1px solid rgba(0, 242, 254, 0.25);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.7);
  position: relative;
}

.receipt-ticket::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00f2fe, #7c3aed, #10b981);
}

.receipt-dashed-line {
  border-bottom: 2px dashed rgba(255, 255, 255, 0.12);
}

/* ==========================================================
   CODE SYNTAX HIGHLIGHTING (TERMINAL & VS CODE)
   ========================================================== */

.syn-keyword { color: #f43f5e; font-weight: 600; }
.syn-fn { color: #38bdf8; }
.syn-string { color: #34d399; }
.syn-var { color: #fbbf24; }
.syn-comment { color: #64748b; font-style: italic; }
.syn-tag { color: #818cf8; }
.syn-num { color: #f97316; }

/* Neon Pulse Animation for Live Status */
@keyframes neon-pulse-green {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
}

.status-dot-active {
  animation: neon-pulse-green 2s infinite;
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float-gentle 4s ease-in-out infinite;
}

/* Neon Glow borders for Highlighted Card */
.border-glow-featured {
  position: relative;
  background: linear-gradient(var(--bg-surface), var(--bg-surface)) padding-box,
              linear-gradient(135deg, #00f2fe, #7c3aed, #10b981) border-box;
  border: 2px solid transparent;
  box-shadow: 0 0 35px -5px rgba(0, 242, 254, 0.25);
}

/* WhatsApp chat preview mockup */
.wa-chat-bg {
  background-color: #0b141a;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
.wa-bubble-user {
  background-color: #005c4b;
  border-top-right-radius: 0;
}
.wa-bubble-system {
  background-color: #202c33;
  border-top-left-radius: 0;
}

/* Terminal Tab Active */
.tab-active {
  background: rgba(0, 242, 254, 0.12) !important;
  color: #00f2fe !important;
  border-bottom: 2px solid #00f2fe !important;
}

/* Button Shimmer */
.btn-shimmer {
  position: relative;
  overflow: hidden;
}
.btn-shimmer::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    60deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.08) 60%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.75s ease-in-out;
}
.btn-shimmer:hover::after {
  transform: translateX(100%);
}

/* ==========================================================
   SMARTPHONE MOCKUP FRAME (VISTA MOBILE)
   ========================================================== */

#demo-device-frame {
  transition: max-width 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-phone-frame {
  max-width: 395px !important;
  border-radius: 46px !important;
  border: 11px solid #1a1c26 !important;
  box-shadow: 0 0 0 2px rgba(0, 242, 254, 0.35), 0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 242, 254, 0.15) !important;
  background-color: #0b0c12 !important;
}

.mobile-phone-frame .desktop-chrome-header {
  display: none !important;
}

.mobile-phone-frame .mobile-notch-header {
  display: flex !important;
}

.mobile-phone-frame .mobile-home-indicator {
  display: block !important;
}

.mobile-notch-header {
  display: none;
}

.mobile-home-indicator {
  display: none;
}
