document.addEventListener("DOMContentLoaded", () => {
  // Update current copyright year
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Fixed header elevation on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile navigation drawer toggle
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });

    // Close menu when clicking nav links on mobile
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "☰";
        }
      });
    });
  }

  // Booking form date constraint
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }

  // Booking form preview
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const name = document.getElementById("name").value.trim();
      const msg = document.getElementById("bookingMessage");
      msg.textContent = `Thanks, ${name}. Your demo request for ${service} on ${date} at ${time} is ready for review. No appointment has been created.`;
    });
  }

  // Contact form submission preview
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const name = document.getElementById("contactName").value.trim();
      document.getElementById("contactMessage").textContent =
        `Thanks, ${name}. This demo form is validated, but it is not connected to email or a database yet.`;
    });
  }
});

/* Newsletter + Back to top */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".newsletter").forEach(form => {
    const msg = form.parentElement.querySelector(".newsletter-msg");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const input = form.querySelector("input[type=email]");
      const ok = input.value.trim() && input.checkValidity();
      msg.classList.toggle("is-error", !ok);
      msg.textContent = ok
        ? "Thank you! This demo form is validated, but it is not connected to an email service yet."
        : "Please enter a valid email address.";
      if (ok) form.reset();
    });
  });

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<svg class="btt-ring" viewBox="0 0 48 48" aria-hidden="true"><circle class="btt-track" cx="24" cy="24" r="21"/><circle class="btt-progress" cx="24" cy="24" r="21"/></svg><svg class="btt-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  const circ = 2 * Math.PI * 21;
  const ring = btn.querySelector(".btt-progress");
  ring.style.strokeDasharray = circ;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    ring.style.strokeDashoffset = circ * (1 - pct);
    btn.classList.toggle("show", window.scrollY > 400);
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
