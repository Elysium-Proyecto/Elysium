/** @format */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    let currentSlide = 0;
  
    function showSlide(index) {
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
  });