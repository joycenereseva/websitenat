document.documentElement.classList.add("force-light-ui");

const WHATSAPP_WEBVIEW_BANNER_KEY = "websitenat-wa-webview-banner-dismissed";
const SITE_CANONICAL_URL = "https://joycenereseva.github.io/websitenat/";

function isWhatsAppInAppBrowser() {
  const ua = navigator.userAgent || "";
  const referrer = document.referrer || "";
  const fromWhatsAppReferrer = /whatsapp/i.test(referrer);
  if (/WhatsApp/i.test(ua) || /WAWebView/i.test(ua)) return true;
  if (fromWhatsAppReferrer) return true;
  if (/\bwv\b/i.test(ua)) return true;
  return false;
}

function initWhatsAppOpenInBrowserBanner() {
  if (!isWhatsAppInAppBrowser()) return;

  document.documentElement.classList.add("whatsapp-webview");

  if (sessionStorage.getItem(WHATSAPP_WEBVIEW_BANNER_KEY) === "1") return;

  const openUrl =
    window.location.href && /^https?:\/\//i.test(window.location.href)
      ? window.location.href
      : SITE_CANONICAL_URL;

  const banner = document.createElement("div");
  banner.className = "whatsapp-webview-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Visualização no navegador");

  const text = document.createElement("p");
  text.className = "whatsapp-webview-banner__text";
  text.textContent =
    "Abra no navegador para ver o informativo com as cores corretas.";

  const openLink = document.createElement("a");
  openLink.className = "whatsapp-webview-banner__cta";
  openLink.href = openUrl;
  openLink.target = "_blank";
  openLink.rel = "noopener noreferrer";
  openLink.textContent = "Abrir no navegador";

  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.className = "whatsapp-webview-banner__dismiss";
  dismiss.setAttribute("aria-label", "Fechar aviso");
  dismiss.textContent = "×";

  banner.append(text, openLink, dismiss);
  document.body.prepend(banner);
  document.documentElement.classList.add("whatsapp-webview-banner-on");

  dismiss.addEventListener("click", () => {
    sessionStorage.setItem(WHATSAPP_WEBVIEW_BANNER_KEY, "1");
    banner.remove();
    document.documentElement.classList.remove("whatsapp-webview-banner-on");
  });
}

initWhatsAppOpenInBrowserBanner();

/** Brazil mobile (73) 99104-0064 — digits only, no + for wa.me */
const WHATSAPP_PHONE = "5573991040064";

const WHATSAPP_MESSAGE = `Olá, Professora Joyce! Gostaria de saber mais sobre as aulas particulares de natação.

Meu nome:

Nome do meu filho(a):

Idade:

Local da piscina (bairro, rua):

Me interessei pelo plano (regular, reduzida, premium):`;

const WHATSAPP_URL =
  "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

/** Same query string for api.whatsapp.com (older WebViews) */
const WHATSAPP_API_URL =
  "https://api.whatsapp.com/send?phone=" +
  WHATSAPP_PHONE +
  "&text=" +
  encodeURIComponent(WHATSAPP_MESSAGE);

document.querySelectorAll("[data-whatsapp]").forEach((el) => {
  el.setAttribute("href", WHATSAPP_URL);
  el.setAttribute("data-whatsapp-api", WHATSAPP_API_URL);
  el.setAttribute("rel", "noopener");
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
