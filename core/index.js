const DEBUG_MODE = true;
const CSS_PATH = "./core/css/main.css";
const DEBUG_SCRIPT_PATH = "./core/scripts/debug/debug.js";

const FEATURES = [
  {
    name: "variables",
    path: "./core/css/variables.css",
    description: "All custom CSS variables",
    enabled: true
  },
  {
    name: "defaultPreset",
    path: "./core/css/features/defaultPreset.css",
    description: "Default preset for themes",
    enabled: true
  },
  {
    name: "ListVariables",
    path: "./core/scripts/features/ListVariables.js",
    description: "List all variables present in the CSS in one function",
    enabled: true
  },
  {
    name: "TransformCard",
    path: "./core/scripts/features/TransformCard.js",
    description: "Create a 3D card that moves in relation to the mouse",
    enabled: false
  },
  
  // Add a Addon
  // {
  //   name: "CustomName",
  //   path: "./core/addons/CustomName/FeaturesName.js",
  //   description: "A custom description",
  //   enabled: true
  // },
];

function injectCSS(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

function injectScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.defer = true;
  document.head.appendChild(script);
}

function loadFeatures(features) {
  features.forEach(feature => {
    if (feature.enabled) {
      if (feature.path.endsWith(".css")) {
        injectCSS(feature.path);
      } else if (feature.path.endsWith(".js")) {
        injectScript(feature.path);
      }
    }
  });
}

(function init() {
  injectCSS(CSS_PATH);
  if (DEBUG_MODE) injectScript(DEBUG_SCRIPT_PATH);
  loadFeatures(FEATURES);
})();
