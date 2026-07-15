/* =========================================================
   HARSH BATHRI — PORTFOLIO
   script.js — vanilla JavaScript, no dependencies
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  hidePageLoader();
  initTypingAnimation();
  initNavbarScrollState();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavHighlight();
  initRevealOnScroll();
  initSkillBars();
  initScrollToTopButton();
  initContactFormValidation();
});

/* ---------------------------------------------------------
   1. PAGE LOADER
   Hides the loading overlay once the page has finished
   loading (or after a short minimum delay for perceived
   smoothness).
--------------------------------------------------------- */
function hidePageLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 300);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add("hidden"), 1500);
}

/* ---------------------------------------------------------
   2. HERO TYPING ANIMATION
   Recreates a Typed.js-style effect using vanilla JS:
   types out each phrase, pauses, deletes, moves to next.
--------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const phrases = ["Cybersecurity Enthusiast", "Ethical Hacker", "Problem Solver"];
  const typeSpeed = 55;
  const backSpeed = 30;
  const backDelay = 1500;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, backDelay);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, backSpeed);
    }
  }

  tick();
}

/* ---------------------------------------------------------
   3. NAVBAR — BLUR / BACKGROUND ON SCROLL
--------------------------------------------------------- */
function initNavbarScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const update = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---------------------------------------------------------
   4. MOBILE HAMBURGER MENU
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const toggleIcon = document.getElementById("navToggleIcon");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggleIcon.classList.remove("fa-xmark");
    toggleIcon.classList.add("fa-bars");
  };

  const openMenu = () => {
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggleIcon.classList.remove("fa-bars");
    toggleIcon.classList.add("fa-xmark");
  };

  toggle.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close the menu whenever a mobile nav link is clicked
  menu.querySelectorAll(".nav-link, .btn").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ---------------------------------------------------------
   5. SMOOTH SCROLL FOR ALL IN-PAGE ANCHOR LINKS
   Accounts for the fixed navbar height as an offset.
--------------------------------------------------------- */
function initSmoothScroll() {
  const navbar = document.getElementById("navbar");
  const offset = () => (navbar ? navbar.offsetHeight : 0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - offset() + 1;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ---------------------------------------------------------
   6. ACTIVE NAV LINK HIGHLIGHT WHILE SCROLLING
   Uses IntersectionObserver to flag the section currently
   in view and highlight the matching nav link(s).
--------------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL ANIMATIONS (fade-up / fade-left / fade-right)
   Uses IntersectionObserver to add a visibility class once
   an element scrolls into the viewport.
--------------------------------------------------------- */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   8. ANIMATED SKILL PROGRESS BARS
   Fills each bar to its data-level percentage once its
   card scrolls into view.
--------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || 0;
          // slight delay so the fill is visible after the card fades in
          setTimeout(() => {
            bar.style.width = `${level}%`;
          }, 150);
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------
   9. SCROLL-TO-TOP BUTTON
--------------------------------------------------------- */
function initScrollToTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   10. CONTACT FORM VALIDATION
   Pure client-side validation (no backend wired up).
   Replace the submit handler with a fetch()/EmailJS call
   if you want the form to actually send messages.
--------------------------------------------------------- */
function initContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    subject: { input: document.getElementById("subject"), error: document.getElementById("subjectError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") },
  };
  const status = document.getElementById("formStatus");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(key) {
    const { input, error } = fields[key];
    const value = input.value.trim();
    let message = "";

    if (!value) {
      message = "This field is required.";
    } else if (key === "email" && !emailPattern.test(value)) {
      message = "Enter a valid email address.";
    } else if (key === "message" && value.length < 10) {
      message = "Message should be at least 10 characters.";
    }

    error.textContent = message;
    input.style.borderColor = message ? "#f87171" : "";
    return !message;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].error.textContent) validateField(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.textContent = "Please fix the errors above.";
      status.classList.add("error");
      return;
    }

    // No backend is wired up in this static build.
    // Hook up EmailJS, Formspree, or your own endpoint here.
    status.textContent = "Message ready to send! Connect a form backend (e.g. EmailJS) to deliver it.";
    status.classList.add("success");
    form.reset();
  });
}
