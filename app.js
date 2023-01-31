const menuBtn = document.querySelector('.mobile-menu-btn');
const menuCloseBtn = document.querySelector('.mobile-menu-close-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const leftBtn = document.querySelector('.slide-btn-left');
const rightBtn = document.querySelector('.slide-btn-right');
const slides = document.querySelectorAll('.slide');
const slidesInfo = document.querySelectorAll('.slide-info');
const body = document.querySelector('body');
const carousel = [0, 1, 2];
let animationIsPlaying = false;

// Add event listeners for mobile menu
menuBtn.addEventListener('click', showMenu);
menuCloseBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

function showMenu() {
  body.classList.add('scroll-block');
  mobileNav.classList.add('hide');
  overlay.classList.add('show');
  requestAnimationFrame(() => {
    mobileMenu.classList.add('mobile-menu-show');
  });
}

function closeMenu() {
  body.classList.remove('scroll-block');
  overlay.classList.remove('show');
  mobileNav.classList.remove('hide');

  requestAnimationFrame(() => {
    mobileMenu.classList.add('mobile-menu-hide');
    setTimeout(() => {
      mobileMenu.classList.remove('mobile-menu-hide');
      mobileMenu.classList.remove('mobile-menu-show');
    }, 200);
  });
}

// Add event listeners to nav buttons
leftBtn.addEventListener('click', scrollToLeft);
leftBtn.addEventListener('keyDown', e => {
  if (e.key === 'Enter') scrollToLeft();
});

rightBtn.addEventListener('click', scrollToRight);
rightBtn.addEventListener('keyDown', e => {
  if (e.key === 'Enter') scrollToRight();
});

// Initial position of slides
slides[carousel[0]].classList.add('slide-visible');
slides[carousel[0]].classList.add('slide-up');
slidesInfo[carousel[0]].classList.add('slide-info-ready');
slidesInfo[carousel[0]].classList.add('slide-info-visible');

// Move slide to the right
function scrollToRight() {
  if (!animationIsPlaying) {
    animationIsPlaying = true;

    // prepare second slide
    slides[carousel[1]].classList.add('slide-visible');

    // top slide animation
    requestAnimationFrame(() => {
      slides[carousel[0]].classList.add('slide-move-right');
      // wait for end of animation untill do next steps
      setTimeout(() => {
        slides[carousel[1]].classList.add('slide-up');
        slides[carousel[0]].classList.remove('slide-up');
        slides[carousel[0]].classList.remove('slide-visible');
        slides[carousel[0]].classList.remove('slide-move-right');

        carousel.push(carousel.shift());
        animationIsPlaying = false;
      }, 500);
    });

    //changing slide information
    slidesInfo[carousel[0]].classList.remove('slide-info-visible');
    slidesInfo[carousel[0]].classList.remove('slide-info-ready');
    slidesInfo[carousel[1]].classList.add('slide-info-ready');
    requestAnimationFrame(() => {
      slidesInfo[carousel[1]].classList.add('slide-info-visible');
    });
  }
}

// Move slide to the left
function scrollToLeft() {
  if (!animationIsPlaying) {
    animationIsPlaying = true;

    // prepare bottom slide before start animation
    slides[carousel[2]].classList.add('slide-prepare');
    slides[carousel[2]].classList.add('slide-visible');
    slides[carousel[2]].classList.add('slide-up');
    slides[carousel[0]].classList.remove('slide-up');

    // slide animation
    requestAnimationFrame(() => {
      slides[carousel[2]].classList.add('slide-move-left');
      // wait for end of animation untill do next steps
      setTimeout(() => {
        slides[carousel[2]].classList.remove('slide-move-left');
        slides[carousel[0]].classList.remove('slide-visible');
        slides[carousel[2]].classList.remove('slide-prepare');
        carousel.unshift(carousel.pop());
        animationIsPlaying = false;
      }, 500);
    });

    //changing slide information
    slidesInfo[carousel[0]].classList.remove('slide-info-visible');
    slidesInfo[carousel[0]].classList.remove('slide-info-ready');
    slidesInfo[carousel[2]].classList.add('slide-info-ready');
    requestAnimationFrame(() => {
      slidesInfo[carousel[2]].classList.add('slide-info-visible');
    });
  }
}
