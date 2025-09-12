# 🌟 Portfolio Website 2025

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github)](https://maro-eltma333.github.io/Portfolio-Website/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Welcome to my personal portfolio! Showcasing projects, skills, and a clean contact flow powered by EmailJS. Deployed on GitHub Pages for blazing-fast access. ✨

## 🚀 Live Demo
- **Live Site**: [maro-eltma333.github.io/Portfolio-Website](https://maro-eltma333.github.io/Portfolio-Website/)

## 🖼️ Features
- 🎨 Modern, responsive UI (Bootstrap 5 + AOS animations)
- 🧩 Masonry portfolio grid with lightbox (BigPicture)
- ✉️ Contact form with EmailJS + SweetAlert2 feedback
- 🛟 Smooth scroll-to-top button
- ⚡ Optimized images (.webp) and lazy-loaded assets

## 🧰 Tech Stack
- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5, AOS, Masonry, BigPicture, SweetAlert2
- EmailJS (client-side email delivery)

## 📁 Project Structure
```
Portfolio-Website/
├─ css/
├─ images/
├─ scripts/
│  ├─ main.js            # UI behavior (AOS, Masonry, lightbox, navbar, etc.)
│  └─ script.js          # Contact form + EmailJS logic
├─ index.html            # Main site
└─ README.md             # You are here 💡
```

## 🔧 Getting Started
- ✅ Prerequisites: Any modern browser. Optional: Python 3 or Node.js for a local server.
- ⬇️ Install
```bash
git clone https://github.com/maro-eltma333/Portfolio-Website.git
cd Portfolio-Website
```
- ▶️ Run locally
```bash
# Option A: Open index.html directly in your browser

# Option B: Simple local server
# Python 3
python -m http.server 5500
# or Node
npx serve .
```
Open http://localhost:5500 (or the URL printed by your server).

## ✉️ EmailJS Setup
- Create a Service and two Templates in EmailJS (user copy + admin copy)
- In each template, set To = `{{to_email}}`
- Copy your Public Key from Account → API keys
- Update `scripts/script.js`:
  - `emailjs.init("<PUBLIC_KEY>")`
  - `emailjs.send("<SERVICE_ID>", "<TEMPLATE_ID>", {...})`
  - Ensure variables exist in your templates: `name`, `email`, `message`, `to_email`, `reply_to`
- Heads up: If you see 404 or "Account not found", your Public Key and Service/Template IDs are from different EmailJS accounts.

## 🌐 Deploy (GitHub Pages)
```bash
git add .
git commit -m "Deploy: Portfolio 2025"
git push origin main
```
Then in GitHub: Settings → Pages → Source: `main` / `(root)` → Save
Your site will be available at:
```
https://<your-username>.github.io/Portfolio-Website/
```

## 🧯 Troubleshooting
- No emails? Recheck Public Key + Service/Template IDs + template variables
- Console noise about extensions (runtime.lastError/CookieManager)? Test in Incognito or disable extensions
- Lightbox caption shows HTML link? Intended by BigPicture (uses figcaption as HTML)

## 📸 Screenshots
Add your screenshots here!

## 🖊️ Author
Ammar Ahmed 💫

## 📄 License
© 2025 Ammar Ahmed. All rights reserved.

---
Made with passion, pixels, and modern web technologies ✨
