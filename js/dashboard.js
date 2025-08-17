// Mock data for dashboard
const dashboardData = {
  properties: [
    {
      id: 1,
      title: "Modern Downtown Condo",
      price: 850000,
      location: "Downtown Seattle, WA",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      status: "Active",
      views: 234,
      inquiries: 12,
      image: "modern-downtown-condo.png",
      dateAdded: "2024-01-15",
      type: "Condo",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: 1250000,
      location: "Bellevue, WA",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      status: "Pending",
      views: 189,
      inquiries: 8,
      image: "suburban-family-home.png",
      dateAdded: "2024-01-10",
      type: "House",
    },
    {
      id: 3,
      title: "Luxury Waterfront Villa",
      price: 2100000,
      location: "Mercer Island, WA",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      status: "Active",
      views: 456,
      inquiries: 23,
      image: "luxury-waterfront-villa.png",
      dateAdded: "2024-01-08",
      type: "Villa",
    },
  ],
  inquiries: [
    {
      id: 1,
      propertyTitle: "Modern Downtown Condo",
      clientName: "John Smith",
      clientEmail: "john.smith@email.com",
      clientPhone: "(206) 555-0123",
      message: "I'm interested in scheduling a viewing for this weekend. Is Saturday morning available?",
      type: "Tour Request",
      date: "2024-01-16",
      status: "New",
    },
    {
      id: 2,
      propertyTitle: "Luxury Waterfront Villa",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.j@email.com",
      clientPhone: "(425) 555-0456",
      message: "What's the HOA fee for this property? Also, are pets allowed?",
      type: "General Inquiry",
      date: "2024-01-15",
      status: "Responded",
    },
    {
      id: 3,
      propertyTitle: "Suburban Family Home",
      clientName: "Mike Chen",
      clientEmail: "mike.chen@email.com",
      clientPhone: "(206) 555-0789",
      message: "I'd like to make an offer. Can we discuss the terms?",
      type: "Offer Interest",
      date: "2024-01-14",
      status: "Priority",
    },
  ],
}

// State management
let currentProperties = [...dashboardData.properties]
const currentInquiries = [...dashboardData.inquiries]

// DOM elements
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")
const propertiesTableBody = document.getElementById("propertiesTableBody")
const inquiriesList = document.getElementById("inquiriesList")
const topProperties = document.getElementById("topProperties")
const propertySearch = document.getElementById("propertySearch")
const statusFilter = document.getElementById("statusFilter")
const addPropertyBtn = document.getElementById("addPropertyBtn")
const addPropertyModal = document.getElementById("addPropertyModal")
const addPropertyForm = document.getElementById("addPropertyForm")
const closeModal = document.querySelector(".close")

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "active":
      return "status-active"
    case "pending":
      return "status-pending"
    case "sold":
      return "status-sold"
    case "draft":
      return "status-draft"
    default:
      return "status-draft"
  }
}

function getInquiryStatusClass(status) {
  switch (status.toLowerCase()) {
    case "new":
      return "inquiry-new"
    case "responded":
      return "inquiry-responded"
    case "priority":
      return "inquiry-priority"
    default:
      return "status-draft"
  }
}

// Tab functionality
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tab

    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Update active tab content
    tabContents.forEach((content) => content.classList.remove("active"))
    document.getElementById(targetTab).classList.add("active")
  })
})

