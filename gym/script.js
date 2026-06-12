const WHATSAPP_NUMBER = "5491128074105";
const DEFAULT_WHATSAPP_MESSAGE = "Hola Santiago, vi la demo del gimnasio y quiero información para tener una web similar para mi negocio.";
const DEMO_MEMBER_NAME = "Santiago Vigolo";

const testimonials = [
  {
    name: "Lucía Fernández",
    role: "Alumna Elite",
    text: "La web transmite un gimnasio serio y moderno. Entré por WhatsApp, consulté un plan y coordiné mi primera clase en minutos.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Nicolás Sosa",
    role: "Funcional",
    text: "Los planes se entienden rápido y las fotos muestran muy bien el ambiente. Da confianza antes de ir al lugar.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=78"
  },
  {
    name: "Paula Medina",
    role: "Personal Trainer",
    text: "La experiencia se siente premium. El contacto por WhatsApp está en el momento justo y no hay fricción para consultar.",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=500&q=78"
  }
];

const bookingDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const classSchedule = {
  "Musculación": {
    "Lunes": [{ time: "07:00", spots: 12 }, { time: "12:00", spots: 8 }, { time: "19:00", spots: 4 }],
    "Martes": [{ time: "08:00", spots: 10 }, { time: "13:00", spots: 6 }, { time: "20:00", spots: 2 }],
    "Miércoles": [{ time: "07:00", spots: 14 }, { time: "18:00", spots: 5 }, { time: "21:00", spots: 3 }],
    "Jueves": [{ time: "08:00", spots: 11 }, { time: "12:00", spots: 7 }, { time: "19:00", spots: 2 }],
    "Viernes": [{ time: "07:00", spots: 9 }, { time: "17:00", spots: 6 }, { time: "20:00", spots: 4 }],
    "Sábado": [{ time: "09:00", spots: 12 }, { time: "11:00", spots: 6 }, { time: "13:00", spots: 2 }]
  },
  "Funcional": {
    "Lunes": [{ time: "08:00", spots: 9 }, { time: "18:00", spots: 6 }, { time: "20:00", spots: 2 }],
    "Martes": [{ time: "09:00", spots: 7 }, { time: "19:00", spots: 4 }],
    "Miércoles": [{ time: "08:00", spots: 8 }, { time: "18:00", spots: 6 }, { time: "20:00", spots: 2 }],
    "Jueves": [{ time: "09:00", spots: 5 }, { time: "19:00", spots: 3 }],
    "Viernes": [{ time: "08:00", spots: 12 }, { time: "18:00", spots: 6 }, { time: "20:00", spots: 2 }],
    "Sábado": [{ time: "10:00", spots: 8 }, { time: "12:00", spots: 4 }]
  },
  "Cross Training": {
    "Lunes": [{ time: "07:00", spots: 6 }, { time: "19:00", spots: 2 }],
    "Martes": [{ time: "08:00", spots: 8 }, { time: "18:00", spots: 6 }, { time: "20:00", spots: 3 }],
    "Miércoles": [{ time: "07:00", spots: 5 }, { time: "19:00", spots: 2 }],
    "Jueves": [{ time: "08:00", spots: 7 }, { time: "18:00", spots: 6 }, { time: "20:00", spots: 2 }],
    "Viernes": [{ time: "07:00", spots: 4 }, { time: "19:00", spots: 3 }],
    "Sábado": [{ time: "09:00", spots: 10 }, { time: "11:00", spots: 6 }]
  },
  "Boxeo": {
    "Lunes": [{ time: "18:00", spots: 8 }, { time: "21:00", spots: 4 }],
    "Martes": [{ time: "19:00", spots: 6 }, { time: "20:30", spots: 2 }],
    "Miércoles": [{ time: "18:00", spots: 7 }, { time: "21:00", spots: 3 }],
    "Jueves": [{ time: "19:00", spots: 6 }, { time: "20:30", spots: 2 }],
    "Viernes": [{ time: "18:00", spots: 9 }, { time: "20:00", spots: 5 }],
    "Sábado": [{ time: "10:00", spots: 8 }, { time: "12:00", spots: 2 }]
  },
  "Spinning": {
    "Lunes": [{ time: "07:30", spots: 12 }, { time: "18:30", spots: 6 }, { time: "20:30", spots: 2 }],
    "Martes": [{ time: "08:30", spots: 10 }, { time: "19:30", spots: 5 }],
    "Miércoles": [{ time: "07:30", spots: 12 }, { time: "18:30", spots: 6 }, { time: "20:30", spots: 3 }],
    "Jueves": [{ time: "08:30", spots: 9 }, { time: "19:30", spots: 4 }],
    "Viernes": [{ time: "07:30", spots: 11 }, { time: "18:30", spots: 6 }, { time: "20:30", spots: 2 }],
    "Sábado": [{ time: "09:30", spots: 12 }, { time: "11:30", spots: 6 }]
  },
  "Personal Trainer": {
    "Lunes": [{ time: "07:00", spots: 2 }, { time: "13:00", spots: 1 }, { time: "18:00", spots: 2 }],
    "Martes": [{ time: "08:00", spots: 2 }, { time: "14:00", spots: 1 }, { time: "19:00", spots: 2 }],
    "Miércoles": [{ time: "07:00", spots: 2 }, { time: "13:00", spots: 1 }, { time: "18:00", spots: 2 }],
    "Jueves": [{ time: "08:00", spots: 2 }, { time: "14:00", spots: 1 }, { time: "19:00", spots: 2 }],
    "Viernes": [{ time: "07:00", spots: 2 }, { time: "15:00", spots: 1 }, { time: "18:00", spots: 2 }],
    "Sábado": [{ time: "09:00", spots: 2 }, { time: "12:00", spots: 1 }]
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function buildWhatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || DEFAULT_WHATSAPP_MESSAGE)}`;
}

function bindWhatsappLinks() {
  $$(".js-whatsapp").forEach((link) => {
    link.dataset.message = DEFAULT_WHATSAPP_MESSAGE;
    link.href = buildWhatsappUrl();
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function buildAccessPayload({ activity, day, time }) {
  return [
    `Nombre: ${DEMO_MEMBER_NAME}`,
    `Actividad: ${activity}`,
    `Día: ${day}`,
    `Horario: ${time}`,
    "Estado: Reserva confirmada"
  ].join(" | ");
}

function generateAccessQr(payload) {
  const container = $("#accessQr");
  if (!container) return;

  container.innerHTML = "";

  if (window.QRCode) {
    new QRCode(container, {
      text: payload,
      width: 120,
      height: 120,
      colorDark: "#0b0b0d",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    return;
  }

  const fallback = document.createElement("div");
  fallback.style.cssText = "display:grid;grid-template-columns:repeat(9,1fr);gap:3px;width:100%;height:100%;";

  [...Array(81)].forEach((_, index) => {
    const cell = document.createElement("span");
    cell.style.background = (index * 7 + payload.length * 5) % 4 === 0 ? "#ffffff" : "#0b0b0d";
    fallback.appendChild(cell);
  });

  container.appendChild(fallback);
}

function updateAccountPanel({ activity, day, time }) {
  $("#accountActivity").textContent = activity;
  $("#accountDay").textContent = day;
  $("#accountTime").textContent = time;
  $("#accountStatus").textContent = "Confirmado";
  $("#accountReservationBadge").textContent = "Confirmado";
}

function formatSpots(spots) {
  if (spots === 1) return "Último lugar";
  if (spots <= 2) return `Últimos ${spots} lugares`;
  return `${spots} cupos disponibles`;
}

function getSelectedBooking() {
  const activity = $("#activitySelect").value;
  const day = $("#daySelect").value;
  const time = $("#timeSelect").value;
  const slot = classSchedule[activity][day].find((item) => item.time === time) || classSchedule[activity][day][0];

  return { activity, day, time: slot.time, spots: slot.spots };
}

function updateTimeOptions() {
  const activity = $("#activitySelect").value;
  const day = $("#daySelect").value;
  const timeSelect = $("#timeSelect");
  const slots = classSchedule[activity][day];

  timeSelect.innerHTML = slots
    .map((slot) => `<option value="${slot.time}">${slot.time} · ${formatSpots(slot.spots)}</option>`)
    .join("");

  updateAvailability();
}

function updateAvailability() {
  const selected = getSelectedBooking();
  const availability = $("#classAvailability");
  const isLimited = selected.spots <= 2;

  availability.innerHTML = `
    <div class="availability-card${isLimited ? " accent" : ""}">
      <span>Cupos disponibles</span>
      <strong>${formatSpots(selected.spots)}</strong>
    </div>
    <div class="availability-card">
      <span>Actividad</span>
      <strong>${selected.activity}</strong>
    </div>
    <div class="availability-card">
      <span>Horario</span>
      <strong>${selected.day} ${selected.time}</strong>
    </div>
  `;
}

function initBooking() {
  const form = $("#bookingForm");
  if (!form) return;

  const activitySelect = $("#activitySelect");
  const daySelect = $("#daySelect");
  const timeSelect = $("#timeSelect");

  activitySelect.innerHTML = Object.keys(classSchedule)
    .map((activity) => `<option value="${activity}">${activity}</option>`)
    .join("");
  daySelect.innerHTML = bookingDays.map((day) => `<option value="${day}">${day}</option>`).join("");

  activitySelect.value = "Funcional";
  daySelect.value = "Lunes";

  activitySelect.addEventListener("change", updateTimeOptions);
  daySelect.addEventListener("change", updateTimeOptions);
  timeSelect.addEventListener("change", updateAvailability);
  updateTimeOptions();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selected = getSelectedBooking();
    $("#confirmationEmpty").hidden = true;
    $("#confirmationReady").hidden = false;
    $("#confirmedActivity").textContent = selected.activity;
    $("#summaryActivity").textContent = selected.activity;
    $("#summaryDay").textContent = selected.day;
    $("#summaryTime").textContent = selected.time;
    generateAccessQr(buildAccessPayload(selected));
    updateAccountPanel(selected);

    $("#confirmWhatsapp").href = buildWhatsappUrl();
    $("#bookingConfirmation").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function initHeader() {
  const header = $("[data-header]");
  const nav = $("#siteNav");
  const toggle = $(".nav-toggle");

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$("#siteNav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initRevealAnimations() {
  const revealItems = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initTestimonials() {
  const carousel = $("#testimonialCarousel");
  let index = 0;

  const render = () => {
    const testimonial = testimonials[index];
    carousel.innerHTML = `
      <article class="testimonial-card">
        <img src="${testimonial.image}" alt="Foto de ${testimonial.name}" loading="lazy">
        <div>
          <div class="stars" aria-label="5 estrellas">★★★★★</div>
          <blockquote>“${testimonial.text}”</blockquote>
          <cite>${testimonial.name} · ${testimonial.role}</cite>
        </div>
      </article>
    `;
  };

  render();
  setInterval(() => {
    index = (index + 1) % testimonials.length;
    render();
  }, 5200);
}

function initGallery() {
  const lightbox = $("#lightbox");
  const image = $("#lightbox img");
  const close = $(".lightbox-close");

  $$("#galleryGrid button").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.image;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.hidden = true;
    image.src = "";
    document.body.style.overflow = "";
  };

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}

function initFaq() {
  $$("#faqList details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      $$("#faqList details").forEach((item) => {
        if (item !== details) item.open = false;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindWhatsappLinks();
  initHeader();
  initRevealAnimations();
  initBooking();
  initTestimonials();
  initGallery();
  initFaq();
});
