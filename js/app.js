/**
 * =========================================================================
 * CONFIGURACIÓN DE CONTACTO COMERCIAL
 * Edita estas variables con tus datos reales para que todos los enlaces
 * y formularios de la web apunten directamente a tus cuentas.
 * =========================================================================
 */
const CONTACTO = {
  whatsapp: "542216415898",          // Tu número de WhatsApp con código de país (ej: 549 + código de área + número)
  email: "consalvithoma@hotmail.com",     // Tu correo de contacto profesional
  instagram: "@tu_usuario",           // Tu cuenta de Instagram comercial
  nombreDev: "Agustín | Senior Dev",   // Tu nombre o marca comercial
  ciudad: "Buenos Aires, Argentina"
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCustomCursor();
  initHeroCanvas();
  initTiltCards();
  initHeroCodePreview();
  initShopDemo();
  initBudgetCalculator();
  initPlansFilter();
  initEducationalTerminal();
  initContactForm();
  initPlanButtons();
  initFloatingButtons();
  initSmoothScroll();
  initScrollReveal();
});

/* =========================================================================
   0. MENÚ MÓVIL (HAMBURGUESA)
   ========================================================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const dropdown = document.getElementById("mobile-menu-dropdown");
  if (!toggleBtn || !dropdown) return;

  toggleBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  dropdown.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      dropdown.classList.add("hidden");
    });
  });
}

/* =========================================================================
   1. CURSOR INTERACTIVO DOBLE & SPOTLIGHT AURA
   ========================================================================= */
function initCustomCursor() {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  if (isTouchDevice) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const spotlight = document.getElementById("spotlight-aura");

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Actualiza posición del punto central inmediatamente
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    // Spotlight lantern
    if (spotlight) {
      spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    // Actualizar coordenadas para tarjetas con glow spotlight
    document.querySelectorAll(".spotlight-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Animación fluida (lerp) para el anillo exterior
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Detectar elementos interactivos para expandir cursor
  const interactiveSelectors = 'a, button, input, select, textarea, .interactive-card, .tilt-card, [role="button"], .tab-btn';
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  // Delegación para elementos que se agreguen dinámicamente
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add("cursor-hover");
    } else {
      document.body.classList.remove("cursor-hover");
    }
  });
}