// Render properties table
function renderPropertiesTable() {
  propertiesTableBody.innerHTML = currentProperties
    .map(
      (property) => `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center gap-3">
          <img src="${property.image}" alt="${property.title}" class="w-12 h-12 rounded-lg object-cover" onerror="this.src='https://via.placeholder.com/48x48?text=Property'">
          <div>
            <div class="font-medium">${property.title}</div>
            <div class="text-sm text-muted-foreground flex items-center">
              <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              ${property.location}
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap font-medium">${formatPrice(property.price)}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center">
            <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            ${property.beds}
          </div>
          <div class="flex items-center">
            <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3"></path>
            </svg>
            ${property.baths}
          </div>
          <div class="flex items-center">
            <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4a1 1 0 011-1h4M4 16v4a1 1 0 001 1h4m8-16h4a1 1 0 011 1v4m-4 12h4a1 1 0 001-1v-4"></path>
            </svg>
            ${property.sqft}
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="status-badge ${getStatusClass(property.status)}">${property.status}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <div>${property.views} views</div>
        <div class="text-muted-foreground">${property.inquiries} inquiries</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <button class="p-2 hover:bg-secondary rounded" onclick="viewProperty(${property.id})">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
          <button class="p-2 hover:bg-secondary rounded" onclick="editProperty(${property.id})">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button class="p-2 hover:bg-secondary rounded text-red-600" onclick="deleteProperty(${property.id})">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("")
}

// Render inquiries
function renderInquiries() {
  inquiriesList.innerHTML = currentInquiries
    .map(
      (inquiry) => `
    <div class="bg-card rounded-lg border border-border p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h4 class="font-semibold">${inquiry.propertyTitle}</h4>
          <p class="text-sm text-muted-foreground">${inquiry.type} • ${inquiry.date}</p>
        </div>
        <span class="status-badge ${getInquiryStatusClass(inquiry.status)}">${inquiry.status}</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <span class="font-medium">${inquiry.clientName}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm">${inquiry.clientEmail}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span class="text-sm">${inquiry.clientPhone}</span>
        </div>
      </div>
      
      <p class="text-sm text-muted-foreground mb-4">${inquiry.message}</p>
      
      <div class="flex gap-2">
        <button class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
          <svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Reply
        </button>
        <button class="px-3 py-1 border border-border rounded text-sm hover:bg-secondary">
          <svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Call
        </button>
        <button class="px-3 py-1 border border-border rounded text-sm hover:bg-secondary">
          <svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V8m-6 4h6"></path>
          </svg>
          Schedule
        </button>
      </div>
    </div>
  `,
    )
    .join("")
}

// Render top properties
function renderTopProperties() {
  const sortedProperties = [...currentProperties].sort((a, b) => b.views - a.views).slice(0, 3)

  topProperties.innerHTML = sortedProperties
    .map(
      (property, index) => `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
          ${index + 1}
        </div>
        <div>
          <div class="font-medium text-sm">${property.title}</div>
          <div class="text-xs text-muted-foreground">${property.views} views</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-sm font-medium">${property.inquiries} inquiries</div>
        <div class="text-xs text-muted-foreground">
          ${((property.inquiries / property.views) * 100).toFixed(1)}% rate
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Filter properties
function filterProperties() {
  const searchTerm = propertySearch.value.toLowerCase()
  const statusValue = statusFilter.value

  currentProperties = dashboardData.properties.filter((property) => {
    const matchesSearch =
      searchTerm === "" ||
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)

    const matchesStatus = statusValue === "all" || property.status.toLowerCase() === statusValue.toLowerCase()

    return matchesSearch && matchesStatus
  })

  renderPropertiesTable()
}

// Property actions
function viewProperty(id) {
  const property = dashboardData.properties.find((p) => p.id === id)
  if (property) {
    window.open(`property-${id}.html`, "_blank")
  }
}

function editProperty(id) {
  alert(`Edit property ${id} - This would open an edit form`)
}

function deleteProperty(id) {
  if (confirm("Are you sure you want to delete this property?")) {
    dashboardData.properties = dashboardData.properties.filter((p) => p.id !== id)
    currentProperties = currentProperties.filter((p) => p.id !== id)
    renderPropertiesTable()
    renderTopProperties()
  }
}

// Modal functionality
addPropertyBtn.addEventListener("click", () => {
  addPropertyModal.style.display = "block"
})

closeModal.addEventListener("click", () => {
  addPropertyModal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === addPropertyModal) {
    addPropertyModal.style.display = "none"
  }
})

// Add property form
addPropertyForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const newProperty = {
    id: Date.now(),
    title: formData.get("title"),
    price: Number.parseInt(formData.get("price")),
    location: formData.get("location"),
    beds: Number.parseInt(formData.get("beds")),
    baths: Number.parseInt(formData.get("baths")),
    sqft: formData.get("sqft"),
    status: formData.get("status"),
    type: formData.get("type"),
    views: 0,
    inquiries: 0,
    image: "https://via.placeholder.com/400x300?text=New+Property",
    dateAdded: new Date().toISOString().split("T")[0],
  }

  dashboardData.properties.push(newProperty)
  currentProperties.push(newProperty)

  renderPropertiesTable()
  renderTopProperties()

  addPropertyModal.style.display = "none"
  e.target.reset()

  alert("Property added successfully!")
})

// Event listeners
propertySearch.addEventListener("input", filterProperties)
statusFilter.addEventListener("change", filterProperties)

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  renderPropertiesTable()
  renderInquiries()
  renderTopProperties()
})
