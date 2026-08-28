const menuButton = document.querySelector("#menu-toggle");
const menuIcon = menuButton?.querySelector("i");
const navigation = document.querySelector("#main-navigation");
const navigationLinks = document.querySelectorAll(".navbar a");
const year = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function closeMenu() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  menuIcon?.classList.replace("bx-x", "bx-menu");
}

menuButton?.addEventListener("click", () => {
  const willOpen = !navigation?.classList.contains("open");
  navigation?.classList.toggle("open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  menuIcon?.classList.toggle("bx-menu", !willOpen);
  menuIcon?.classList.toggle("bx-x", willOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { closeMenu(); menuButton?.focus(); }
});
document.addEventListener("click", (event) => {
  if (!navigation?.classList.contains("open")) return;
  if (!navigation.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

if (year) year.textContent = new Date().getFullYear();


contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const lines = [
    "Olá, Fabrizio! Vim pelo seu portfólio.",
    "",
    `Nome: ${data.get("name")}`,
    `E-mail: ${data.get("email")}`,
    data.get("phone") ? `Telefone: ${data.get("phone")}` : "",
    `Assunto: ${data.get("subject")}`,
    "",
    `Mensagem: ${data.get("message")}`
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/5594996624957?text=${encodeURIComponent(lines.join("\n"))}`;
  if (formStatus) formStatus.textContent = "Abrindo o WhatsApp com sua mensagem...";
  const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  if (whatsappWindow) whatsappWindow.opener = null;
});
