document.addEventListener('DOMContentLoaded', function () {
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    return; // disable confetti on touch screens
  }

  const papierParagraph = document.querySelector('.history-papier');
  const instagramParagraph = document.querySelector('.history-instagram');
  const consultancyParagraph = document.querySelector('.history-consultancy');


  const setupConfetti = (target, emoji) => {
    if (!target) return;
    let mouseX = 0;
    let mouseY = 0;
    let timeoutId = null;
    const randomDelay = () => 200 + Math.random() * 200; // 300ms to 600ms
    const createParticle = () => {
      const startX = mouseX;
      const startY = mouseY;
      const span = document.createElement('span');
      span.className = 'emoji-confetti';
      span.textContent = emoji;
      span.style.left = startX + 'px';
      span.style.top = startY + 'px';
      const rotate = Math.random() * 60 - 30; // random rotation between -30 and 30
      span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(0.3)`;
      span.style.transition = 'transform 0.2s ease-out';
      document.body.appendChild(span);

      const dx = (Math.random() - 0.5) * 50; // random horizontal shift

      requestAnimationFrame(() => {
        span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(1)`;
      });
      
 setTimeout(() => {
        span.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 1s ease-out';
        span.style.opacity = '0';
        span.style.top = (startY - 80) + 'px';
        span.style.left = (startX + dx) + 'px';
        span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(0.5)`;
      }, 200);

      setTimeout(() => span.remove(), 1200);
    };

    const scheduleParticle = () => {
      timeoutId = setTimeout(() => {
        createParticle();
        scheduleParticle();
      }, randomDelay());
    };

    target.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    target.addEventListener('mouseenter', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      createParticle();
      scheduleParticle();
    });

    target.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
      timeoutId = null;
    });
  };

  setupConfetti(papierParagraph, '📕');
  setupConfetti(instagramParagraph, '📷');
  setupConfetti(consultancyParagraph, '👨‍💻');
});