/* =========================================================================
   2. CANVAS DE PARTÍCULAS / RED NEURONAL EN EL HERO
   ========================================================================= */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  const particles = [];
  let mouse = { x: -1000, y: -1000, radius: 140 };

  function updateDimensions() {
    const parent = canvas.parentElement;
    width = canvas.width = parent && parent.offsetWidth > 0 ? parent.offsetWidth : window.innerWidth;
    height = canvas.height = parent && parent.offsetHeight > 0 ? parent.offsetHeight : Math.max(window.innerHeight * 0.9, 600);
  }

  updateDimensions();

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = Math.random() * (height || 600);
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? "rgba(0, 242, 254, " : "rgba(124, 58, 237, ";
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Interacción con mouse
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  function spawnParticles() {
    particles.length = 0;
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 13000), 25), 65);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  spawnParticles();

  window.addEventListener("resize", () => {
    updateDimensions();
    if (particles.length === 0) {
      spawnParticles();
    }
  });

  window.addEventListener("load", () => {
    updateDimensions();
    if (particles.length === 0) {
      spawnParticles();
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Conectar nodos cercanos
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* =========================================================================
   3. SIMULADOR / COTIZADOR INTERACTIVO DE PRESUPUESTO EN TIEMPO REAL
   ========================================================================= */
const BUDGET_PLANS = {
  plan1: {
    id: "plan1",
    name: "Plan 1: Código en Mano",
    shortName: "Código en Mano",
    oneTime: 120000,
    monthly: 0,
    delivery: "5 - 7 días hábiles"
  },
  plan2: {
    id: "plan2",
    name: "Plan 2: Llave en Mano + Mantenimiento",
    shortName: "Llave en Mano",
    oneTime: 220000,
    monthly: 35000,
    delivery: "7 - 10 días hábiles"
  },
  plan3: {
    id: "plan3",
    name: "Plan 3: Autogestionable",
    shortName: "Autogestionable",
    oneTime: 190000,
    monthly: 0,
    delivery: "7 - 10 días hábiles"
  },
  plan4: {
    id: "plan4",
    name: "Plan 4: Suscripción / Alquiler Web",
    shortName: "Alquiler Web",
    oneTime: 0,
    monthly: 45000,
    delivery: "3 - 5 días hábiles"
  },
  plan5: {
    id: "plan5",
    name: "Plan 5: Landing Express + Catálogo WhatsApp",
    shortName: "Landing Express",
    oneTime: 135000,
    monthly: 0,
    delivery: "3 - 5 días hábiles"
  },
  plan6: {
    id: "plan6",
    name: "Plan 6: E-Commerce Full Automatizado",
    shortName: "E-Commerce Full",
    oneTime: 320000,
    monthly: 0,
    delivery: "10 - 15 días hábiles"
  }
};

const BUDGET_ADDONS = {
  logo: {
    id: "logo",
    name: "Diseño de Logo e Identidad Visual Básica",
    price: 45000,
    isMonthly: false
  },
  extra_products: {
    id: "extra_products",
    name: "Carga extra de 30 productos con edición de fotos",
    price: 35000,
    isMonthly: false
  },
  domain_dns: {
    id: "domain_dns",
    name: "Gestión y compra de Dominio .com.ar + DNS",
    price: 15000,
    isMonthly: false
  },
  chatbot: {
    id: "chatbot",
    name: "Integración de Chatbot de respuestas frecuentes",
    price: 40000,
    isMonthly: false
  },
  seo_gmb: {
    id: "seo_gmb",
    name: "Optimización SEO Avanzada + Google Mi Negocio",
    price: 30000,
    isMonthly: false
  },
  express_72h: {
    id: "express_72h",
    name: "Entrega Express Prioritaria en 72hs",
    price: 50000,
    isMonthly: false
  },
  maintenance_monthly: {
    id: "maintenance_monthly",
    name: "Sumar Mantenimiento Mensual Opcional",
    price: 30000,
    isMonthly: true
  }
};

function formatARS(num) {
  return `$${num.toLocaleString("es-AR")} ARS`;
}

function animateNumber(element, targetValue) {
  if (!element) return;
  const currentStr = element.getAttribute("data-value") || "0";
  const startValue = parseInt(currentStr, 10) || 0;
  if (startValue === targetValue) {
    element.innerText = formatARS(targetValue);
    return;
  }

  const duration = 300;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.round(startValue + (targetValue - startValue) * ease);

    element.innerText = formatARS(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.innerText = formatARS(targetValue);
      element.setAttribute("data-value", targetValue);
    }
  }

  requestAnimationFrame(update);
}

function initBudgetCalculator() {
  const container = document.getElementById("cotizador-presupuesto");
  if (!container) return;

  let currentPlanKey = "plan2";
  const selectedAddons = new Set();

  const planButtons = container.querySelectorAll(".budget-plan-btn");
  const addonCheckboxes = container.querySelectorAll(".budget-addon-checkbox");
  const receiptPlanName = document.getElementById("calc-receipt-plan-name");
  const receiptPlanPrice = document.getElementById("calc-receipt-plan-price");
  const receiptAddonsList = document.getElementById("calc-receipt-addons-list");
  const receiptTotalOneTime = document.getElementById("calc-receipt-total-onetime");
  const receiptAdvance50 = document.getElementById("calc-receipt-advance-50");
  const receiptMonthlyRow = document.getElementById("calc-receipt-monthly-row");
  const receiptMonthlyPrice = document.getElementById("calc-receipt-monthly-price");
  const receiptDeliveryTime = document.getElementById("calc-receipt-delivery");
  const whatsappSendBtn = document.getElementById("calc-whatsapp-btn");

  function recalculate() {
    const plan = BUDGET_PLANS[currentPlanKey];
    let totalOneTime = plan.oneTime;
    let totalMonthly = plan.monthly;
    const activeAddonsList = [];

    selectedAddons.forEach((addonKey) => {
      const addon = BUDGET_ADDONS[addonKey];
      if (addon) {
        if (addon.isMonthly) {
          totalMonthly += addon.price;
        } else {
          totalOneTime += addon.price;
        }
        activeAddonsList.push(addon);
      }
    });

    const advance50 = Math.round(totalOneTime / 2);

    if (receiptPlanName) {
      receiptPlanName.innerText = plan.name;
    }
    if (receiptPlanPrice) {
      receiptPlanPrice.innerText = plan.oneTime > 0 ? formatARS(plan.oneTime) : `${formatARS(plan.monthly)} / mes`;
    }

    if (receiptAddonsList) {
      if (activeAddonsList.length === 0) {
        receiptAddonsList.innerHTML = `
          <div class="text-[11px] text-slate-500 font-mono italic py-1">
            Ningún adicional seleccionado (podés tildar los que necesites a la izquierda)
          </div>
        `;
      } else {
        receiptAddonsList.innerHTML = activeAddonsList
          .map(
            (addon) => `
          <div class="flex items-center justify-between py-1 text-xs font-mono text-slate-300 border-b border-slate-800/60">
            <span class="flex items-center gap-1.5 line-clamp-1">
              <i class="fa-solid fa-check text-cyan-400 text-[10px]"></i> ${addon.name}
            </span>
            <span class="text-neonCyan font-bold whitespace-nowrap ml-2">+${formatARS(addon.price)}${addon.isMonthly ? '/mes' : ''}</span>
          </div>
        `
          )
          .join("");
      }
    }

    animateNumber(receiptTotalOneTime, totalOneTime);
    animateNumber(receiptAdvance50, advance50);

    if (receiptMonthlyRow && receiptMonthlyPrice) {
      if (totalMonthly > 0) {
        receiptMonthlyRow.classList.remove("hidden");
        animateNumber(receiptMonthlyPrice, totalMonthly);
      } else {
        receiptMonthlyRow.classList.add("hidden");
      }
    }

    if (receiptDeliveryTime) {
      if (selectedAddons.has("express_72h")) {
        receiptDeliveryTime.innerHTML = `<span class="text-amber-400 font-bold"><i class="fa-solid fa-bolt mr-1"></i>72 horas prioritario</span>`;
      } else {
        receiptDeliveryTime.innerText = plan.delivery;
      }
    }

    if (whatsappSendBtn) {
      const addonsText =
        activeAddonsList.length > 0
          ? activeAddonsList.map((a) => `• ${a.name} (+${formatARS(a.price)}${a.isMonthly ? '/mes' : ''})`).join("\n")
          : "• Ninguno (solo Plan Base)";

      const waMsg =
        `👋 *¡Hola! Armé un presupuesto personalizado desde el cotizador web:*\n\n` +
        `💼 *PLAN BASE:* ${plan.name} (${plan.oneTime > 0 ? formatARS(plan.oneTime) : formatARS(plan.monthly) + '/mes'})\n\n` +
        `🧩 *ADICIONALES INCLUIDOS:*\n${addonsText}\n\n` +
        `💰 *TOTAL INVERSIÓN ÚNICA:* ${formatARS(totalOneTime)}\n` +
        `💵 *Anticipo 50% para iniciar:* ${formatARS(advance50)}\n` +
        (totalMonthly > 0 ? `🔄 *Abono Mensual:* ${formatARS(totalMonthly)}/mes\n` : "") +
        `⏱️ *Entrega:* ${selectedAddons.has("express_72h") ? "72 horas prioritario" : plan.delivery}\n\n` +
        `¿Podemos coordinar para avanzar con este proyecto? ¡Muchas gracias!`;

      whatsappSendBtn.href = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  planButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      planButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentPlanKey = btn.getAttribute("data-plan-id");
      recalculate();
    });
  });

  addonCheckboxes.forEach((checkbox) => {
    const card = checkbox.closest(".budget-addon-card");
    const addonId = checkbox.getAttribute("data-addon-id");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedAddons.add(addonId);
        if (card) card.classList.add("addon-card-active");
      } else {
        selectedAddons.delete(addonId);
        if (card) card.classList.remove("addon-card-active");
      }
      recalculate();
    });

    if (card) {
      card.addEventListener("click", (e) => {
        if (e.target !== checkbox && !e.target.closest("input")) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
    }
  });

  recalculate();
}

