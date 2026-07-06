/* Roble & Navaja Barbershop — demo interactions · Vigolo Web Studio */

const WHATSAPP_NUMBER = "5491128074105";
const DEFAULT_WHATSAPP_MESSAGE = "Hola Santiago, vi la demo de la barbería y quiero información para tener una web similar para mi negocio.";
const DEMO_CLIENT_NAME = "Cliente Demo";

const testimonials = [
  {
    name: "Martín Aguilar",
    role: "Cliente hace 3 años",
    text: "La mejor barbería a la que fui. Reservás online, no esperás y salís impecable. El afeitado a navaja es otro nivel.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Julián Ortiz",
    role: "Corte + Barba",
    text: "Tomás entiende exactamente lo que querés con solo mirarte. El lugar es un lujo y la atención impecable.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Rodrigo Paz",
    role: "Experiencia VIP",
    text: "Pedí la experiencia VIP para mi casamiento y fue un golazo. Toalla caliente, bebida y un resultado de revista.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=78"
  }
];

const bookingDays = ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const barbers = ["Tomás", "Nico", "Lucas"];

const services = ["Corte clásico", "Corte + Barba", "Afeitado a navaja", "Diseño de barba", "Corte junior", "Experiencia VIP"];

// Simple deterministic slot generator so every combination has availability
const baseTimes = ["10:00", "11:30", "13:00", "15:30", "17:00", "18:30", "20:00"];
function slotsFor(service, barber, day) {
  const seed = (service.length + barber.length + day.length) % 4;
  return baseTimes
    .filter((_, i) => (i + seed) % 5 !== 0)
    .map((time, i) => ({ time, spots: ((i * 3 + seed + 1) % 5) + 1 }));
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

/* ── Header ── */
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

/* ── Reveal ── */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => obs.observe(i));
}

/* ── Booking ── */
function formatSpots(spots) {
  if (spots === 1) return "Último lugar";
  if (spots <= 2) return `Últimos ${spots} lugares`;
  return `${spots} turnos libres`;
}

function currentSlots() {
  return slotsFor($("#serviceSelect").value, $("#barberSelect").value, $("#daySelect").value);
}

function selectedBooking() {
  const service = $("#serviceSelect").value;
  const barber = $("#barberSelect").value;
  const day = $("#daySelect").value;
  const time = $("#timeSelect").value;
  const slots = currentSlots();
  const slot = slots.find((s) => s.time === time) || slots[0];
  return { service, barber, day, time: slot.time, spots: slot.spots };
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
    <div class="availability-card"><span>Barbero</span><strong>${sel.barber}</strong></div>
    <div class="availability-card"><span>Cuándo</span><strong>${sel.day} ${sel.time}</strong></div>
  `;
}

function buildQrPayload({ service, barber, day, time }) {
  return [`Cliente: ${DEMO_CLIENT_NAME}`, `Servicio: ${service}`, `Barbero: ${barber}`, `Día: ${day}`, `Hora: ${time}`, "Estado: Turno confirmado"].join(" | ");
}

function generateQr(payload) {
  const container = $("#accessQr");
  if (!container) return;
  container.innerHTML = "";
  if (window.QRCode) {
    new QRCode(container, { text: payload, width: 120, height: 120, colorDark: "#0c0a07", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
    return;
  }
  const fallback = document.createElement("div");
  fallback.style.cssText = "display:grid;grid-template-columns:repeat(9,1fr);gap:3px;width:100%;height:100%;";
  [...Array(81)].forEach((_, i) => {
    const cell = document.createElement("span");
    cell.style.background = (i * 7 + payload.length * 5) % 4 === 0 ? "#ffffff" : "#0c0a07";
    fallback.appendChild(cell);
  });
  container.appendChild(fallback);
}

function initBooking() {
  const form = $("#bookingForm");
  if (!form) return;

  $("#serviceSelect").innerHTML = services.map((s) => `<option value="${s}">${s}</option>`).join("");
  $("#barberSelect").innerHTML = barbers.map((b) => `<option value="${b}">${b}</option>`).join("");
  $("#daySelect").innerHTML = bookingDays.map((d) => `<option value="${d}">${d}</option>`).join("");
  $("#serviceSelect").value = "Corte + Barba";
  $("#barberSelect").value = "Tomás";
  $("#daySelect").value = "Martes";

  ["#serviceSelect", "#barberSelect", "#daySelect"].forEach((sel) => $(sel).addEventListener("change", updateTimeOptions));
  $("#timeSelect").addEventListener("change", updateAvailability);
  updateTimeOptions();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sel = selectedBooking();
    $("#confirmationEmpty").hidden = true;
    $("#confirmationReady").hidden = false;
    $("#confirmedService").textContent = sel.service;
    $("#summaryService").textContent = sel.service;
    $("#summaryBarber").textContent = sel.barber;
    $("#summaryDay").textContent = sel.day;
    $("#summaryTime").textContent = sel.time;
    generateQr(buildQrPayload(sel));
    const msg = `Hola! Quiero reservar un turno. Servicio: ${sel.service}, Barbero: ${sel.barber}, ${sel.day} a las ${sel.time}. ¿Me confirman?`;
    $("#confirmWhatsapp").href = buildWhatsappUrl(msg);
    $("#bookingConfirmation").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

/* ── Testimonials ── */
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

  dotsWrap.innerHTML = testimonials.map((_, i) => `<button type="button" role="tab" aria-label="Reseña ${i + 1}"></button>`).join("");
  const go = (i) => { index = (i + testimonials.length) % testimonials.length; render(); restart(); };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 5200); };
  $$("#testimonialDots button").forEach((d, i) => d.addEventListener("click", () => go(i)));

  render();
  restart();
}

/* ── Gallery lightbox ── */
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

/* ── FAQ single-open ── */
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
