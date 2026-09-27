// Mobile nav toggle, image lightbox, and play videos only while visible.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button type="button">Close</button><img alt=""><p></p>';
  document.body.appendChild(box);
  var bimg = box.querySelector('img'), btxt = box.querySelector('p');
  function close() { box.classList.remove('open'); bimg.src = ''; }
  box.addEventListener('click', function (e) { if (e.target !== bimg) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.querySelectorAll('[data-zoom] img, .result-fig .plate img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function (e) {
      e.preventDefault();
      var cap = img.closest('figure') && img.closest('figure').querySelector('figcaption');
      bimg.src = img.currentSrc || img.src; bimg.alt = img.alt;
      btxt.textContent = cap ? cap.textContent : img.alt;
      box.classList.add('open');
    });
  });

  var vids = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.play().catch(function () {}); } else { en.target.pause(); }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { v.muted = true; io.observe(v); });
  }
});
