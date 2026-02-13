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
      "enterprise-saas": { baselineHours: 60, savedHours: 20 },
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

  // Bento highlight: Case Study vs Enterprise SaaS toggle
  const highlightCard = document.querySelector(".bento-card.highlight");
  const highlightTitle = document.getElementById("highlight-title");
  const highlightBody = document.getElementById("highlight-body");
  const highlightMetrics = document.getElementById("highlight-metrics");
  const highlightToggles =
    highlightCard && highlightCard.querySelectorAll(".bento-toggle");

  const HIGHLIGHT_CONFIG = {
    "case-study": {
      title: "Reducing support volume with retrieval-augmented assistants.",
      body:
        "Designed and shipped an RAG-based assistant for a global SaaS platform, " +
        "surfacing precise answers from policy, product, and historical ticket data.",
      metrics: [
        { label: "Deflection rate", value: "38% self-resolved tickets" },
        { label: "Time-to-answer", value: "↓ 72% median handle time" },
      ],
    },
    "enterprise-saas": {
      title: "Enterprise SaaS support copilot across regions and tiers.",
      body:
        "Dummy but realistic data for an enterprise SaaS company: a support copilot " +
        "that routes, summarizes, and drafts responses for global L1/L2 teams, while " +
        "keeping humans in control of final decisions.",
      metrics: [
        { label: "Regions covered", value: "5 languages, 24/7 support windows" },
        { label: "CSAT impact", value: "+14pt CSAT on assisted conversations" },
      ],
    },
  };

  if (
    highlightCard &&
    highlightTitle &&
    highlightBody &&
    highlightMetrics &&
    highlightToggles &&
    highlightToggles.length
  ) {
    const renderHighlightVariant = (variantKey) => {
      const data = HIGHLIGHT_CONFIG[variantKey];
      if (!data) return;

      highlightTitle.textContent = data.title;
      highlightBody.textContent = data.body;

      highlightMetrics.innerHTML = data.metrics
        .map(
          (metric) => `
      <div>
        <dt>${metric.label}</dt>
        <dd>${metric.value}</dd>
      </div>`
        )
        .join("");

      highlightCard.setAttribute("data-variant", variantKey);

      highlightToggles.forEach((btn) => {
        const isActive = btn.dataset.variant === variantKey;
        btn.classList.toggle("is-active", isActive);
      });
    };

    highlightToggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const variantKey = btn.dataset.variant;
        if (!variantKey) return;
        renderHighlightVariant(variantKey);
      });
    });

    // Ensure initial content matches the configured default
    const initialVariant = highlightCard.getAttribute("data-variant") || "case-study";
    renderHighlightVariant(initialVariant);
  }
});
