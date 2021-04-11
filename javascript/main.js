//jshint esversion:6

// Navigation Menu

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function bodyScrollingToggle(){
    document.body.classList.toggle('hidden-scrolling');
  }
  function fadeOutEffect(){
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  document.addEventListener("click", (event) => {
    if(event.target.classList.contains("link-item")){
      if(event.target.hash !== ""){
        event.preventDefault();
        const hash = event.target.hash;
        console.log(hash);
        // Deactivate Active Section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // Activate New Section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // Deactivate Navigation Menu Active Link
        navMenu.querySelector(".active").
        classList.add("outer-shadow", "hover-in-shadow");
        navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
        if(navMenu.classList.contains("open")){
          // Activate Navigation Menu New Link
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // Close Navigation Menu
          hideNavMenu();
        }
        else{
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) =>{
            if(hash === item.hash){
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        window.location.hash = hash;
      }
    }
  });
})();

// About Section Tabs

(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("tab-items") && !event.target.classList.contains("active")){
      const target = event.target.getAttribute("data-target");
      tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      event.target.classList.add("outer-shadow", "active");
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

// Testimonial Section Slider

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container");
  const slides = sliderContainer.querySelectorAll(".testi-item");
  const slideWidth = sliderContainer.offsetWidth;
  const prevBtn = document.querySelector(".testi-slider-nav .prev");
  const nextBtn = document.querySelector(".testi-slider-nav .next");
  const activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });

  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () =>{
    if(slideIndex === slides.length-1){
      slideIndex = 0;
    }
    else{
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () =>{
    if(slideIndex === 0){
      slideIndex = slides.length-1;
    }
    else{
      slideIndex--;
    }
    slider();
  });

  function slider(){
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
  }
  slider();
})();

// Hide all Inactive Sections

(() => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    if(!section.classList.contains("active")){
      section.classList.add("hide");
    }
  });
})();

// Preloader

window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
