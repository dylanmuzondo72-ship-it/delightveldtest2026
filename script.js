document.addEventListener('DOMContentLoaded', () => {
  // Lucide is decorative; the site's essential controls use inline SVG fallbacks.
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons(); } catch (_) { /* non-critical icon enhancement */ }
  }

  // Mobile navigation.
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Floating WhatsApp contact options. The icon is inline SVG and does not rely on a CDN.
  const floating = document.querySelector('.floating-wa');
  const floatingButton = document.querySelector('.floating-main');
  if (floating && floatingButton) {
    floatingButton.addEventListener('click', event => {
      event.stopPropagation();
      const open = floating.classList.toggle('open');
      floatingButton.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => {
      if (!floating.contains(event.target)) {
        floating.classList.remove('open');
        floatingButton.setAttribute('aria-expanded', 'false');
      }
    });
    floating.querySelectorAll('.floating-menu a').forEach(link => link.addEventListener('click', () => {
      floating.classList.remove('open');
      floatingButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Quote form: open a pre-filled WhatsApp message only when the form exists.
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(quoteForm);
      const message = [
        'Hello Delight Veld, I would like to request a consultation.', '',
        `Name: ${data.get('name') || ''}`,
        `Phone: ${data.get('phone') || ''}`,
        `Project location: ${data.get('location') || 'Not specified'}`,
        `Service required: ${data.get('service') || ''}`,
        `Project details: ${data.get('details') || ''}`
      ].join('\n');
      const recipient = String(data.get('recipient') || '263717515513').replace(/\D/g, '');
      window.open(`https://wa.me/${recipient}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }

  // Homepage video: attempt muted inline autoplay; if the browser blocks it, expose a tap-to-play control.
  const heroVideo = document.querySelector('.hero-video');
  const heroPlay = document.querySelector('.hero-video-play');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    const showPlay = () => { if (heroPlay && heroVideo.paused) heroPlay.hidden = false; };
    const hidePlay = () => { if (heroPlay) heroPlay.hidden = true; };
    const tryPlay = () => {
      if (document.visibilityState === 'hidden') return;
      const result = heroVideo.play();
      if (result && typeof result.then === 'function') {
        result.then(hidePlay).catch(showPlay);
      } else {
        if (!heroVideo.paused) hidePlay(); else showPlay();
      }
    };
    heroVideo.addEventListener('playing', hidePlay);
    heroVideo.addEventListener('pause', showPlay);
    heroVideo.addEventListener('error', showPlay);
    ['loadedmetadata', 'loadeddata', 'canplay'].forEach(name => heroVideo.addEventListener(name, tryPlay));
    window.addEventListener('pageshow', tryPlay);
    document.addEventListener('visibilitychange', tryPlay);
    if (heroPlay) heroPlay.addEventListener('click', () => {
      heroVideo.muted = true;
      heroVideo.play().then(hidePlay).catch(showPlay);
    });
    tryPlay();
  }

  // Do not change preload after the customer presses play. Native controls handle loading reliably.
  document.querySelectorAll('.development-video').forEach(video => {
    video.preload = 'metadata';
    video.setAttribute('playsinline', '');
  });

  // Gallery: use the R2 image first. If it fails, use the packaged local fallback image.
  document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.dataset.fallbackUsed !== 'true') {
        image.dataset.fallbackUsed = 'true';
        image.src = fallback;
        const card = image.closest('.gallery-item');
        if (card) {
          card.classList.add('fallback-image');
          const caption = card.querySelector('span');
          if (caption) caption.textContent = 'Illustrative service imagery';
        }
        image.alt = 'Illustrative service image';
      } else {
        image.classList.add('image-failed');
      }
    });
  });

  // Full-screen image lightbox.
  const modal = document.getElementById('imageModal');
  const modalImage = modal ? modal.querySelector('img') : null;
  if (modal && modalImage) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const image = item.querySelector('img');
        if (!image || image.classList.contains('image-failed')) return;
        modalImage.src = image.currentSrc || image.src;
        modalImage.alt = image.alt || 'Expanded gallery photograph';
        if (typeof modal.showModal === 'function') modal.showModal();
        else modal.setAttribute('open', '');
      });
    });
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.addEventListener('click', () => {
      if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
    });
    modal.addEventListener('click', event => {
      if (event.target === modal && typeof modal.close === 'function') modal.close();
    });
    modal.addEventListener('close', () => modalImage.removeAttribute('src'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.hasAttribute('open') && typeof modal.close === 'function') modal.close();
    });
  }
});
