// // Property data
// const properties = [
//   {
//     id: 1,
//     title: "Modern Downtown Condo",
//     price: 850000,
//     location: "Downtown Seattle, WA",
//     beds: 2,
//     baths: 2,
//     sqft: "1,200",
//     image: "public/modern-downtown-condo.png",
//     type: "Condo",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Suburban Family Home",
//     price: 1250000,
//     location: "Bellevue, WA",
//     beds: 4,
//     baths: 3,
//     sqft: "2,800",
//     image: "public/suburban-family-home.png",
//     type: "House",
//     featured: false,
//   },
//   {
//     id: 3,
//     title: "Luxury Waterfront Villa",
//     price: 2100000,
//     location: "Mercer Island, WA",
//     beds: 5,
//     baths: 4,
//     sqft: "4,200",
//     image: "public/luxury-waterfront-villa.png",
//     type: "Villa",
//     featured: true,
//   },
//   {
//     id: 4,
//     title: "Cozy Studio Apartment",
//     price: 425000,
//     location: "Capitol Hill, Seattle",
//     beds: 1,
//     baths: 1,
//     sqft: "650",
//     image: "public/cozy-studio-apartment.png",
//     type: "Apartment",
//     featured: false,
//   },
//   {
//     id: 5,
//     title: "Historic Craftsman Home",
//     price: 975000,
//     location: "Fremont, Seattle",
//     beds: 3,
//     baths: 2,
//     sqft: "1,850",
//     image: "public/historic-craftsman-home.png",
//     type: "House",
//     featured: false,
//   },
//   {
//     id: 6,
//     title: "New Construction Townhouse",
//     price: 1450000,
//     location: "Kirkland, WA",
//     beds: 3,
//     baths: 3,
//     sqft: "2,200",
//     image: "public/new-construction-townhouse.png",
//     type: "Townhouse",
//     featured: true,
//   },
// ]

// // State management
// let currentFilters = {
//   search: "",
//   types: [],
//   priceRange: [0, 3000000],
//   minBeds: "",
//   minBaths: "",
//   sortBy: "price-asc",
//   featuredOnly: false,
// }

// // DOM elements
// const searchInput = document.getElementById("searchInput")
// const propertyGrid = document.getElementById("propertyGrid")
// const propertyCount = document.getElementById("propertyCount")
// const noResults = document.getElementById("noResults")
// const sortBy = document.getElementById("sortBy")
// const bedsFilter = document.getElementById("bedsFilter")
// const bathsFilter = document.getElementById("bathsFilter")
// const activeFilters = document.getElementById("activeFilters")
// const filterBtns = document.querySelectorAll(".filter-btn")
// const moreFiltersBtn = document.getElementById("moreFiltersBtn")
// const filtersModal = document.getElementById("filtersModal")
// const closeModal = document.querySelector(".close")
// const featuredOnly = document.getElementById("featuredOnly")
// const clearFiltersBtn = document.getElementById("clearFiltersBtn")
// const clearAllFilters = document.getElementById("clearAllFilters")

// // Utility functions
// function formatPrice(price) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(price)
// }

// function createPropertyCard(property) {
//   return `
//         <div class="property-card bg-card rounded-lg overflow-hidden border border-border">
//             <div class="relative">
//                 <img
//                     src="${property.image}"
//                     alt="${property.title}"
//                     class="w-full h-48 object-cover"
//                     onerror="this.src='https://via.placeholder.com/400x300?text=Property+Image'"
//                 />
//                 <button class="absolute top-3 right-3 h-8 w-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80">
//                     <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//                     </svg>
//                 </button>
//                 ${property.featured ? '<span class="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground rounded text-sm">Featured</span>' : ""}
//             </div>

//             <div class="p-4">
//                 <div class="flex items-center justify-between mb-2">
//                     <span class="px-2 py-1 border border-border rounded text-sm">${property.type}</span>
//                     <span class="text-2xl font-bold text-primary">${formatPrice(property.price)}</span>
//                 </div>

//                 <h4 class="font-semibold text-lg mb-2">${property.title}</h4>

//                 <div class="flex items-center text-muted-foreground mb-3">
//                     <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                     </svg>
//                     <span class="text-sm">${property.location}</span>
//                 </div>

//                 <div class="flex items-center justify-between text-sm text-muted-foreground mb-4">
//                     <div class="flex items-center gap-4">
//                         <div class="flex items-center">
//                             <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 15v-4a2 2 0 012-2h4a2 2 0 012 2v4"></path>
//                             </svg>
//                             <span>${property.beds} beds</span>
//                         </div>
//                         <div class="flex items-center">
//                             <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3"></path>
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l3-3 3 3"></path>
//                             </svg>
//                             <span>${property.baths} baths</span>
//                         </div>
//                         <div class="flex items-center">
//                             <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4a1 1 0 011-1h4M4 16v4a1 1 0 001 1h4m8-16h4a1 1 0 011 1v4m-4 12h4a1 1 0 001-1v-4"></path>
//                             </svg>
//                             <span>${property.sqft} sqft</span>
//                         </div>
//                     </div>
//                 </div>

//                 <a href="property-${property.id}.html" class="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
//                     View Details
//                 </a>
//             </div>
//         </div>
//     `
// }

