/* LuxeMart intro slider - vanilla JS
   Features:
   - Auto-play with configurable delay
   - Pause on hover
   - Click dots to navigate
   - Basic touch swipe support for mobile
*/

(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('dots');
  const slider = document.getElementById('slider');
  const AUTO_DELAY = 5000; // ms per slide
  let current = 0;
  let timer = null;
  let isPaused = false;

  // create dots
  slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to slide ${i+1}`);
    btn.dataset.index = i;
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
  });

  const dots = Array.from(dotsWrap.children);

  function setActive(index) {
    slides.forEach((s, i) => {
      const active = i === index;
      s.setAttribute('aria-hidden', !active);
      s.dataset.active = active ? "true" : "false";
    });
    dots.forEach((d, i) => {
      if (i === index) d.classList.add('active'); else d.classList.remove('active');
    });
    current = index;
  }

  function goTo(index) {
    setActive(index);
    resetTimer();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (!isPaused) next();
    }, AUTO_DELAY);
  }

  function resetTimer() {
    startTimer();
  }

  // pause on hover/focus
  slider.addEventListener('mouseenter', () => isPaused = true);
  slider.addEventListener('mouseleave', () => isPaused = false);

  // accessibility: pause when focusing inside
  slider.addEventListener('focusin', () => isPaused = true);
  slider.addEventListener('focusout', () => isPaused = false);

  // touch support
  (function addTouch() {
    let startX = 0;
    let dx = 0;
    slider.addEventListener('touchstart', (e) => {
      isPaused = true;
      startX = e.touches[0].clientX;
    }, {passive:true});

    slider.addEventListener('touchmove', (e) => {
      dx = e.touches[0].clientX - startX;
    }, {passive:true});

    slider.addEventListener('touchend', () => {
      isPaused = false;
      if (Math.abs(dx) > 60) {
        if (dx < 0) next();
        else prev();
      }
      dx = 0;
    });
  })();

  // Init
  setActive(0);
  startTimer();

  // Example handlers for buttons (update to your routes)
  document.getElementById('continueBtn').addEventListener('click', (e) => {
    // by default anchors navigate — you can do tracking here
  });

  // Social placeholders (replace with real OAuth handlers)
  document.getElementById('googleBtn').addEventListener('click', () => alert('Google login — add OAuth flow'));
  document.getElementById('appleBtn').addEventListener('click', () => alert('Apple login — add OAuth flow'));
  document.getElementById('fbBtn').addEventListener('click', () => alert('Facebook login — add OAuth flow'));
})();
