/**
 * RGB TAIPEI 藝術微噴 - Main Interactive Script
 */
(function () {
  'use strict';

  // 1. Mobile Responsive Navigation (Hamburger Menu)
  var hamburgerBtn = document.querySelector('.js-hamburger');
  var closeNavBtn = document.querySelector('.js-close-responsive-nav');

  function openMobileNav() {
    document.body.classList.add('show-responsive-nav');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    document.body.classList.remove('show-responsive-nav');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileNav);
  }

  if (closeNavBtn) {
    closeNavBtn.addEventListener('click', closeMobileNav);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('show-responsive-nav')) {
      closeMobileNav();
    }
  });

  // 2. Sticky Header Shadow on Scroll
  var siteHeader = document.querySelector('.js-site-header');
  if (siteHeader) {
    function handleScroll() {
      if (window.scrollY > 10) {
        siteHeader.classList.add('on-scroll');
      } else {
        siteHeader.classList.remove('on-scroll');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Back to Top Smooth Scroll
  var backToTopBtns = document.querySelectorAll('.js-back-to-top');
  backToTopBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 4. Copy to Clipboard Button (Email / Address)
  var copyBtns = document.querySelectorAll('.js-copy-btn');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      var originalLabel = btn.getAttribute('data-label') || btn.textContent;

      function showSuccess() {
        btn.classList.add('copied');
        btn.textContent = '已複製 ✓';
        setTimeout(function () {
          btn.classList.remove('copied');
          btn.textContent = originalLabel;
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(showSuccess).catch(function () {
          fallbackCopy(textToCopy, showSuccess);
        });
      } else {
        fallbackCopy(textToCopy, showSuccess);
      }
    });
  });

  function fallbackCopy(text, callback) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      // ignore
    }
    document.body.removeChild(textarea);
  }
})();