// function filterAndSortProperties() {
//   const filtered = properties.filter((property) => {
//     // Search query filter
//     const matchesSearch =
//       currentFilters.search === "" ||
//       property.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
//       property.location.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
//       property.type.toLowerCase().includes(currentFilters.search.toLowerCase())

//     // Property type filter
//     const matchesType = currentFilters.types.length === 0 || currentFilters.types.includes(property.type)

//     // Price range filter
//     const matchesPrice =
//       property.price >= currentFilters.priceRange[0] && property.price <= currentFilters.priceRange[1]

//     // Bedroom filter
//     const matchesBeds = currentFilters.minBeds === "" || property.beds >= Number.parseInt(currentFilters.minBeds)

//     // Bathroom filter
//     const matchesBaths = currentFilters.minBaths === "" || property.baths >= Number.parseInt(currentFilters.minBaths)

//     // Featured filter
//     const matchesFeatured = !currentFilters.featuredOnly || property.featured

//     return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesBaths && matchesFeatured
//   })

//   // Sort properties
//   filtered.sort((a, b) => {
//     switch (currentFilters.sortBy) {
//       case "price-asc":
//         return a.price - b.price
//       case "price-desc":
//         return b.price - a.price
//       case "beds-desc":
//         return b.beds - a.beds
//       case "sqft-desc":
//         return Number.parseInt(b.sqft.replace(",", "")) - Number.parseInt(a.sqft.replace(",", ""))
//       default:
//         return 0
//     }
//   })

//   return filtered
// }

// function renderProperties() {
//   const filtered = filterAndSortProperties()

//   if (filtered.length === 0) {
//     propertyGrid.style.display = "none"
//     noResults.style.display = "block"
//   } else {
//     propertyGrid.style.display = "grid"
//     noResults.style.display = "none"
//     propertyGrid.innerHTML = filtered.map(createPropertyCard).join("")
//   }

//   propertyCount.textContent = `${filtered.length} Properties Available`
//   updateActiveFiltersCount()
// }

// function updateActiveFiltersCount() {
//   const count = [
//     currentFilters.types.length,
//     currentFilters.minBeds ? 1 : 0,
//     currentFilters.minBaths ? 1 : 0,
//     currentFilters.featuredOnly ? 1 : 0,
//     currentFilters.search ? 1 : 0,
//   ].reduce((a, b) => a + b, 0)

//   if (count > 0) {
//     activeFilters.textContent = `${count} active`
//     activeFilters.style.display = "inline"
//   } else {
//     activeFilters.style.display = "none"
//   }
// }

// function clearAllFiltersFunc() {
//   currentFilters = {
//     search: "",
//     types: [],
//     priceRange: [0, 3000000],
//     minBeds: "",
//     minBaths: "",
//     sortBy: "price-asc",
//     featuredOnly: false,
//   }

//   // Reset UI elements
//   searchInput.value = ""
//   bedsFilter.value = ""
//   bathsFilter.value = ""
//   sortBy.value = "price-asc"
//   featuredOnly.checked = false

//   // Reset filter buttons
//   filterBtns.forEach((btn) => {
//     btn.classList.remove("filter-active")
//   })

//   renderProperties()
// }

// // Event listeners
// searchInput.addEventListener("input", (e) => {
//   currentFilters.search = e.target.value
//   renderProperties()
// })

// filterBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const type = btn.dataset.type
//     if (currentFilters.types.includes(type)) {
//       currentFilters.types = currentFilters.types.filter((t) => t !== type)
//       btn.classList.remove("filter-active")
//     } else {
//       currentFilters.types.push(type)
//       btn.classList.add("filter-active")
//     }
//     renderProperties()
//   })
// })

// bedsFilter.addEventListener("change", (e) => {
//   currentFilters.minBeds = e.target.value
//   renderProperties()
// })

// bathsFilter.addEventListener("change", (e) => {
//   currentFilters.minBaths = e.target.value
//   renderProperties()
// })

// sortBy.addEventListener("change", (e) => {
//   currentFilters.sortBy = e.target.value
//   renderProperties()
// })

// featuredOnly.addEventListener("change", (e) => {
//   currentFilters.featuredOnly = e.target.checked
//   renderProperties()
// })

// // Modal functionality
// moreFiltersBtn.addEventListener("click", () => {
//   filtersModal.style.display = "block"
// })

// closeModal.addEventListener("click", () => {
//   filtersModal.style.display = "none"
// })

// window.addEventListener("click", (e) => {
//   if (e.target === filtersModal) {
//     filtersModal.style.display = "none"
//   }
// })

// clearFiltersBtn.addEventListener("click", clearAllFiltersFunc)
// clearAllFilters.addEventListener("click", () => {
//   clearAllFiltersFunc()
//   filtersModal.style.display = "none"
// })

// // Initialize
// document.addEventListener("DOMContentLoaded", () => {
//   renderProperties()
// })

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
    return `
    <article class="min-w-[280px] max-w-[320px] bg-card rounded-xl overflow-hidden property-card">
      <div class="relative">
        <img src="${h.image}" alt="${h.address}" class="h-44 w-full object-cover">
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


