// Import styles
import "./styles/style.scss";

// Wait for the page to load before removing the "body-container" class from the body.
window.addEventListener("load", () => {
  document.getElementsByTagName("body")[0].classList.remove("body-container");
});

// Add parallax effect to images
const parallaxElements = [
  {
    element: document.querySelector("#over-the-moon-1-chanel"),
    defaultPositionY: window.innerWidth < 400 ? 45 : 150,
    speed: 0.86,
  },
  {
    element: document.querySelector("#over-the-moon-2-chanel"),
    defaultPositionY: window.innerWidth < 400 ? 200 : 360,
    speed: 0.89,
  },
];

function addParallaxScrollListener({ element, defaultPositionY, speed }) {
  const elementPositionY = element.offsetTop;

  window.addEventListener("scroll", () => {
    // Calculate the new position of the image based on the current scroll position.
    const scrollPosition = window.pageYOffset;
    const newElementPositionY =
      elementPositionY - defaultPositionY - scrollPosition * speed;

    // Update the background position of the image.
    element.style.backgroundPositionY = `${newElementPositionY}px`;
  });
}

parallaxElements.forEach((element) => addParallaxScrollListener(element));

//  Slider

const sliderItems = document.querySelectorAll(".slider-item");
const sliderIndicator = document.getElementById("indicator-txt");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");

let currentSlide = 1;
let slideInterval;
const intervalDuration = 5000;

// Show the specified slide.
function showSlide(slide) {
  sliderItems.forEach((item) => {
    // Hide all slides.
    item.style.opacity = 0;
    item.style.transform = "translateX(-100%)";
  });

  // Show the specified slide.
  slide.style.opacity = 1;
  slide.style.transform = "translateX(0%)";

  // Show or hide the left and right arrows depending on the current slide.
  currentSlide === 1
    ? (rightArrow.style.opacity = 0)
    : (rightArrow.style.opacity = 1);

  currentSlide === sliderItems.length
    ? (leftArrow.style.opacity = 0)
    : (leftArrow.style.opacity = 1);

  // Update the current slide number.
  currentSlide = Array.from(sliderItems).indexOf(slide) + 1;
  sliderIndicator.innerHTML = `${currentSlide} / ${sliderItems.length}`;
}

// Handle left arrow click.
function handleLeftArrowClick() {
  const prevSlide =
    currentSlide === 1
      ? sliderItems[sliderItems.length - 1]
      : sliderItems[currentSlide - 2];
  showSlide(prevSlide);

  clearInterval(slideInterval);
  slideInterval = setInterval(handleAutoSlide, intervalDuration);
}

// Handle right arrow click.
function handleRightArrowClick() {
  const nextSlide =
    currentSlide === sliderItems.length
      ? sliderItems[0]
      : sliderItems[currentSlide];
  showSlide(nextSlide);

  // Reset the slide interval timer.
  clearInterval(slideInterval);
  slideInterval = setInterval(handleAutoSlide, intervalDuration);
}

// Automate moving slides.
function handleAutoSlide() {
  const nextSlide =
    currentSlide === sliderItems.length
      ? sliderItems[0]
      : sliderItems[currentSlide];
  showSlide(nextSlide);
}

// Start the automatic slide interval.
slideInterval = setInterval(handleAutoSlide, intervalDuration);

leftArrow.addEventListener("click", handleLeftArrowClick);
rightArrow.addEventListener("click", handleRightArrowClick);

const slider1 = document.querySelector("#slider-1");
initializeSlider(
  slider1,
  ".slider-item",
  "#left-arrow",
  "#right-arrow",
  "#indicator-txt"
);

const slider2 = document.querySelector("#slider-2");
initializeSlider(
  slider2,
  ".slider-item",
  "#left-arrow",
  "#right-arrow",
  "#indicator-txt"
);
