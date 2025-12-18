// Menú Hamburguesa
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuIcon.classList.toggle("bx-x");
});

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });
});

// Modo Oscuro
const darkModeIcon = document.querySelector("#darkMode-icon");
const body = document.body;

// Verificar si hay una preferencia guardada al cargar
const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  body.classList.add("dark-mode");
  darkModeIcon.classList.replace("bx-moon", "bx-sun");
}

darkModeIcon.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeIcon.classList.replace("bx-moon", "bx-sun");
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeIcon.classList.replace("bx-sun", "bx-moon");
    localStorage.setItem("darkMode", null);
  }
});

// Scroll activo en navbar
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
