// Gallery functionality
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage")
  const thumbnails = document.querySelectorAll(".gallery-thumbnail")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const newImage = this.dataset.image
      mainImage.src = newImage

      // Update active thumbnail
      thumbnails.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Modal functionality
  const contactModal = document.getElementById("contactModal")
  const tourModal = document.getElementById("tourModal")
  const contactBtn = document.getElementById("contactAgentBtn")
  const tourBtn = document.getElementById("scheduleTourBtn")
  const closeBtns = document.querySelectorAll(".close")

  contactBtn.addEventListener("click", () => {
    contactModal.style.display = "block"
  })

  tourBtn.addEventListener("click", () => {
    tourModal.style.display = "block"
  })

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none"
    })
  })

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none"
    }
  })

  // Form submissions
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Thank you for your inquiry! We will contact you soon.")
      this.closest(".modal").style.display = "none"
      this.reset()
    })
  })
})
