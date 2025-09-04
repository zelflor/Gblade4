
window.getCSSVariables = function() {
  const cssVars = new Map();

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ":root") {
          const style = rule.style;
          for (let i = 0; i < style.length; i++) {
            const name = style[i];
            if (name.startsWith("--")) {
              const value = style.getPropertyValue(name).trim();
              cssVars.set(name, value);
            }
          }
        }
      }
    } catch (e) {
      console.warn("Cannot read stylesheet:", e);
    }
  }

  return Array.from(cssVars.entries()).map(([name, value]) => {
    const parts = name.replace(/^--/, "").split("-");
    const cleanValue = value.replace("#", "");
    return { name, parts, value, cleanValue };
  });
};