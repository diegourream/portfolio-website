const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".main-nav a, .site-footer nav a")];
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuToggle || !nav) return;
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
}

function toggleMenu() {
  if (!menuToggle || !nav) return;
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
}

menuToggle?.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const activeLinks = [...document.querySelectorAll(".main-nav a")];
const currentPage = document.body.dataset.page;

if (currentPage) {
  activeLinks.forEach((link) => {
    const isCurrent = link.dataset.pageLink === currentPage;
    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const sections = activeLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      activeLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.12, 0.3, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const nombre = String(formData.get("nombre") || "").trim();
  const empresa = String(formData.get("empresa") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const telefono = String(formData.get("telefono") || "").trim();
  const flota = String(formData.get("flota") || "").trim();
  const servicio = String(formData.get("servicio") || "").trim();
  const mensaje = String(formData.get("mensaje") || "").trim();

  const firstName = nombre.split(" ")[0] || "Gracias";

  if (formStatus) {
    formStatus.textContent = `¡Gracias, ${firstName}! Redirigiendo a WhatsApp...`;
    formStatus.style.color = "var(--gold-2)";
  }

  const serviceNames = {
    'sancionatorios': 'Procesos Sancionatorios y Medios de Control',
    'defensa-via': 'Defensa en Vía y Tránsito',
    'seguridad-vial': 'Seguridad Vial y PESV'
  };
  const serviceLabel = serviceNames[servicio] || servicio;

  const waText = `Hola LexTransport, deseo iniciar un diagnóstico preventivo para mi empresa.\n\n` +
    `- Nombre: ${nombre}\n` +
    `- Empresa: ${empresa}\n` +
    `- Teléfono: ${telefono}\n` +
    `- Correo: ${email}\n` +
    `- Tipo de Flota: ${flota || "No especificada"}\n` +
    `- Servicio de interés: ${serviceLabel}\n\n` +
    `Detalles: ${mensaje || "Sin detalles adicionales"}`;

  const waUrl = `https://wa.me/573242602698?text=${encodeURIComponent(waText)}`;

  setTimeout(() => {
    window.open(waUrl, "_blank");
    contactForm.reset();
    if (formStatus) {
      formStatus.textContent = "Solicitud procesada correctamente.";
    }
  }, 1500);
});

// Dynamic Scroll Reveal Engine
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll("section:not(.hero), .service-card, .detail-card, .news-card, .stacked-list article, .risk-grid article, .operations-grid, .timeline article, .pillar");
  
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -80px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
});

// Callback Modal Handler (Te llamamos)
document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll("[data-callback-trigger]");
  const modalCloseElements = document.querySelectorAll("[data-callback-close]");
  const callbackModal = document.getElementById("callbackModal");
  const callbackForm = document.querySelector("[data-callback-form]");
  const callbackSuccess = document.querySelector(".callback-success-message");

  if (callbackModal) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        callbackModal.classList.add("is-active");
        document.body.classList.add("menu-open");
        if (callbackForm) callbackForm.style.display = "grid";
        if (callbackSuccess) callbackSuccess.style.display = "none";
      });
    });

    modalCloseElements.forEach((closeEl) => {
      closeEl.addEventListener("click", () => {
        callbackModal.classList.remove("is-active");
        document.body.classList.remove("menu-open");
      });
    });

    callbackForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!callbackForm.checkValidity()) {
        callbackForm.reportValidity();
        return;
      }
      const formData = new FormData(callbackForm);
      const telefono = String(formData.get("telefono") || "").trim();

      if (callbackForm) callbackForm.style.display = "none";
      if (callbackSuccess) {
        callbackSuccess.style.display = "block";
        const titleEl = callbackSuccess.querySelector("h4");
        const descEl = callbackSuccess.querySelector("p");
        if (titleEl) titleEl.textContent = "¡Conectando!";
        if (descEl) descEl.textContent = "Redirigiendo a WhatsApp para solicitar tu llamada...";
      }

      const waText = `Hola, solicito una llamada telefónica urgente. Mi número de contacto es: ${telefono}`;
      const waUrl = `https://wa.me/573242602698?text=${encodeURIComponent(waText)}`;

      setTimeout(() => {
        window.open(waUrl, "_blank");
        callbackModal.classList.remove("is-active");
        document.body.classList.remove("menu-open");
        callbackForm.reset();
      }, 1500);
    });
  }

  // Segmenter Tabs Handler
  const tabs = document.querySelectorAll("[data-tab-target]");
  const contents = document.querySelectorAll(".segmenter-content");
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));
      
      tab.classList.add("active");
      const target = document.getElementById(`tab-${tab.dataset.tabTarget}`);
      if (target) target.classList.add("active");
    });
  });

  // Mobile Dropdown Toggle Handler
  const dropdownTrigger = document.querySelector(".nav-dropdown-trigger");
  const dropdownWrapper = document.querySelector(".nav-dropdown-wrapper");
  
  if (dropdownTrigger && dropdownWrapper) {
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        dropdownWrapper.classList.toggle("is-active");
      }
    });
  }

  // 1. Dynamic Scroll Progress Bar (Injected dynamically)
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-indicator";
  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.height = "3px";
  progressBar.style.background = "linear-gradient(90deg, var(--gold) 0%, var(--gold-2) 100%)";
  progressBar.style.zIndex = "9999";
  progressBar.style.width = "0%";
  progressBar.style.transition = "width 0.1s ease-out";
  document.body.appendChild(progressBar);
  
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    }
  });

  // 2. Dynamic Number Counter Up Animation
  const counters = document.querySelectorAll(".hero-metrics dt");
  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const rawText = target.textContent;
          const targetNum = parseInt(rawText.replace(/\D/g, ""), 10);
          const suffix = rawText.replace(/[0-9]/g, "");
          
          if (isNaN(targetNum)) return;
          
          let start = 0;
          const duration = 1600; // 1.6s
          const startTime = performance.now();
          
          function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * targetNum);
            
            target.textContent = current + suffix;
            
            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              target.textContent = rawText;
            }
          }
          
          requestAnimationFrame(updateNumber);
          countObserver.unobserve(target);
        }
      });
    }, { threshold: 0.2 });
    
    counters.forEach(counter => countObserver.observe(counter));
  }

  // 3. 3D Parallax Tilt Effect on Hero Collage Cards
  const cards = document.querySelectorAll(".collage-card");
  if (cards.length > 0 && window.innerWidth > 1024) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max 10 degrees rotation
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        const isOffsetUp = card.classList.contains("card-defensa") || card.classList.contains("card-capacitacion");
        const baseTranslate = isOffsetUp ? "translateY(-15px)" : "translateY(15px)";
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) ${baseTranslate}`;
      });
      
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
