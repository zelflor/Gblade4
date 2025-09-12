const emojis = [
  { id: "test", src: "/core/images/emotes/coin.png", name: "coin" },
  { id: "gb", src: "/core/images/favicon_color.png", name: "GB4" },
  { id: "warn", src: "/core/images/emotes/warn.png", name: "WARNING" },
];

const emojiMap = {};
emojis.forEach(e => {
  emojiMap[e.id] = e;
});

function replaceCustomEmojis(node) {
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);

  let textNode;
  const nodesToReplace = [];

  while ((textNode = treeWalker.nextNode())) {
    const matches = textNode.nodeValue.match(/:([a-zA-Z0-9_]+):/g);
    if (matches) {
      nodesToReplace.push(textNode);
    }
  }

  nodesToReplace.forEach(textNode => {
    const parent = textNode.parentNode;
    const parts = textNode.nodeValue.split(/(:[a-zA-Z0-9_]+:)/g);

    const frag = document.createDocumentFragment();

    parts.forEach(part => {
      const match = part.match(/^:([a-zA-Z0-9_]+):$/);
      if (match) {
        const id = match[1];
        const emoji = emojiMap[id];
        if (emoji) {
          const span = document.createElement("span");
          span.className = "emoji";
          span.style.backgroundImage = `url("${emoji.src}")`;
          span.setAttribute("data-id", emoji.id);
          span.setAttribute("data-name", emoji.name);
          frag.appendChild(span);
          return;
        }
      }
      frag.appendChild(document.createTextNode(part));
    });

    parent.replaceChild(frag, textNode);
  });
}

function injectEmojiStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .emoji {
        position: relative;
      display: inline-block;
      width: 1.25em;
      height: 1.25em;
      vertical-align: middle;
      background-size: cover;
      background-position: center;
    }
  .emoji::after {
        content: attr(data-name);
        position: absolute;
        background: var(--color-container);
        color: var(--color-text);
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 0.75em;
        text-transform: capitalize;
        white-space: nowrap;
        font-family: Sora;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        pointer-events: none;
        backdrop-filter: blur(250px);
        z-index: 10;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        opacity:0;
         transition: 100ms all;
    }
        .emoji:hover::after {
        transition: 100ms all;
         transform: translateX(-50%) translateY(-120%);
            opacity:1;
        }

  `;
  document.body.appendChild(style);
}

window.addEventListener("load", () => {
  injectEmojiStyle();
  replaceCustomEmojis(document.body);
});
