// Minimal navigation behavior for small screens
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
    });
  });
});

