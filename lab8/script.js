let slideIndex = 1; 

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.getElementById("slides");
  const slideItems = slides.children;
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  const totalSlides = [...slideItems].filter(slide => !slide.classList.contains("clone")).length;

  const slideWidthPercent = 100 / slideItems.length; 

  showSlide();

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  prevBtn.addEventListener("click", function () {
    changeSlide(-1);
  });

  nextBtn.addEventListener("click", function () {
    changeSlide(1);
  });

  indicators.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const slideNum = parseInt(e.target.getAttribute("data-slide"));
      currentSlide(slideNum);
    }
  });

  function changeSlide(direction) {
    slideIndex += direction;
    slides.style.transition = "transform 0.5s";
    slides.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;

    setTimeout(function () {
      if (slideIndex >= slideItems.length - 1) {
        slideIndex = 1;
        slides.style.transition = "none";
        slides.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;
      } else if (slideIndex <= 0) {
        slideIndex = slideItems.length - 2;
        slides.style.transition = "none";
        slides.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;
      }
      updateIndicators();
    }, 500);
  }

  function currentSlide(n) {
    slideIndex = n + 1;
    showSlide();
  }

  function showSlide() {
    slides.style.transition = "transform 0.5s";
    slides.style.transform = `translateX(-${slideIndex * slideWidthPercent}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    const dots = document.querySelectorAll(".dot");
    let activeIndex = slideIndex - 1;

    if (activeIndex >= totalSlides) activeIndex = 0;
    if (activeIndex < 0) activeIndex = totalSlides - 1;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }
});
