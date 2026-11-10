document.addEventListener('DOMContentLoaded', () => {
  // Render the Lucide icons after the library is available.
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
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
  if (year) year.textContent = new Date().getFullYear();

  // Floating WhatsApp contact button and its two contact choices.
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
    floating.querySelectorAll('.floating-menu a').forEach(link => {
      link.addEventListener('click', () => {
        floating.classList.remove('open');
        floatingButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Quote form opens a prefilled WhatsApp message.
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

  // Homepage hero video: muted inline autoplay, with an accessible manual fallback.
  const heroVideo = document.querySelector('.hero-video');
  const heroPlay = document.querySelector('.hero-video-play');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    const attemptHeroPlayback = () => {
      if (document.visibilityState === 'hidden') return;
      const request = heroVideo.play();
      if (request && typeof request.catch === 'function') {
        request.catch(() => { if (heroPlay) heroPlay.hidden = false; });
      }
    };
    ['loadedmetadata', 'loadeddata', 'canplay'].forEach(name =>
      heroVideo.addEventListener(name, attemptHeroPlayback, { once: true })
    );
    window.addEventListener('pageshow', attemptHeroPlayback);
    heroVideo.addEventListener('playing', () => { if (heroPlay) heroPlay.hidden = true; });
    attemptHeroPlayback();
  }
  if (heroPlay && heroVideo) {
    heroPlay.addEventListener('click', () => {
      heroVideo.play().then(() => { heroPlay.hidden = true; })
        .catch(() => { heroPlay.hidden = false; });
    });
  }

  // Development video uses native controls and a local MP4 source.
  document.querySelectorAll('.development-video').forEach(video => {
    video.preload = 'metadata';
    video.removeAttribute('autoplay');
    video.controls = true;
  });

  // Gallery lightbox: tap/click any gallery image to enlarge it.
  const modal = document.getElementById('imageModal');
  const modalImage = modal ? modal.querySelector('img') : null;
  if (modal && modalImage) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const image = item.dataset.image || item.querySelector('img')?.currentSrc || item.querySelector('img')?.src;
        if (!image) return;
        modalImage.src = image;
        if (typeof modal.showModal === 'function') modal.showModal();
        else modal.setAttribute('open', '');
      });
    });
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', event => {
      if (event.target === modal) modal.close();
    });
    modal.addEventListener('close', () => { modalImage.removeAttribute('src'); });
  }
});
