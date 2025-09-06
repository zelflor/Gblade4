(function() {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "5px";
  container.style.zIndex = "9999";
  container.style.overflow = "hidden";
  container.style.height = "0";
  container.style.borderRadius = "8px 8px 0px  0px ";
  container.style.borderBottom = "8px solid var(--color-purple-800)";
  container.style.background = "#00000001";
  container.style.transition = "height 0.3s ease";
  container.style.cursor = "pointer";
  container.style.backdropFilter = "blur(250px)";

  const fpsDiv = document.createElement("div");
  fpsDiv.style.fontFamily = "Sora";
  fpsDiv.style.fontSize = "14px";
  fpsDiv.style.color = "var(--color-green-300)";
  fpsDiv.style.background = "var(--color-green-950)";
  fpsDiv.style.padding = "2px 6px";
  fpsDiv.style.borderRadius = "4px";

  const debugDiv = document.createElement("div");
  debugDiv.textContent = "GBlade 4 Running this page with debug mode enable";
  debugDiv.style.fontFamily = "Sora";
  debugDiv.style.fontSize = "12px";
  debugDiv.style.color = "var(--color-purple-350)";
  debugDiv.style.background = "var(--color-purple-950)";
  debugDiv.style.padding = "2px 6px";
  debugDiv.style.borderRadius = "4px";

  const ImageLogo = document.createElement("img");
  ImageLogo.src = "./core/images/favicon_color.png";
  ImageLogo.style.width = "64px";
  ImageLogo.style.height = "64px";
  ImageLogo.style.position = "relative";
  ImageLogo.style.left = "50%";
  ImageLogo.style.transform = "translateX(-50%)";

  container.appendChild(ImageLogo);
  
  container.appendChild(debugDiv);
  container.appendChild(fpsDiv);
  document.body.appendChild(container);

  container.addEventListener("mouseenter", () => {
    container.style.height = "250px";
    container.style.cursor = "initial";
  });
  container.addEventListener("mouseleave", () => {
    container.style.height = "0";
  });

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = "./core/images/favicon.png";
  document.head.appendChild(link);

  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fps = 0;

  function updateFPS(now) {
    frameCount++;
    const delta = now - lastFrameTime;
    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      fpsDiv.textContent = fps + " FPS";
      frameCount = 0;
      lastFrameTime = now;
    }
    requestAnimationFrame(updateFPS);
  }
  requestAnimationFrame(updateFPS);

  function fixImages() {
    document.querySelectorAll("img:not([src]), img[src='']").forEach(img => {
      const isEasterEgg = Math.random() < 1/30;
      img.src = isEasterEgg 
        ? "./core/images/placeholder/easter_egg.png"
        : "./core/images/placeholder/default.png";
    });
  }

  fixImages();
  const observer = new MutationObserver(fixImages);
  observer.observe(document.body, { childList: true, subtree: true });
})();
