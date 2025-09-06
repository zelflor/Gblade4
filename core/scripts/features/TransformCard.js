window.addEventListener("load", () => {
  const elements = document.querySelectorAll('.mouse-3d-transform');

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    elements.forEach(el => {
      const sensibility = parseFloat(el.dataset.sensibility) || 20;
      const onlyOnHover = el.dataset.hover === "true";
      const inverse = el.dataset.inverse === "true";
      const lock = el.dataset.lock || "none";

      if (onlyOnHover && !el.matches(':hover')) {
        el.style.transform = 'rotateX(0) rotateY(0)';
        return;
      }

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const rotateX = (deltaY / rect.height) * sensibility * (inverse ? -1 : 1);
      const rotateY = (-deltaX / rect.width) * sensibility * (inverse ? -1 : 1);

      let finalX = rotateX;
      let finalY = rotateY;

      if (lock === "x") finalY = 0;
      if (lock === "y") finalX = 0;

      el.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
    });
  });

  document.addEventListener('mouseleave', () => {
    elements.forEach(el => {
      el.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
});
