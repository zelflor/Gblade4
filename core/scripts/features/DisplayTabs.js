window.addEventListener("load", () => {
  document.querySelectorAll('[data-tab-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const collection = btn.getAttribute('data-tab-collection');
      const tabId = btn.getAttribute('data-tab-btn');

      document.querySelectorAll(
        `[data-tab-collection="${collection}"][data-tab]`
      ).forEach(tab => tab.style.display = 'none');

      const target = document.querySelector(
        `[data-tab-collection="${collection}"][data-tab="${tabId}"]`
      );
      if (target) target.style.display = 'flex';
    });
  });
});
