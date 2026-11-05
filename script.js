"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const copyrightYear = document.querySelector("#copyright-year");
const projectEnquiryForm = document.querySelector("#project-enquiry-form");

const WHATSAPP_PHONE_NUMBER = "94786788925";

if (projectEnquiryForm instanceof HTMLFormElement) {
  const packageField = projectEnquiryForm.elements.namedItem("package");
  const requestedPackage = new URLSearchParams(window.location.search).get("package");
  const packageOptions = {
    starter: "Starter",
    growth: "Growth",
    custom: "Custom",
    maintenance: "Website Maintenance",
  };

  if (
    packageField instanceof HTMLSelectElement &&
    requestedPackage &&
    Object.hasOwn(packageOptions, requestedPackage.toLowerCase())
  ) {
    packageField.value = packageOptions[requestedPackage.toLowerCase()];
  }

  projectEnquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!projectEnquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(projectEnquiryForm);
    const selectedPackage = formData.get("package");
    const message = [
      selectedPackage === "Website Maintenance"
        ? "Hi twopagesites, I'd like to discuss website maintenance."
        : "Hi twopagesites, I'd like to discuss a website project.",
      "",
      `Name: ${formData.get("name")}`,
      `Business: ${formData.get("business")}`,
      `Email: ${formData.get("email")}`,
      `Package / service: ${selectedPackage}`,
      `Project details: ${formData.get("details")}`,
    ].join("\n");

    window.location.assign(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`,
    );
  });
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !primaryNavigation) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  primaryNavigation.classList.toggle("is-open", isOpen);
}

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (event.key === "Escape" && isOpen) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuOpen(false);
    }
  });
}

if (copyrightYear) {
  copyrightYear.textContent = String(new Date().getFullYear());
}
