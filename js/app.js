// Property data
const properties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    price: 850000,
    location: "Downtown Seattle, WA",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image: "modern-downtown-condo.png",
    type: "Condo",
    featured: true,
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 1250000,
    location: "Bellevue, WA",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    image: "suburban-family-home.png",
    type: "House",
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Waterfront Villa",
    price: 2100000,
    location: "Mercer Island, WA",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image: "luxury-waterfront-villa.png",
    type: "Villa",
    featured: true,
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    price: 425000,
    location: "Capitol Hill, Seattle",
    beds: 1,
    baths: 1,
    sqft: "650",
    image: "cozy-studio-apartment.png",
    type: "Apartment",
    featured: false,
  },
  {
    id: 5,
    title: "Historic Craftsman Home",
    price: 975000,
    location: "Fremont, Seattle",
    beds: 3,
    baths: 2,
    sqft: "1,850",
    image: "historic-craftsman-home.png",
    type: "House",
    featured: false,
  },
  {
    id: 6,
    title: "New Construction Townhouse",
    price: 1450000,
    location: "Kirkland, WA",
    beds: 3,
    baths: 3,
    sqft: "2,200",
    image: "new-construction-townhouse.png",
    type: "Townhouse",
    featured: true,
  },
]

// State management
let currentFilters = {
  search: "",
  types: [],
  priceRange: [0, 3000000],
  minBeds: "",
  minBaths: "",
  sortBy: "price-asc",
  featuredOnly: false,
}

// DOM elements
const searchInput = document.getElementById("searchInput")
const propertyGrid = document.getElementById("propertyGrid")
const propertyCount = document.getElementById("propertyCount")
const noResults = document.getElementById("noResults")
const sortBy = document.getElementById("sortBy")
const bedsFilter = document.getElementById("bedsFilter")
const bathsFilter = document.getElementById("bathsFilter")
const activeFilters = document.getElementById("activeFilters")
const filterBtns = document.querySelectorAll(".filter-btn")
const moreFiltersBtn = document.getElementById("moreFiltersBtn")
const filtersModal = document.getElementById("filtersModal")
const closeModal = document.querySelector(".close")
const featuredOnly = document.getElementById("featuredOnly")
const clearFiltersBtn = document.getElementById("clearFiltersBtn")
const clearAllFilters = document.getElementById("clearAllFilters")

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function createPropertyCard(property) {
  return `
        <div class="property-card bg-card rounded-lg overflow-hidden border border-border">
            <div class="relative">
                <img
                    src="${property.image}"
                    alt="${property.title}"
                    class="w-full h-48 object-cover"
                    onerror="this.src='https://via.placeholder.com/400x300?text=Property+Image'"
                />
                <button class="absolute top-3 right-3 h-8 w-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </button>
                ${property.featured ? '<span class="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground rounded text-sm">Featured</span>' : ""}
            </div>

            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="px-2 py-1 border border-border rounded text-sm">${property.type}</span>
                    <span class="text-2xl font-bold text-primary">${formatPrice(property.price)}</span>
                </div>

                <h4 class="font-semibold text-lg mb-2">${property.title}</h4>

                <div class="flex items-center text-muted-foreground mb-3">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-sm">${property.location}</span>
                </div>

                <div class="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 15v-4a2 2 0 012-2h4a2 2 0 012 2v4"></path>
                            </svg>
                            <span>${property.beds} beds</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l3-3 3 3"></path>
                            </svg>
                            <span>${property.baths} baths</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4a1 1 0 011-1h4M4 16v4a1 1 0 001 1h4m8-16h4a1 1 0 011 1v4m-4 12h4a1 1 0 001-1v-4"></path>
                            </svg>
                            <span>${property.sqft} sqft</span>
                        </div>
                    </div>
                </div>

                <a href="property-${property.id}.html" class="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    View Details
                </a>
            </div>
        </div>
    `
}

