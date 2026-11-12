"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const copyrightYear = document.querySelector("#copyright-year");
const projectEnquiryForm = document.querySelector("#project-enquiry-form");

const WHATSAPP_PHONE_NUMBER = "94786788925";

if (projectEnquiryForm instanceof HTMLFormElement) {
  const packageField = projectEnquiryForm.elements.namedItem("package");
  const maintenanceField = projectEnquiryForm.elements.namedItem("maintenance");
  const query = new URLSearchParams(window.location.search);
  const requestedPackage = query.get("package");
  const packageOptions = {
    starter: "Starter",
    growth: "Growth",
    custom: "Custom",
  };

  if (
    maintenanceField instanceof HTMLInputElement &&
    (query.get("maintenance") === "yes" || requestedPackage?.toLowerCase() === "maintenance")
  ) {
    maintenanceField.checked = true;
  }

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
    const maintenanceRequested = formData.has("maintenance");
    const message = [
      maintenanceRequested
        ? "Hi twopagesites, I'd like to discuss a website project and ongoing maintenance."
        : "Hi twopagesites, I'd like to discuss a website project.",
      "",
      `Name: ${formData.get("name")}`,
      `Business: ${formData.get("business")}`,
      `Email: ${formData.get("email") || "Not provided"}`,
      `Website package: ${selectedPackage}`,
      `Website maintenance: ${maintenanceRequested ? "Yes, please discuss options." : "No, not at this time."}`,
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
