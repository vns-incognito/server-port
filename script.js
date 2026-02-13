// Minimal navigation behavior for small screens
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  if (header && toggle) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("open");
      });
    });
  }

  /**
   * Consultancy Calculator
   * @param {string} businessType - e.g. "freelancer", "agency", "ecommerce"
   * @returns {{businessType: string, baselineHours: number, savedHours: number, newHours: number, percentSaved: number}}
   */
  function consultancyCalculator(businessType) {
    const CONFIG = {
      freelancer: { baselineHours: 40, savedHours: 10 },
      agency: { baselineHours: 50, savedHours: 15 },
      ecommerce: { baselineHours: 45, savedHours: 12 },
      coach: { baselineHours: 35, savedHours: 8 },
      startup: { baselineHours: 55, savedHours: 18 },
    };

    const key = String(businessType || "").toLowerCase();
    const data = CONFIG[key];

    if (!data) {
      throw new Error(
        `Unknown business type "${businessType}". Valid types are: ${Object.keys(
          CONFIG
        ).join(", ")}`
      );
    }

    const { baselineHours, savedHours } = data;
    const newHours = Math.max(baselineHours - savedHours, 0);
    const percentSaved = (savedHours / baselineHours) * 100;

    return {
      businessType: key,
      baselineHours,
      savedHours,
      newHours,
      percentSaved: Number(percentSaved.toFixed(1)),
    };
  }

  // Optional UI wiring – safely no-ops if elements are missing
  const businessSelect = document.getElementById("businessTypeSelect");
  const baselineEl = document.getElementById("baselineHours");
  const savedEl = document.getElementById("savedHours");
  const newEl = document.getElementById("newHours");
  const percentEl = document.getElementById("percentSaved");

  if (businessSelect && baselineEl && savedEl && newEl && percentEl) {
    const updateUI = () => {
      try {
        const result = consultancyCalculator(businessSelect.value);
        baselineEl.textContent = result.baselineHours;
        savedEl.textContent = result.savedHours;
        newEl.textContent = result.newHours;
        percentEl.textContent = `${result.percentSaved}%`;
      } catch (e) {
        // In case of an unknown business type, clear values
        baselineEl.textContent = "-";
        savedEl.textContent = "-";
        newEl.textContent = "-";
        percentEl.textContent = "-";
        console.error(e.message);
      }
    };

    businessSelect.addEventListener("change", updateUI);

    // Initialize on load
    if (businessSelect.value) {
      updateUI();
    }
  }
});

