// ==========================================================================
// 1. MENÚ HAMBURGUESA Y NAVEGACIÓN MÓVIL
// ==========================================================================
const menuBtn = document.querySelector("#menu-icon");
const menuIconElement = menuBtn ? menuBtn.querySelector("i") : null;
const navbar = document.querySelector("#navbar");
const navLinks = document.querySelectorAll(".navbar a");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    if (menuIconElement) {
      menuIconElement.classList.toggle("bx-x");
      menuIconElement.classList.toggle("bx-menu");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    if (menuIconElement) {
      menuIconElement.classList.remove("bx-x");
      menuIconElement.classList.add("bx-menu");
    }
  });
});

// ==========================================================================
// 2. MODO OSCURO / CLARO CON PERSISTENCIA
// ==========================================================================
const darkModeBtn = document.querySelector("#darkMode-icon");
const darkModeIcon = darkModeBtn ? darkModeBtn.querySelector("i") : null;
const body = document.body;

const savedTheme = localStorage.getItem("darkMode");

function applyTheme(isDark) {
  if (isDark) {
    body.classList.add("dark-mode");
    if (darkModeIcon) {
      darkModeIcon.classList.remove("bx-moon");
      darkModeIcon.classList.add("bx-sun");
    }
  } else {
    body.classList.remove("dark-mode");
    if (darkModeIcon) {
      darkModeIcon.classList.remove("bx-sun");
      darkModeIcon.classList.add("bx-moon");
    }
  }
}

// Por defecto usamos dark-mode a menos que el usuario haya elegido modo claro ("disabled")
if (savedTheme === "disabled") {
  applyTheme(false);
} else {
  applyTheme(true);
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    const isNowDark = !body.classList.contains("dark-mode");
    applyTheme(isNowDark);
    localStorage.setItem("darkMode", isNowDark ? "enabled" : "disabled");
  });
}

// ==========================================================================
// 3. HEADER SCROLL & ENLACE ACTIVO EN NAVBAR
// ==========================================================================
const header = document.querySelector("#header");
const sections = document.querySelectorAll("section[id]");

function handleScroll() {
  const scrollY = window.scrollY;

  if (header) {
    header.classList.toggle("scrolled", scrollY > 30);
  }

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 160;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ==========================================================================
// 4. EFECTO TYPEWRITER EN EL HERO
// ==========================================================================
const typedRoleEl = document.querySelector("#typed-role");
const roles = [
  "Desarrollador Web Frontend",
  "Especialista en React & UI",
  "Desarrollador JavaScript & TS",
  "Creador de Experiencias Web",
];

if (typedRoleEl) {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      typedRoleEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typedRoleEl.textContent = currentRole.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2400; // Pausa al terminar de escribir
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(typeEffect, speed);
  }

  setTimeout(typeEffect, 2400);
}

// ==========================================================================
// 5. FILTRADO INTERACTIVO DE PORTAFOLIO
// ==========================================================================
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portafolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const categories = item.getAttribute("data-category") || "";
      const shouldShow =
        filterValue === "all" || categories.includes(filterValue);

      if (shouldShow) {
        item.classList.remove("hidden-card");
        requestAnimationFrame(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
      } else {
        item.classList.add("hidden-card");
      }
    });
  });
});

// ==========================================================================
// 6. ANIMACIONES SCROLL REVEAL (INTERSECTION OBSERVER)
// ==========================================================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ==========================================================================
// 7. COPIAR CORREO Y CREDENCIALES CON TOAST NOTIFICATION
// ==========================================================================
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");
let toastTimeout;

function showToast(message) {
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

const copyEmailCard = document.querySelector("#copy-email-card");
const emailText = document.querySelector("#email-text");

if (copyEmailCard && emailText) {
  const copyEmail = () => {
    const email = emailText.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Correo copiado: ${email}`);
    });
  };

  copyEmailCard.addEventListener("click", copyEmail);
  copyEmailCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyEmail();
    }
  });
}

// Copiar credenciales demo al hacer click en los <code>
document.querySelectorAll(".demo-credentials code").forEach((codeEl) => {
  codeEl.style.cursor = "pointer";
  codeEl.title = "Click para copiar";
  codeEl.addEventListener("click", () => {
    const text = codeEl.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copiado: ${text}`);
    });
  });
});
