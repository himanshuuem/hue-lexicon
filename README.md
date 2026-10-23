# 🎨 Hue Lexicon

> A multilingual colour dictionary. Learn fifteen colour names in **English, Hindi, Spanish and Japanese**, check each swatch's WCAG contrast and copy hex codes with one tap.

**🔗 Live demo:** https://himanshuuem.github.io/hue-lexicon/

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES_Modules-F7DF1E?logo=javascript&logoColor=black)
![Tests](https://img.shields.io/badge/tests-node%3Atest-339933?logo=node.js&logoColor=white)

## ✨ Features

- **Four languages** with native scripts (Devanagari, Kanji) and romanised pronunciation. Each card sets a `lang` attribute so screen readers and fonts behave correctly.
- **Automatic text contrast.** A small WCAG 2.x module computes relative luminance and picks black or white text for every swatch, then shows the ratio and its AA/AAA rating.
- **Click to copy** a hex code, with an accessible toast (`role="status"`).
- **Quiz mode** hides the names so you can test yourself, then reveals them one tap at a time.
- **Data-driven rendering** with a `<template>` element. Adding a colour is a single line in `colors.js`.
- A rainbow gradient title, staggered entrance animation and automatic dark mode.

## 🛠 Tech Stack

HTML5 `<template>` · CSS (custom properties, `:has()`, `color-mix()`, `background-clip: text`) · Vanilla JS ES modules · `node:test` for unit tests

## 📁 Structure

```
hue-lexicon/
├── index.html         # Layout, language switch, swatch template
├── styles.css         # Theme and swatch grid
├── colors.js          # Colour data (hex + 4 languages)
├── contrast.js        # WCAG luminance / contrast helpers
├── contrast.test.js   # Unit tests
├── app.js             # Rendering, quiz mode, copy-to-clipboard
└── package.json
```

## 🚀 Run Locally

ES modules need to be served over HTTP, not opened as `file://`.

```bash
git clone https://github.com/himanshuuem/hue-lexicon.git
cd hue-lexicon
npm start       # serves on http://localhost:3000
npm test        # runs the contrast unit tests
```

## 📚 Origin

This grew out of the *Colour Vocab* CSS exercise in [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/). I turned a page of coloured headings into a small, tested learning tool.

---

Made by [Himanshu](https://github.com/himanshuuem)