/* =========================================================================
   4. EFECTO 3D TILT EN TARJETAS DE PLANES
   ========================================================================= */
function initTiltCards() {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return;

  const cards = document.querySelectorAll(".tilt-card-wrapper");

  cards.forEach((wrapper) => {
    const card = wrapper.querySelector(".tilt-card");
    if (!card) return;

    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7.5;
      const rotateY = ((x - centerX) / centerX) * 7.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018, 1.018, 1.018)`;
    });

    wrapper.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* =========================================================================
   5. EDITOR VS CODE vs VISTA PREVIA INTERACTIVA (HERO)
   ========================================================================= */
function initHeroCodePreview() {
  const tabCode = document.getElementById("hero-tab-code");
  const tabPreview = document.getElementById("hero-tab-preview");
  const contentCode = document.getElementById("hero-content-code");
  const contentPreview = document.getElementById("hero-content-preview");

  if (!tabCode || !tabPreview || !contentCode || !contentPreview) return;

  tabCode.addEventListener("click", () => {
    tabCode.classList.add("tab-active");
    tabPreview.classList.remove("tab-active");
    contentCode.classList.remove("hidden");
    contentPreview.classList.add("hidden");
  });

  tabPreview.addEventListener("click", () => {
    tabPreview.classList.add("tab-active");
    tabCode.classList.remove("tab-active");
    contentPreview.classList.remove("hidden");
    contentCode.classList.add("hidden");
  });
}

/* =========================================================================
   6. SHOWCASE INTERACTIVO: MINI TIENDA DEMO Y CHECKOUT WHATSAPP
   ========================================================================= */
function initShopDemo() {
  // Productos de muestra
  const demoProducts = [
    {
      id: 1,
      name: "Café Bourbon Especial 250g",
      category: "cafe",
      price: 14500,
      tag: "Más vendido",
      icon: "fa-mug-hot",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      id: 2,
      name: "Prensa Francesa Acero 600ml",
      category: "accesorios",
      price: 32000,
      tag: "Alta Demanda",
      icon: "fa-blender",
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      id: 3,
      name: "Molino Cónico Manual Pro",
      category: "accesorios",
      price: 48000,
      tag: "Envío Gratis",
      icon: "fa-gear",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 4,
      name: "Combo Degustación Barista",
      category: "combos",
      price: 39900,
      tag: "Ahorrá 15%",
      icon: "fa-box-open",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  let cart = [];

  const productsContainer = document.getElementById("demo-products-grid");
  const cartCounter = document.getElementById("demo-cart-count");
  const cartItemsList = document.getElementById("demo-cart-items");
  const cartSubtotalEl = document.getElementById("demo-cart-subtotal");
  const cartModal = document.getElementById("demo-cart-modal");
  const openCartBtn = document.getElementById("demo-open-cart-btn");
  const closeCartBtn = document.getElementById("demo-close-cart-btn");
  const checkoutBtn = document.getElementById("demo-checkout-whatsapp");
  const waModal = document.getElementById("demo-wa-preview-modal");
  const closeWaModal = document.getElementById("demo-close-wa-modal");
  const waMessageText = document.getElementById("demo-wa-text");
  const waRealSendBtn = document.getElementById("demo-wa-real-send");

  // Renderizar productos
  function renderProducts(filter = "todos") {
    if (!productsContainer) return;
    productsContainer.innerHTML = "";

    const filtered = filter === "todos" ? demoProducts : demoProducts.filter((p) => p.category === filter);

    filtered.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group";
      card.innerHTML = `
        <div>
          <div class="h-24 w-full rounded-lg bg-gradient-to-br ${prod.color} border border-slate-800/80 flex items-center justify-center relative mb-2.5 overflow-hidden">
            <i class="fa-solid ${prod.icon} text-3xl text-cyan-400 group-hover:scale-110 transition-transform"></i>
            <span class="absolute top-1.5 right-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/20 font-semibold">${prod.tag}</span>
          </div>
          <h4 class="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">${prod.name}</h4>
          <p class="font-mono text-cyan-400 text-sm font-bold">$${prod.price.toLocaleString("es-AR")}</p>
        </div>
        <button data-id="${prod.id}" class="demo-add-btn mt-2.5 w-full py-1.5 px-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 rounded-lg text-[11px] font-mono font-medium flex items-center justify-center gap-1.5 transition-all">
          <i class="fa-solid fa-cart-plus"></i> Agregar
        </button>
      `;
      productsContainer.appendChild(card);
    });

    // Attach click listener
    productsContainer.querySelectorAll(".demo-add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        addToCart(id);
      });
    });
  }

  renderProducts();

  // Filtros de categoría de la demo
  document.querySelectorAll(".demo-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".demo-filter-btn").forEach((b) => b.classList.remove("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40"));
      btn.classList.add("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40");
      renderProducts(btn.getAttribute("data-filter"));
    });
  });

  // Agregar al carrito
  function addToCart(productId) {
    const item = demoProducts.find((p) => p.id === productId);
    if (!item) return;

    const existing = cart.find((i) => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    updateCartUI();

    // Feedback visual en el botón del carrito
    if (cartCounter) {
      cartCounter.classList.add("scale-125");
      setTimeout(() => cartCounter.classList.remove("scale-125"), 200);
    }
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

    const mobileCartCounter = document.getElementById("demo-cart-count-mobile");

    if (cartCounter) {
      cartCounter.innerText = totalCount;
      cartCounter.style.display = totalCount > 0 ? "flex" : "none";
    }

    if (mobileCartCounter) {
      mobileCartCounter.innerText = totalCount;
      mobileCartCounter.style.display = totalCount > 0 ? "flex" : "none";
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.innerText = `$${subtotal.toLocaleString("es-AR")} ARS`;
    }

    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="text-center py-8 text-slate-500">
            <i class="fa-solid fa-basket-shopping text-3xl mb-2"></i>
            <p class="text-xs font-mono">El carrito está vacío</p>
          </div>
        `;
      } else {
        cartItemsList.innerHTML = cart
          .map(
            (item) => `
          <div class="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
            <div class="flex-1 pr-2">
              <p class="font-medium text-slate-200 line-clamp-1">${item.name}</p>
              <p class="text-slate-400 font-mono text-[11px]">$${item.price.toLocaleString("es-AR")} x ${item.qty}</p>
            </div>
            <div class="flex items-center gap-1.5 font-mono">
              <button class="cart-qty-btn px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700" data-id="${item.id}" data-action="dec">-</button>
              <span class="w-4 text-center">${item.qty}</span>
              <button class="cart-qty-btn px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700" data-id="${item.id}" data-action="inc">+</button>
            </div>
          </div>
        `
          )
          .join("");

        // Qty listeners
        cartItemsList.querySelectorAll(".cart-qty-btn").forEach((b) => {
          b.addEventListener("click", () => {
            const id = parseInt(b.getAttribute("data-id"));
            const action = b.getAttribute("data-action");
            const item = cart.find((i) => i.id === id);
            if (item) {
              if (action === "inc") item.qty++;
              else if (action === "dec") {
                item.qty--;
                if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
              }
              updateCartUI();
            }
          });
        });
      }
    }
  }

  // Modales
  const openCartBtnMobile = document.getElementById("demo-open-cart-btn-mobile");
  if (openCartBtn && cartModal) {
    openCartBtn.addEventListener("click", () => {
      cartModal.classList.remove("hidden");
      cartModal.classList.add("flex");
    });
  }
  if (openCartBtnMobile && cartModal) {
    openCartBtnMobile.addEventListener("click", () => {
      cartModal.classList.remove("hidden");
      cartModal.classList.add("flex");
    });
  }

  if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener("click", () => {
      cartModal.classList.add("hidden");
      cartModal.classList.remove("flex");
    });
  }

  // Generar mensaje de pedido de WhatsApp
  function generateWhatsAppOrder() {
    if (cart.length === 0) {
      alert("Agregá al menos un producto al carrito para probar el checkout.");
      return;
    }

    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const lines = cart.map((i) => `• ${i.qty}x ${i.name} ($${(i.price * i.qty).toLocaleString("es-AR")})`).join("\n");

    const message = `👋 *¡Hola! Quiero hacer el siguiente pedido desde la web:*\n\n🛒 *DETALLE DE COMPRA:*\n${lines}\n\n💰 *TOTAL:* $${total.toLocaleString("es-AR")} ARS\n🚚 *Envío:* A convenir\n👤 *Cliente:* Demo Showcase\n\n¿Me confirman disponibilidad y medios de pago? ¡Gracias!`;

    if (waMessageText) {
      waMessageText.innerText = message;
    }

    if (waRealSendBtn) {
      waRealSendBtn.href = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    // Cerrar carrito y abrir modal de WhatsApp
    if (cartModal) {
      cartModal.classList.add("hidden");
      cartModal.classList.remove("flex");
    }
    if (waModal) {
      waModal.classList.remove("hidden");
      waModal.classList.add("flex");
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", generateWhatsAppOrder);
  }

  if (closeWaModal && waModal) {
    closeWaModal.addEventListener("click", () => {
      waModal.classList.add("hidden");
      waModal.classList.remove("flex");
    });
  }

  // Pestañas de la vista (Desktop / Mobile / Flujo WhatsApp)
  const tabViewDesktop = document.getElementById("demo-tab-desktop");
  const tabViewMobile = document.getElementById("demo-tab-mobile");
  const tabViewFlow = document.getElementById("demo-tab-flow");
  const demoFrame = document.getElementById("demo-device-frame");
  const demoFlowInfo = document.getElementById("demo-flow-info");

  function setDemoView(view) {
    if (!demoFrame) return;

    if (tabViewDesktop) tabViewDesktop.classList.remove("tab-active");
    if (tabViewMobile) tabViewMobile.classList.remove("tab-active");
    if (tabViewFlow) tabViewFlow.classList.remove("tab-active");

    if (view === "desktop") {
      if (tabViewDesktop) tabViewDesktop.classList.add("tab-active");
      demoFrame.classList.remove("hidden", "mobile-phone-frame");
      demoFrame.style.maxWidth = "100%";
      if (demoFlowInfo) demoFlowInfo.classList.add("hidden");
    } else if (view === "mobile") {
      if (tabViewMobile) tabViewMobile.classList.add("tab-active");
      demoFrame.classList.remove("hidden");
      demoFrame.classList.add("mobile-phone-frame");
      demoFrame.style.maxWidth = "395px";
      if (demoFlowInfo) demoFlowInfo.classList.add("hidden");
    } else if (view === "flow") {
      if (tabViewFlow) tabViewFlow.classList.add("tab-active");
      demoFrame.classList.add("hidden");
      if (demoFlowInfo) demoFlowInfo.classList.remove("hidden");
    }
  }

  if (tabViewDesktop) {
    tabViewDesktop.addEventListener("click", () => setDemoView("desktop"));
  }
  if (tabViewMobile) {
    tabViewMobile.addEventListener("click", () => setDemoView("mobile"));
  }
  if (tabViewFlow) {
    tabViewFlow.addEventListener("click", () => setDemoView("flow"));
  }
}

/* =========================================================================
   7. FILTRO Y BOTONES DE LOS 6 PLANES COMERCIALES
   ========================================================================= */
function initPlansFilter() {
  const filterBtns = document.querySelectorAll(".plan-filter-btn");
  const planCards = document.querySelectorAll(".plan-card-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("bg-cyan-500", "text-slate-950", "font-bold");
        b.classList.add("bg-slate-900/60", "text-slate-400");
      });
      btn.classList.add("bg-cyan-500", "text-slate-950", "font-bold");
      btn.classList.remove("bg-slate-900/60", "text-slate-400");

      const category = btn.getAttribute("data-category");

      planCards.forEach((card) => {
        const itemCategory = card.getAttribute("data-plan-type");
        if (category === "todos" || itemCategory.includes(category)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initPlanButtons() {
  document.querySelectorAll(".btn-hire-plan").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const planName = btn.getAttribute("data-plan-name");
      const planPrice = btn.getAttribute("data-plan-price");
      const message = `Hola! Vi tu web comercial y me interesa contratar el *${planName}* (${planPrice}). Quisiera consultar detalles de inicio y disponibilidad.`;
      const url = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });
}

/* =========================================================================
   8. TERMINAL EDUCATIVA: DOMINIOS, NIC AR Y MANTENIMIENTO
   ========================================================================= */
function initEducationalTerminal() {
  const tabs = document.querySelectorAll(".term-tab-btn");
  const contentEl = document.getElementById("term-body-content");

  const terminalData = {
    nic: `
<span class="syn-comment"># Consulta de Registración de Dominio Oficial</span>
<span class="syn-keyword">$</span> whois tu-marca<span class="syn-string">.com.ar</span> --registrador nic.gob.ar

<span class="syn-var">NIC ARGENTINA:</span> Regula los dominios terminados en .com.ar
<span class="syn-fn">[1] Requisitos:</span> Se registra con tu CUIT/CUIL y Clave Fiscal Nivel 2 o superior.
<span class="syn-fn">[2] Costo Anual:</span> Aprox. <span class="syn-num">$8.500 a $12.000 ARS/año</span> (arancel oficial estatal).
<span class="syn-fn">[3] Dominios .COM:</span> Internacionales vía Namecheap/GoDaddy aprox. <span class="syn-num">$15.000 a $30.000 ARS/año</span>.

<span class="text-emerald-400 font-bold">✔ REGLA DE ORO DE TRANSPARENCIA:</span>
<span class="text-slate-300">Yo te asesoro y te acompaño paso a paso para que el dominio quede <span class="text-cyan-300 font-bold">100% A TU NOMBRE</span>. De esa forma, vos sos el único dueño legítimo de tu marca en internet y nunca dependés de terceros para renovarlo o transferirlo.</span>
    `,
    mantenimiento: `
<span class="syn-comment"># Estado del Servicio de Mantenimiento Integral ($30.000 ARS/mes)</span>
<span class="syn-keyword">$</span> systemctl status web-maintenance.service --verbose

<span class="text-emerald-400">● web-maintenance.service - Mantenimiento Preventivo & Correctivo</span>
   Loaded: loaded (/etc/systemd/system/web-maintenance.service)
   Active: <span class="text-emerald-400 font-bold">active (running)</span> since 24/7 uptime monitoring

<span class="syn-var">BENEFICIOS INCLUIDOS:</span>
<span class="syn-fn">├── Backups Semanales:</span> Copias automáticas completas en servidor redundante en la nube.
<span class="syn-fn">├── Seguridad & SSL:</span> Renovación continua de certificados HTTPS y monitoreo antispam.
<span class="syn-fn">├── Soporte Directo:</span> Canal de WhatsApp prioritario para resolver cualquier consulta en el día.
<span class="syn-fn">└── Bolsa de Cambios:</span> Actualización mensual de fotos, nuevos productos, promos y lista de precios sin costo extra.
    `,
    hosting: `
<span class="syn-comment"># Diagnóstico de Infraestructura y Servidor</span>
<span class="syn-keyword">$</span> curl -I https://tu-sitio.com.ar/speed-test

HTTP/2 <span class="text-emerald-400 font-bold">200 OK</span>
<span class="syn-fn">server:</span> Cloudflare Edge / LiteSpeed NVMe Server
<span class="syn-fn">ttfb-latency:</span> <span class="syn-num">38ms</span> (Respuesta instantánea para Argentina)
<span class="syn-fn">ssl-status:</span> TLS 1.3 Let's Encrypt Wildcard 256-bit Valid
<span class="syn-fn">uptime-guarantee:</span> 99.9% SLA

<span class="text-cyan-300">Nota técnica:</span> Alojo cada proyecto en servidores con discos NVMe de alta velocidad y CDN distribuido para que tu tienda cargue en menos de 1 segundo incluso con redes 4G móviles.
    `
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");
      const key = tab.getAttribute("data-term");
      if (contentEl && terminalData[key]) {
        contentEl.innerHTML = terminalData[key].trim();
      }
    });
  });
}

