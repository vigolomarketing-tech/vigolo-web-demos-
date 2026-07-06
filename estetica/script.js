/* Lumière · Estética & Belleza — demo interactions · Vigolo Web Studio */

const WHATSAPP_NUMBER = "5491128074105";
const DEFAULT_WHATSAPP_MESSAGE = "Hola Santiago, vi la demo de estética y quiero información para tener una web similar para mi negocio.";
const DEMO_CLIENT_NAME = "Clienta Demo";

const testimonials = [
  {
    name: "Camila Rossi",
    role: "Ritual facial premium",
    text: "Un lugar hermoso y una atención impecable. Salí con la piel renovada y súper relajada. Reservar por WhatsApp fue facilísimo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Valentina Díaz",
    role: "Depilación definitiva",
    text: "Profesionales de verdad. Me explicaron todo el tratamiento y los resultados se ven desde la primera sesión. Recomiendo 100%.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Florencia Gómez",
    role: "Día de spa",
    text: "Me regalaron un día de spa y fue un sueño. El ambiente, los aromas, el trato… todo pensado al detalle. Ya reservé de nuevo.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=78"
  }
];

const bookingDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const pros = ["Sofía", "Martina", "Antonella"];
const services = ["Limpieza facial profunda", "Ritual facial premium", "Tratamiento corporal", "Depilación definitiva", "Lifting de pestañas", "Día de spa"];

const baseTimes = ["09:00", "10:30", "12:00", "14:00", "15:30", "16:30", "18:00"];
function slotsFor(service, pro, day) {
  const seed = (service.length + pro.length + day.length) % 4;
  return baseTimes
    .filter((_, i) => (i + seed) % 6 !== 0)
    .map((time, i) => ({ time, spots: ((i * 2 + seed + 1) % 4) + 1 }));
}

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

function buildWhatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || DEFAULT_WHATSAPP_MESSAGE)}`;
}

function bindWhatsappLinks() {
  $$(".js-whatsapp").forEach((link) => {
    link.href = buildWhatsappUrl(link.dataset.message);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function initHeader() {
  const header = $("[data-header]");
  const nav = $("#siteNav");
  const toggle = $(".nav-toggle");
  if (!header) return;
  const setState = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  setState();
  window.addEventListener("scroll", setState, { passive: true });
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#siteNav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => obs.observe(i));
}

function formatSpots(spots) {
  if (spots === 1) return "Último turno";
  if (spots <= 2) return `Últimos ${spots} turnos`;
  return `${spots} turnos libres`;
}

function currentSlots() {
  return slotsFor($("#serviceSelect").value, $("#proSelect").value, $("#daySelect").value);
}

function selectedBooking() {
  const service = $("#serviceSelect").value;
  const pro = $("#proSelect").value;
  const day = $("#daySelect").value;
  const time = $("#timeSelect").value;
  const slots = currentSlots();
  const slot = slots.find((s) => s.time === time) || slots[0];
  return { service, pro, day, time: slot.time, spots: slot.spots };
}

function updateTimeOptions() {
  const timeSelect = $("#timeSelect");
  const slots = currentSlots();
  timeSelect.innerHTML = slots.map((s) => `<option value="${s.time}">${s.time} · ${formatSpots(s.spots)}</option>`).join("");
  updateAvailability();
}

function updateAvailability() {
  const sel = selectedBooking();
  const box = $("#classAvailability");
  const limited = sel.spots <= 2;
  box.innerHTML = `
    <div class="availability-card${limited ? " accent" : ""}"><span>Disponibilidad</span><strong>${formatSpots(sel.spots)}</strong></div>
    <div class="availability-card"><span>Profesional</span><strong>${sel.pro}</strong></div>
    <div class="availability-card"><span>Cuándo</span><strong>${sel.day} ${sel.time}</strong></div>
  `;
}

function buildQrPayload({ service, pro, day, time }) {
  return [`Clienta: ${DEMO_CLIENT_NAME}`, `Tratamiento: ${service}`, `Profesional: ${pro}`, `Día: ${day}`, `Hora: ${time}`, "Estado: Turno confirmado"].join(" | ");
}

function generateQr(payload) {
  const container = $("#accessQr");
  if (!container) return;
  container.innerHTML = "";
  if (window.QRCode) {
    new QRCode(container, { text: payload, width: 120, height: 120, colorDark: "#3c302c", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
    return;
  }
  const fallback = document.createElement("div");
  fallback.style.cssText = "display:grid;grid-template-columns:repeat(9,1fr);gap:3px;width:100%;height:100%;";
  [...Array(81)].forEach((_, i) => {
    const cell = document.createElement("span");
    cell.style.background = (i * 7 + payload.length * 5) % 4 === 0 ? "#ffffff" : "#3c302c";
    fallback.appendChild(cell);
  });
  container.appendChild(fallback);
}

function initBooking() {
  const form = $("#bookingForm");
  if (!form) return;
  $("#serviceSelect").innerHTML = services.map((s) => `<option value="${s}">${s}</option>`).join("");
  $("#proSelect").innerHTML = pros.map((p) => `<option value="${p}">${p}</option>`).join("");
  $("#daySelect").innerHTML = bookingDays.map((d) => `<option value="${d}">${d}</option>`).join("");
  $("#serviceSelect").value = "Ritual facial premium";
  $("#proSelect").value = "Sofía";
  $("#daySelect").value = "Lunes";

  ["#serviceSelect", "#proSelect", "#daySelect"].forEach((sel) => $(sel).addEventListener("change", updateTimeOptions));
  $("#timeSelect").addEventListener("change", updateAvailability);
  updateTimeOptions();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sel = selectedBooking();
    $("#confirmationEmpty").hidden = true;
    $("#confirmationReady").hidden = false;
    $("#confirmedService").textContent = sel.service;
    $("#summaryService").textContent = sel.service;
    $("#summaryPro").textContent = sel.pro;
    $("#summaryDay").textContent = sel.day;
    $("#summaryTime").textContent = sel.time;
    generateQr(buildQrPayload(sel));
    const msg = `Hola! Quiero reservar un turno. Tratamiento: ${sel.service}, Profesional: ${sel.pro}, ${sel.day} a las ${sel.time}. ¿Me confirman?`;
    $("#confirmWhatsapp").href = buildWhatsappUrl(msg);
    $("#bookingConfirmation").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function initTestimonials() {
  const carousel = $("#testimonialCarousel");
  const dotsWrap = $("#testimonialDots");
  if (!carousel) return;
  let index = 0;
  let timer;

  const render = () => {
    const t = testimonials[index];
    carousel.innerHTML = `
      <article class="testimonial-card">
        <img src="${t.image}" alt="Foto de ${t.name}" loading="lazy">
        <div>
          <div class="stars" aria-label="5 estrellas">★★★★★</div>
          <blockquote>“${t.text}”</blockquote>
          <cite>${t.name} · ${t.role}</cite>
        </div>
      </article>`;
    $$("#testimonialDots button").forEach((d, i) => d.classList.toggle("active", i === index));
  };

  dotsWrap.innerHTML = testimonials.map((_, i) => `<button type="button" role="tab" aria-label="Opinión ${i + 1}"></button>`).join("");
  const go = (i) => { index = (i + testimonials.length) % testimonials.length; render(); restart(); };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 5200); };
  $$("#testimonialDots button").forEach((d, i) => d.addEventListener("click", () => go(i)));
  render();
  restart();
}

function initGallery() {
  const lightbox = $("#lightbox");
  const image = $("#lightbox img");
  const close = $(".lightbox-close");
  if (!lightbox) return;
  $$("#galleryGrid button").forEach((btn) => btn.addEventListener("click", () => {
    image.src = btn.dataset.image;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }));
  const closeLightbox = () => { lightbox.hidden = true; image.src = ""; document.body.style.overflow = ""; };
  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
}

function initFaq() {
  $$("#faqList details").forEach((d) => d.addEventListener("toggle", () => {
    if (!d.open) return;
    $$("#faqList details").forEach((o) => { if (o !== d) o.open = false; });
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
  bindWhatsappLinks();
  initHeader();
  initReveal();
  initBooking();
  initTestimonials();
  initGallery();
  initFaq();
});