function filterAndSortProperties() {
  const filtered = properties.filter((property) => {
    // Search query filter
    const matchesSearch =
      currentFilters.search === "" ||
      property.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      property.type.toLowerCase().includes(currentFilters.search.toLowerCase())

    // Property type filter
    const matchesType = currentFilters.types.length === 0 || currentFilters.types.includes(property.type)

    // Price range filter
    const matchesPrice =
      property.price >= currentFilters.priceRange[0] && property.price <= currentFilters.priceRange[1]

    // Bedroom filter
    const matchesBeds = currentFilters.minBeds === "" || property.beds >= Number.parseInt(currentFilters.minBeds)

    // Bathroom filter
    const matchesBaths = currentFilters.minBaths === "" || property.baths >= Number.parseInt(currentFilters.minBaths)

    // Featured filter
    const matchesFeatured = !currentFilters.featuredOnly || property.featured

    return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesBaths && matchesFeatured
  })

  // Sort properties
  filtered.sort((a, b) => {
    switch (currentFilters.sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "beds-desc":
        return b.beds - a.beds
      case "sqft-desc":
        return Number.parseInt(b.sqft.replace(",", "")) - Number.parseInt(a.sqft.replace(",", ""))
      default:
        return 0
    }
  })

  return filtered
}

function renderProperties() {
  const filtered = filterAndSortProperties()

  if (filtered.length === 0) {
    propertyGrid.style.display = "none"
    noResults.style.display = "block"
  } else {
    propertyGrid.style.display = "grid"
    noResults.style.display = "none"
    propertyGrid.innerHTML = filtered.map(createPropertyCard).join("")
  }

  propertyCount.textContent = `${filtered.length} Properties Available`
  updateActiveFiltersCount()
}

function updateActiveFiltersCount() {
  const count = [
    currentFilters.types.length,
    currentFilters.minBeds ? 1 : 0,
    currentFilters.minBaths ? 1 : 0,
    currentFilters.featuredOnly ? 1 : 0,
    currentFilters.search ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  if (count > 0) {
    activeFilters.textContent = `${count} active`
    activeFilters.style.display = "inline"
  } else {
    activeFilters.style.display = "none"
  }
}

function clearAllFiltersFunc() {
  currentFilters = {
    search: "",
    types: [],
    priceRange: [0, 3000000],
    minBeds: "",
    minBaths: "",
    sortBy: "price-asc",
    featuredOnly: false,
  }

  // Reset UI elements
  searchInput.value = ""
  bedsFilter.value = ""
  bathsFilter.value = ""
  sortBy.value = "price-asc"
  featuredOnly.checked = false

  // Reset filter buttons
  filterBtns.forEach((btn) => {
    btn.classList.remove("filter-active")
  })

  renderProperties()
}

// Event listeners
searchInput.addEventListener("input", (e) => {
  currentFilters.search = e.target.value
  renderProperties()
})

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type
    if (currentFilters.types.includes(type)) {
      currentFilters.types = currentFilters.types.filter((t) => t !== type)
      btn.classList.remove("filter-active")
    } else {
      currentFilters.types.push(type)
      btn.classList.add("filter-active")
    }
    renderProperties()
  })
})

bedsFilter.addEventListener("change", (e) => {
  currentFilters.minBeds = e.target.value
  renderProperties()
})

bathsFilter.addEventListener("change", (e) => {
  currentFilters.minBaths = e.target.value
  renderProperties()
})

sortBy.addEventListener("change", (e) => {
  currentFilters.sortBy = e.target.value
  renderProperties()
})

featuredOnly.addEventListener("change", (e) => {
  currentFilters.featuredOnly = e.target.checked
  renderProperties()
})

// Modal functionality
moreFiltersBtn.addEventListener("click", () => {
  filtersModal.style.display = "block"
})

closeModal.addEventListener("click", () => {
  filtersModal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === filtersModal) {
    filtersModal.style.display = "none"
  }
})

clearFiltersBtn.addEventListener("click", clearAllFiltersFunc)
clearAllFilters.addEventListener("click", () => {
  clearAllFiltersFunc()
  filtersModal.style.display = "none"
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProperties()
})
