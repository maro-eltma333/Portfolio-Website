# 🌟 Portfolio Website — Auraaaa 2025

Welcome to my personal portfolio! Showcasing projects, skills, and a clean contact flow powered by EmailJS. Deployed on GitHub Pages for blazing-fast access. ✨

## 🚀 Live Demo
- GitHub Pages: `https://maro-eltma333.github.io/Portfolio-Website/`

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

## 🔧 Local Development
1) Clone the repo
```bash
git clone https://github.com/maro-eltma333/Portfolio-Website.git
cd Portfolio-Website
```
2) Open `index.html` directly in your browser or use a simple server
```bash
# Python 3
python -m http.server 5500
# or Node
npx serve .
```
Visit http://localhost:5500 (or the link your server prints).

## ✉️ EmailJS Setup (Important)
To send emails from the contact form:
- Create or log in to EmailJS
- Create a Service (copy the Service ID)
- Create two Templates (for user and admin copies)
- In each template, set the "To" field to `{{to_email}}`
- Get your Public Key from EmailJS Account → API keys

Update `scripts/script.js` with:
- Public Key in `emailjs.init("<PUBLIC_KEY>")`
- Service ID and Template IDs in `emailjs.send(...)`
- Ensure template variables: `name`, `email`, `message`, `to_email`, `reply_to`

Tip: If you see 404 or "Account not found", your Public Key and Service/Template IDs are from different EmailJS accounts. Use values from the same account.

## 🌐 Deploy to GitHub Pages
1) Push to `main`
```bash
git add .
git commit -m "Deploy: Auraaaa portfolio 2025"
git push origin main
```
2) In GitHub → Settings → Pages → Deploy from `main` → `/ (root)` → Save
3) Your site will be live at:
```
https://<your-username>.github.io/Portfolio-Website/
```

## 🧯 Troubleshooting
- Browser console filled with runtime.lastError or CookieManager messages? That’s from browser extensions (e.g., Avira, password managers). Test in Incognito or disable extensions.
- Lightbox caption shows anchor HTML? That’s intended: BigPicture uses the figure caption as HTML.
- Contact form doesn’t send? Recheck EmailJS Public Key + Service/Template IDs and template variables.

## 📸 Screenshots
Add your screenshots here!

## 🖊️ Author
Ammar Ahmed — Auraaaa 💫

## 📄 License
© 2025 Ammar Ahmed. All rights reserved.

---
Made with passion, pixels, and a touch of Auraaaa ✨
