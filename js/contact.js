document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")
  const errorMessage = document.getElementById("errorMessage")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const inquiryType = formData.get("inquiryType")
    const message = formData.get("message")

    // Basic validation
    if (!firstName || !lastName || !email || !inquiryType || !message) {
      errorMessage.style.display = "block"
      successMessage.style.display = "none"
      return
    }

    // Hide error message
    errorMessage.style.display = "none"

    // Simulate form submission
    setTimeout(() => {
      successMessage.style.display = "block"
      this.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none"
      }, 5000)
    }, 500)
  })

  // FAQ functionality
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const targetId = this.dataset.target
      const answer = document.getElementById(targetId)
      const icon = this.querySelector("svg")

      // Toggle answer visibility
      if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden")
        icon.style.transform = "rotate(180deg)"
      } else {
        answer.classList.add("hidden")
        icon.style.transform = "rotate(0deg)"
      }
    })
  })

  // Schedule consultation button
  const scheduleBtn = document.getElementById("scheduleConsultation")
  scheduleBtn.addEventListener("click", () => {
    // Scroll to contact form
    contactForm.scrollIntoView({ behavior: "smooth" })

    // Pre-select consultation inquiry type
    const inquirySelect = document.getElementById("inquiryType")
    inquirySelect.value = "consultation"

    // Focus on first name field
    setTimeout(() => {
      document.getElementById("firstName").focus()
    }, 500)
  })

  // Form field enhancements
  const phoneInput = document.getElementById("phone")
  phoneInput.addEventListener("input", (e) => {
    // Basic phone number formatting
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{3})/, "($1) $2")
    }
    e.target.value = value
  })

  // Email validation
  const emailInput = document.getElementById("email")
  emailInput.addEventListener("blur", (e) => {
    const email = e.target.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email && !emailRegex.test(email)) {
      e.target.style.borderColor = "#ef4444"
    } else {
      e.target.style.borderColor = ""
    }
  })

  // Character counter for message
  const messageTextarea = document.getElementById("message")
  const messageContainer = messageTextarea.parentElement

  // Create character counter
  const charCounter = document.createElement("div")
  charCounter.className = "text-sm text-muted-foreground text-right mt-1"
  charCounter.textContent = "0 characters"
  messageContainer.appendChild(charCounter)

  messageTextarea.addEventListener("input", (e) => {
    const length = e.target.value.length
    charCounter.textContent = `${length} characters`

    if (length > 500) {
      charCounter.style.color = "#ef4444"
    } else {
      charCounter.style.color = ""
    }
  })
})
