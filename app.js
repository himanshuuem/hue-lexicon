import { COLORS } from "./colors.js";
import { contrastRatio, readableTextColor } from "./contrast.js";

const list = document.querySelector(".swatches");
const template = document.querySelector("#swatch-template");
const toast = document.querySelector(".toast");
const quizToggle = document.querySelector(".quiz-toggle");

const state = { lang: "en", quiz: false, revealed: new Set() };

function labelFor(color, lang) {
  const value = color[lang];
  return Array.isArray(value) ? { name: value[0], translit: value[1] } : { name: value, translit: "" };
}

function render() {
  const items = COLORS.map((color, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const button = node.querySelector(".swatch-button");
    const textColor = readableTextColor(color.hex);
    const ratio = contrastRatio(color.hex, textColor);
    const { name, translit } = labelFor(color, state.lang);
    const hidden = state.quiz && !state.revealed.has(color.hex);

    node.style.setProperty("--swatch", color.hex);
    node.style.setProperty("--ink", textColor);
    node.style.setProperty("--i", index);
    node.lang = state.lang;
    node.querySelector(".name").textContent = hidden ? "?" : name;
    node.querySelector(".translit").textContent = hidden ? "tap to reveal" : translit;
    node.querySelector(".hex").textContent = color.hex;
    node.querySelector(".contrast").textContent = `${ratio.toFixed(1)}:1 ${ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ""}`;
    button.dataset.hex = color.hex;
    button.setAttribute("aria-label", hidden ? `Hidden colour ${color.hex}, reveal name` : `${name}, ${color.hex}. Copy hex code`);
    return node;
  });
  list.replaceChildren(...items);
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    showToast(`Copied ${hex}`);
  } catch {
    showToast(`Copy blocked — the code is ${hex}`);
  }
}

list.addEventListener("click", (event) => {
  const button = event.target.closest(".swatch-button");
  if (!button) return;
  const { hex } = button.dataset;
  if (state.quiz && !state.revealed.has(hex)) {
    state.revealed.add(hex);
    render();
    list.querySelector(`[data-hex="${hex}"]`)?.focus();
    return;
  }
  copyHex(hex);
});

document.querySelector(".lang-switch").addEventListener("change", (event) => {
  state.lang = event.target.value;
  render();
});

quizToggle.addEventListener("click", () => {
  state.quiz = !state.quiz;
  state.revealed.clear();
  quizToggle.setAttribute("aria-pressed", String(state.quiz));
  render();
});

render();
