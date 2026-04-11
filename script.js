const footerYear = document.querySelector("[data-year]");
const revealNodes = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  }
);

revealNodes.forEach((node) => observer.observe(node));

if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

const contactFormNext = document.querySelector("#contact-form-next");
if (contactFormNext) {
  try {
    contactFormNext.value = new URL("contact.html?sent=1", window.location.href)
      .href;
  } catch {
    contactFormNext.value = "contact.html?sent=1";
  }
}

const params = new URLSearchParams(window.location.search);
if (params.get("sent") === "1") {
  const banner = document.querySelector("#contact-success");
  if (banner) {
    banner.hidden = false;
    banner.classList.add("is-visible");
  }
  try {
    window.history.replaceState({}, "", "contact.html");
  } catch {
    /* ignore */
  }
}
