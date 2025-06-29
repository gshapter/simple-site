document.addEventListener('DOMContentLoaded', function () {
  const papier = document.querySelector('.papier-link');
  if (!papier) return;

  let mouseX = 0;
  let mouseY = 0;
  let timeoutId = null;

  const randomDelay = () => 300 + Math.random() * 300; // 300ms to 600ms

  const createParticle = () => {
    const startX = mouseX;
    const startY = mouseY;
    const span = document.createElement('span');
    span.className = 'emoji-confetti';
    span.textContent = '📕';
    span.style.left = startX + 'px';
    span.style.top = startY + 'px';
    const rotate = Math.random() * 60 - 30; // random rotation between -30 and 30
    span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(1)`;
    document.body.appendChild(span);


    const dx = (Math.random() - 0.5) * 20; // random horizontal shift

    requestAnimationFrame(() => {
      span.style.opacity = '0';
      span.style.top = (startY - 50) + 'px';
      span.style.left = (startX + dx) + 'px';
      span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(0.5)`;
    });

    setTimeout(() => span.remove(), 1000);
  };

  const scheduleParticle = () => {
    timeoutId = setTimeout(() => {
      createParticle();
      scheduleParticle();
    }, randomDelay());
  };

  papier.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  papier.addEventListener('mouseenter', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    createParticle();
    scheduleParticle();
  });

  papier.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId);
    timeoutId = null;
  });
});
