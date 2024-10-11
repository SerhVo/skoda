"use strict";

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// прокрутка страницы до нужного места

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScroll.addEventListener("click", function () {
  
  section1.scrollIntoView({ behavior: "smooth" });
  
});


document.querySelectorAll(".nav__links").forEach(function (navLink) {
  navLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
});


const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  tabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach(function (content) {
    content.classList.remove("operations__content--active");
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});



// Функция для изменения прозрачности
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest("nav").querySelector(".nav__logo");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
};

// Добавляем обработчики событий для 'mouseover' и 'mouseout'
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});



// Получаем координаты элемента

const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;


const headerObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    nav.classList.remove("nav__sticky");
  } else {
    nav.classList.add("nav__sticky");
  }
});

headerObserver.observe(header);

// ------------ Всплытие секций

const allSections = document.querySelectorAll(".section");

function revealSection(entries, observe) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    observe.unobserve(entries[0].target);
  }
}
const sectionsObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

// ------------ Ленивая подгрузка изображений

const imgTargets = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  if (!entries[0].isIntersecting) return;
  entries[0].target.src = entries[0].target.dataset.src;

  entries[0].target.addEventListener("load", function () {
    entries[0].target.classList.remove("lazy-img");
  });
  observer.unobserve(entries[0].target);
}
const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.25 });

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// ------------ Слайдер

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlide = slides.length;

function createDots() {
  dotsContainer.innerHTML = "";
  slides.forEach(function (_, index) {
    const dot = document.createElement("button");
    dot.classList.add("dots__dot");
    dot.setAttribute("data-slide", index);
    if (index == 0) {
      dot.classList.add("dots__dot--active");
    }
    dot.addEventListener("click", function () {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });
}
createDots();

function activateDots(index) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${index}"]`)
    .classList.add("dots__dot--active");
}

dotsContainer.addEventListener("click", function (e) {
  const dot = e.target.closest(".dots__dot");
  if (!dot) return;
  const index = parseInt(dot.getAttribute("data-slide"));
  goToSlide(index);
  activateDots(index);
});

function autoPlay() {
  setInterval(nextSlide, 10000);
}
autoPlay();

function goToSlide(slide) {
  slides.forEach(function (sl, index) {
    sl.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
}
goToSlide(0);

slides.forEach(function (slide, index) {
  slide.style.transform = `translateX(${index * 100}%)`;
});

function nextSlide() {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDots(currSlide);
}

function prewSlide() {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  activateDots(currSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prewSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prewSlide();
  }
});
