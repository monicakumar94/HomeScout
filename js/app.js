// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle (safe guards)
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isHidden = mobileNav.classList.toggle("hidden");
      navToggle.setAttribute("aria-expanded", String(!isHidden));
    });
  }

  // Simple search action
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const q = (searchInput.value || "").trim();
      if (q) location.href = `./search.html?q=${encodeURIComponent(q)}`;
    });
  }

  // --- Selling Soon rail (demo data) ---
  const demoHomes = [
    {
      price: 12888800,
      image: "https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1400&auto=format&fit=crop",
      address: "3BHK, Sarjapur Road, Bengaluru",
      beds: 3, baths: 3, sqft: 1580, badge: "Spacious and versatile"
    },
    {
      price: 16790000,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1400&auto=format&fit=crop",
      address: "4BHK, Whitefield, Bengaluru",
      beds: 4, baths: 4, sqft: 2100, badge: "5 days on Homara"
    },
    {
      price: 13808880,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1400&auto=format&fit=crop",
      address: "2BHK, HSR Layout, Bengaluru",
      beds: 2, baths: 2, sqft: 1120, badge: "2 days on Homara"
    },
    {
      price: 14490000,
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c8e0?q=80&w=1400&auto=format&fit=crop",
      address: "3BHK, JP Nagar, Bengaluru",
      beds: 3, baths: 3, sqft: 1450, badge: "Family home"
    },
  ];

  function inr(n) {
    try { return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n); }
    catch { return n; }
  }

  function homeCard(h) {
  const fallback = "./public/placeholder.jpg"; // or "https://placehold.co/800x450?text=Property"
  const imgSrc = h.image || fallback;

  return `
  <article class="min-w-[280px] max-w-[320px] bg-card rounded-xl overflow-hidden property-card">
    <div class="relative">
      <img
        src="${imgSrc}"
        alt="${h.address}"
        class="h-44 w-full object-cover"
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
        onerror="this.onerror=null; this.src='${fallback}';"
      >
      ${h.badge ? `<span class="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">${h.badge}</span>` : ""}
      <button class="absolute top-2 right-2 bg-white/90 rounded-full p-2 shadow" aria-label="Save">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m20.84 4.61-1.8-1.79a5.5 5.5 0 0 0-7.78 0L10 4.08l-.26-.26a5.5 5.5 0 0 0-7.78 7.78l.26.26L10 21.23l7.78-9.37.26-.26a5.5 5.5 0 0 0 0-7.79Z"/>
        </svg>
      </button>
    </div>
    <div class="p-3">
      <div class="text-lg font-semibold">₹${inr(h.price)}</div>
      <div class="text-sm text-muted-foreground">${h.address}</div>
      <div class="mt-2 text-sm text-muted-foreground flex gap-3">
        <span>${h.beds} bds</span><span>${h.baths} ba</span><span>${h.sqft} sqft</span>
      </div>
    </div>
  </article>`;
}

  const rail = document.getElementById("ssRail");
  const track = document.getElementById("ssTrack");
  if (rail && track) {
    track.innerHTML = demoHomes.map(homeCard).join("");
    const prev = document.getElementById("ssPrev");
    const next = document.getElementById("ssNext");
    const shift = () => Math.min(rail.clientWidth, 340); // ~1 card

    prev && prev.addEventListener("click", () => rail.scrollBy({ left: -shift(), behavior: "smooth" }));
    next && next.addEventListener("click", () => rail.scrollBy({ left:  shift(), behavior: "smooth" }));
  }
});


