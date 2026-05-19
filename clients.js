const clientStories = {
  gsk: {
    name: "GlaxoSmithKline",
    category: "Life sciences / regulated operations",
    work: "Industrial and commercial facility support for a large regulated operator, with an emphasis on dependable delivery, clean coordination, and facilities built for long-term use.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  coca: {
    name: "Coca-Cola Refreshments",
    category: "Beverage distribution",
    work: "Facility planning and industrial construction support for beverage distribution operations, where access, dock flow, schedule control, and operational reliability matter.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  constellation: {
    name: "Constellation Brands",
    category: "Wine and beverage infrastructure",
    work: "Specialty industrial support for beverage production, storage, and distribution needs across winery and warehouse environments.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  hess: {
    name: "The Hess Collection",
    category: "Winery infrastructure",
    work: "A major winery-related build in American Canyon, California, supporting production, storage, bottling, and long-term operational growth.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  georgia: {
    name: "Georgia Pacific",
    category: "Manufacturing / industrial",
    work: "Industrial facility support for a major manufacturing operator, focused on practical building systems, heavy-use durability, and project coordination.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  barry: {
    name: "Barry-Callebaut Chocolate",
    category: "Food processing",
    work: "Food-processing facility support where temperature, workflow, cleanliness, and uptime shape the building requirements.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  itw: {
    name: "Illinois Tool Works",
    category: "Industrial manufacturing",
    work: "Commercial and industrial facility support for a diversified manufacturer, built around practical construction management and durable operating space.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  winegroup: {
    name: "The Wine Group",
    category: "Wine production and distribution",
    work: "Wine industry facility and logistics support, aligned with ICC's broader work across California winery infrastructure.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  pacific: {
    name: "Pacific Coast Producers",
    category: "Food processing / agriculture",
    work: "Industrial facility support for food production and processing operations, where schedule, sanitation needs, and continuity are central.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  western: {
    name: "Western Wine Services",
    category: "Wine logistics",
    work: "Wine-storage and logistics facility support serving California's wine economy and climate-sensitive product movement.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  valley: {
    name: "Valley Wine Warehouse",
    category: "Wine warehousing",
    work: "Warehouse and logistics infrastructure for climate-sensitive wine storage and distribution.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  freeport: {
    name: "Freeport Logistics",
    category: "Logistics / 3PL",
    work: "Logistics and warehouse facility support for regional distribution operations, emphasizing dock flow, tenant readiness, and practical site planning.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  biagi: {
    name: "Biagi Brothers",
    category: "Transportation / logistics",
    work: "Distribution and logistics facility support for a regional transportation operator with real-world fleet, loading, and throughput needs.",
    testimony: "Verified client testimonial to be added before launch.",
  },
  dh: {
    name: "D&H Distributing",
    category: "Distribution",
    work: "Distribution facility support for a high-volume operator, centered on throughput, clear circulation, and long-term facility value.",
    testimony: "Verified client testimonial to be added before launch.",
  },
};

let lastFocusedClient = null;

function ensureClientModal() {
  let modal = document.querySelector("[data-client-modal]");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "client-modal";
  modal.setAttribute("data-client-modal", "");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="client-modal__backdrop" data-client-close></div>
    <div class="client-modal__panel" role="dialog" aria-modal="true" aria-labelledby="clientModalTitle">
      <button class="client-modal__close" type="button" data-client-close aria-label="Close client case study">X</button>
      <div class="client-modal__label">Client case study</div>
      <h3 id="clientModalTitle"></h3>
      <div class="client-modal__category"></div>
      <div class="client-modal__grid">
        <div>
          <h4>What ICC did</h4>
          <p data-client-work></p>
        </div>
        <div>
          <h4>Client testimony</h4>
          <blockquote data-client-testimony></blockquote>
        </div>
      </div>
      <a class="client-modal__link" href="contact.html">Talk to ICC about similar work</a>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-client-close]").forEach((el) => {
    el.addEventListener("click", closeClientModal);
  });
  return modal;
}

function openClientModal(key) {
  const story = clientStories[key];
  if (!story) return;
  const modal = ensureClientModal();
  lastFocusedClient = document.activeElement;
  modal.querySelector("#clientModalTitle").textContent = story.name;
  modal.querySelector(".client-modal__category").textContent = story.category;
  modal.querySelector("[data-client-work]").textContent = story.work;
  modal.querySelector("[data-client-testimony]").textContent = story.testimony;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector("[data-client-close]").focus();
}

function closeClientModal() {
  const modal = document.querySelector("[data-client-modal]");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedClient && typeof lastFocusedClient.focus === "function") {
    lastFocusedClient.focus();
  }
}

document.querySelectorAll("[data-client]").forEach((card) => {
  const cardName = (card.innerText || card.textContent).replace(/\s+/g, " ").trim();
  card.setAttribute("aria-label", `View client case study for ${cardName}`);
  card.addEventListener("click", () => openClientModal(card.dataset.client));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeClientModal();
});
