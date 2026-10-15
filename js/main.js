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

const clienteTextarea = document.getElementById("cliente-texto-template");
const btnCopiarCliente = document.getElementById("btn-copiar-cliente-texto");
const clienteTextoStatus = document.getElementById("cliente-texto-status");

function setClienteCopyStatus(message) {
  if (!clienteTextoStatus) return;
  clienteTextoStatus.textContent = message;
  if (message) {
    window.clearTimeout(setClienteCopyStatus._t);
    setClienteCopyStatus._t = window.setTimeout(() => {
      clienteTextoStatus.textContent = "";
    }, 3500);
  }
}

function copyTextFallback(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

async function copyClienteTexto() {
  const text = clienteTextarea?.value?.trim() ?? "";
  if (!text) return;

  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) {
    copied = copyTextFallback(text);
  }

  if (!copied && clienteTextarea) {
    clienteTextarea.focus();
    clienteTextarea.select();
    setClienteCopyStatus("Selecione o texto e use Copiar (Ctrl+C ou Cmd+C).");
    return;
  }

  btnCopiarCliente?.classList.add("is-copied");
  btnCopiarCliente && (btnCopiarCliente.textContent = "Copiado!");
  window.setTimeout(() => {
    btnCopiarCliente?.classList.remove("is-copied");
    if (btnCopiarCliente) btnCopiarCliente.textContent = "Copiar texto";
  }, 2500);
  setClienteCopyStatus("Texto copiado. Cole na conversa do WhatsApp.");
}

btnCopiarCliente?.addEventListener("click", copyClienteTexto);