/* =========================================================================
   9. FORMULARIO DE CONTACTO (WHATSAPP O EMAIL)
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const business = document.getElementById("form-business").value.trim();
    const plan = document.getElementById("form-plan").value;
    const message = document.getElementById("form-message").value.trim();
    const channel = document.querySelector('input[name="contact-channel"]:checked')?.value || "whatsapp";

    if (!name) {
      alert("Por favor ingresá tu nombre o el de tu negocio.");
      return;
    }

    const compiledMessage = `👋 *Consulta desde la Web Comercial:*\n\n` +
      `👤 *Nombre / Negocio:* ${name}\n` +
      `📱 *Rubro o Instagram:* ${business || "No especificado"}\n` +
      `💼 *Plan de interés:* ${plan}\n` +
      `📝 *Detalles del proyecto:* ${message || "Quisiera coordinar una propuesta personalizada."}`;

    if (channel === "whatsapp") {
      const waUrl = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(compiledMessage)}`;
      window.open(waUrl, "_blank");
    } else {
      const mailtoSubject = encodeURIComponent(`Consulta Desarrollo Web: ${plan} - ${name}`);
      const mailtoBody = encodeURIComponent(compiledMessage);
      window.location.href = `mailto:${CONTACTO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }
  });
}

/* =========================================================================
   10. BOTONES FLOTANTES DE ACCESO RÁPIDO
   ========================================================================= */
function initFloatingButtons() {
  const waFloat = document.getElementById("floating-wa-btn");
  const emailFloat = document.getElementById("floating-email-btn");

  if (waFloat) {
    waFloat.href = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent("Hola! Estoy viendo tu web y me gustaría hacerte una consulta sobre un desarrollo web...")}`;
  }

  if (emailFloat) {
    emailFloat.href = `mailto:${CONTACTO.email}?subject=${encodeURIComponent("Consulta por Servicios de Desarrollo Web")}`;
  }
}

/* =========================================================================
   11. SCROLL SUAVE PARA LINKS DE NAVEGACIÓN
   ========================================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/* =========================================================================
   12. SCROLL REVEAL CON INTERSECTION OBSERVER
   ========================================================================= */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  elements.forEach((el) => observer.observe(el));
}

