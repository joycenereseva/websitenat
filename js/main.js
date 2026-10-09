const WHATSAPP_URL =
  "https://wa.me/5573991040064?text=" +
  encodeURIComponent(
    "Olá, Profª Joyce! Vi o informativo de natação infantil e gostaria de saber mais sobre as aulas."
  );

document.querySelectorAll("[data-whatsapp]").forEach((el) => {
  el.setAttribute("href", WHATSAPP_URL);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener noreferrer");
});

const nav = document.querySelector(".site-nav");
const progressBar = document.getElementById("progress-bar");
const btnTop = document.getElementById("btnTop");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar && docHeight > 0) {
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
  }
  nav?.classList.toggle("scrolled", scrollTop > 40);
  btnTop?.classList.toggle("show", scrollTop > 400);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

document.querySelectorAll(".accordion-list").forEach((list) => {
  list.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn?.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      list.querySelectorAll(".faq-item.open").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
});

btnTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
