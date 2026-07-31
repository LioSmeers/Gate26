const tabs = document.querySelectorAll("[data-gallery]");
const galleryItems = document.querySelectorAll("[data-gallery-item]");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.innerHTML = '<button type="button" aria-label="Sluiten">x</button><img alt="" />';
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector("button");

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

    galleryItems.forEach((item) => {
      item.hidden = tab.dataset.gallery !== "all" && item.dataset.galleryItem !== tab.dataset.gallery;
    });
  });
});

galleryItems.forEach((item) => {
  const image = item.querySelector("img");
  item.addEventListener("click", () => openLightbox(image.src, image.alt));
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

const contactForm = document.querySelector(".contact-form");
const contactStatus = document.querySelector(".form-status");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Versturen...";
  contactStatus.textContent = "";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    contactStatus.textContent = "Bedankt. Uw bericht is verstuurd.";
  } catch (error) {
    contactStatus.textContent = "Het bericht kon niet worden verstuurd. Probeer het later opnieuw.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});
