document.addEventListener('DOMContentLoaded', function () {
  const papier = document.querySelector('.papier-link');
  if (!papier) return;

  let mouseX = 0;
  let mouseY = 0;
  let intervalId = null;

  const createParticle = () => {
    const span = document.createElement('span');
    span.className = 'emoji-confetti';
    span.textContent = '📕';
    span.style.left = mouseX + 'px';
    span.style.top = mouseY + 'px';
    const rotate = Math.random() * 60 - 30; // random rotation between -30 and 30
    span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(1)`;
    document.body.appendChild(span);

    requestAnimationFrame(() => {
      span.style.opacity = '0';
      span.style.top = (mouseY - 50) + 'px';
      span.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(0.5)`;
    });

    setTimeout(() => span.remove(), 1000);
  };

  papier.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  papier.addEventListener('mouseenter', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    createParticle();
    intervalId = setInterval(createParticle, 1000);
  });

  papier.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    intervalId = null;
  });
});
