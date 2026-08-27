import { CAMPAIGN, COMMERCIAL, GALLERY, TRACKING, UNIT_TYPES, WHATSAPP_NUMBER } from "./config/site-config.js";

const query = new URLSearchParams(window.location.search);
const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
  .map((key) => [key, query.get(key)])
  .filter(([, value]) => value);

function getWhatsAppUrl(eventName) {
  const messageParts = [CAMPAIGN.whatsappMessage];
  if (utm.length) {
    messageParts.push("");
    messageParts.push("Origem da campanha:");
    utm.forEach(([key, value]) => messageParts.push(`${key}: ${value}`));
  }
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(messageParts.join("\n"));
  const base = cleanNumber ? `https://wa.me/${cleanNumber}` : "https://wa.me/INSERIR_NUMERO_AQUI";
  return `${base}?text=${encodedMessage}&event=${encodeURIComponent(eventName)}`;
}

function trackEvent(eventName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, source: "mac_pinheiros_landing" });
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, { event_category: "whatsapp", event_label: "MAC Pinheiros" });
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character]);
}

function wireWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-event]").forEach((link) => {
    const eventName = link.dataset.whatsappEvent || "whatsapp_click";
    link.href = getWhatsAppUrl(eventName);
    link.addEventListener("click", () => trackEvent(eventName));
  });
}

function renderUnits() {
  const target = document.querySelector("[data-units]");
  target.innerHTML = UNIT_TYPES.map((unit) => `
    <article class="unit-card">
      <div class="unit-copy">
        <p class="eyebrow">${escapeHtml(unit.title)}</p>
        <h3>${escapeHtml(unit.subtitle)}</h3>
        <p class="unit-price">${escapeHtml(unit.price)}</p>
        <p class="muted">${escapeHtml(unit.area)}</p>
        <ul>${unit.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <a class="button button-dark" data-whatsapp-event="whatsapp_units_click" href="#">Consultar unidades disponíveis</a>
      </div>
      <button class="plan-preview" type="button" data-lightbox-src="${escapeHtml(unit.planImage)}" data-lightbox-alt="Planta ${escapeHtml(unit.title)}">
        <img src="${escapeHtml(unit.planImage)}" alt="Planta oficial ${escapeHtml(unit.title)} MAC Pinheiros" loading="lazy" width="1600" height="1132">
        <span>Ampliar planta</span>
      </button>
    </article>
  `).join("");
}

function renderGallery() {
  const target = document.querySelector("[data-gallery]");
  target.innerHTML = GALLERY.map(([label, src], index) => `
    <button class="gallery-item" type="button" data-lightbox-src="${escapeHtml(src)}" data-lightbox-alt="${escapeHtml(label)}">
      <img src="${escapeHtml(src)}" alt="Perspectiva artística - ${escapeHtml(label)} do MAC Pinheiros" loading="${index < 2 ? "eager" : "lazy"}">
      <span>${escapeHtml(label)}</span>
    </button>
  `).join("");
}

function wireLightbox() {
  const dialog = document.querySelector("[data-lightbox]");
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (!trigger) return;
    image.src = trigger.dataset.lightboxSrc;
    image.alt = trigger.dataset.lightboxAlt;
    caption.textContent = trigger.dataset.lightboxAlt;
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-close-lightbox]")) {
      dialog.close();
    }
  });
}

function injectTrackingPlaceholders() {
  window.MAC_PINHEIROS_TRACKING = TRACKING;
  window.MAC_PINHEIROS_COMMERCIAL = COMMERCIAL;
}

renderUnits();
renderGallery();
wireWhatsAppLinks();
wireLightbox();
injectTrackingPlaceholders();
