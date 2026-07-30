const galleries = {
  poetsbeurten: [
    "privacy-fotos/Poetsbeurten/ef.jpeg",
    "privacy-fotos/Poetsbeurten/iefugy.jpeg",
    "privacy-fotos/Poetsbeurten/laejfeugieagfa.jpeg",
    "privacy-fotos/Poetsbeurten/poetserthje$.jpeg",
    "privacy-fotos/Poetsbeurten/rg.jpeg",
    "privacy-fotos/Poetsbeurten/WhatsApp Image 2026-07-25 at 12.27.36.jpeg",
    "privacy-fotos/Poetsbeurten/WhatsApp Image 2026-07-25 at 12.27.38.jpeg",
    "privacy-fotos/Poetsbeurten/WhatsApp Image 2026-07-25 at 12.27.43.jpeg",
    "privacy-fotos/Poetsbeurten/WhatsApp Image 2026-07-25 at 12.27.44.jpeg",
    "privacy-fotos/Poetsbeurten/WhatsApp Image 2026-07-25 at 19.39.48.jpeg",
    "privacy-fotos/Poetsbeurten/zf.jpeg",
    "privacy-fotos/Poetsbeurten/zg.jpeg"
  ],
  herstellingen: [
    "privacy-fotos/Herstellingswerkjes/87.jpeg",
    "privacy-fotos/Herstellingswerkjes/987416afi.jpeg",
    "privacy-fotos/Herstellingswerkjes/987oipofei.jpeg",
    "privacy-fotos/Herstellingswerkjes/afae.jpeg",
    "privacy-fotos/Herstellingswerkjes/efa.jpeg",
    "privacy-fotos/Herstellingswerkjes/feafaeaf.jpeg",
    "privacy-fotos/Herstellingswerkjes/jkhfiu.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.52.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.53.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.53a.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.53e.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.53f.jpeg",
    "privacy-fotos/Herstellingswerkjes/WhatsApp Image 2026-07-25 at 12.21.53fe.jpeg"
  ],
  onderhoud: [
    "privacy-fotos/Onderhoudfotos/3.jpeg",
    "privacy-fotos/Onderhoudfotos/48724.jpeg",
    "privacy-fotos/Onderhoudfotos/4875.jpeg",
    "privacy-fotos/Onderhoudfotos/frf.jpeg",
    "privacy-fotos/Onderhoudfotos/uygfaeyfguaf.jpeg",
    "privacy-fotos/Onderhoudfotos/WhatsApp Image 2026-07-25 at 12.24.26.jpeg"
  ]
};

const labels = {
  poetsbeurten: "Poetsbeurt bij GATE26",
  herstellingen: "Herstellingswerk bij GATE26",
  onderhoud: "Onderhoudswerk bij GATE26"
};

const gallery = document.querySelector("#gallery");
const tabs = document.querySelectorAll("[data-gallery]");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.innerHTML = '<button type="button" aria-label="Sluiten">x</button><img alt="" />';
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector("button");

function renderGallery(name) {
  gallery.innerHTML = "";

  galleries[name].forEach((src, index) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `${labels[name]} ${index + 1} openen`);

    const image = document.createElement("img");
    image.src = encodeURI(src);
    image.alt = `${labels[name]} ${index + 1}`;
    image.loading = "lazy";

    button.appendChild(image);
    button.addEventListener("click", () => openLightbox(image.src, image.alt));
    gallery.appendChild(button);
  });
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderGallery(tab.dataset.gallery);
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

renderGallery("poetsbeurten");
