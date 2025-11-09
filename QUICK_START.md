# 🚀 Quick Start Guide

## View Your Website in 3 Easy Steps

### Method 1: Double-Click (Easiest)
1. Find `index.html` in this folder
2. Double-click it
3. Your website opens in your browser!

### Method 2: Use the Start Script (Recommended)
1. Double-click `start.sh` (Mac/Linux)
2. Your browser will open automatically
3. That's it!

### Method 3: Command Line
```bash
# Navigate to this folder, then:
python3 -m http.server 8000

# Then open: http://localhost:8000
```

---

## 📂 What's What

```
📁 Your Website Files
│
├── 📄 index.html              ← Start here! (Homepage)
├── 📄 README.md               ← Full documentation
├── 📄 PROJECT_SUMMARY.md      ← What's been built
├── 📄 QUICK_START.md          ← You are here
│
├── 📁 pages/                  ← All other pages
│   ├── spaces.html
│   ├── private-events.html
│   ├── public-events.html
│   └── contact.html
│
├── 📁 src/                    ← Your code
│   ├── css/styles.css         ← All styling
│   ├── js/main.js             ← All functionality
│   └── images/                ← Put your photos here
│
└── 📁 scraped/                ← Original content (keep for reference)
```

---

## ✏️ Quick Customizations

### Replace the Placeholder Images

Look for lines like this in the HTML:
```html
<img src="https://images.unsplash.com/photo-xxxxx" alt="...">
```

Change to:
```html
<img src="src/images/your-photo.jpg" alt="...">
```

### Update Events

Edit `pages/public-events.html`:
- Find the event card sections
- Update dates, titles, and descriptions
- Change ticket links

### Change Colors

Open `src/css/styles.css` and find:
```css
:root {
  --color-primary: #1a3a2e;
  --color-secondary: #c9a961;
  /* Change these! */
}
```

### Connect Contact Form

1. Go to [FormSubmit.co](https://formsubmit.co/)
2. Replace the form action in `contact.html`:
   ```html
   <form action="https://formsubmit.co/your@email.com" method="POST">
   ```

---

## 🌐 Ready to Go Live?

### Option 1: Netlify (FREE & Easy)
1. Go to [netlify.com](https://www.netlify.com/)
2. Drag this entire folder onto Netlify
3. Done! Your site is live!

### Option 2: Your Own Domain
1. Buy hosting from your favorite provider
2. Upload all files via FTP
3. Point your domain to the hosting

---

## 🆘 Need Help?

- **Code Questions**: See `README.md`
- **Design Changes**: Check `src/css/styles.css` comments
- **Adding Features**: See `src/js/main.js` comments

---

## 📋 Your To-Do Checklist

- [ ] View the website locally
- [ ] Replace placeholder images with real photos
- [ ] Update event listings
- [ ] Test the contact form
- [ ] Customize colors (optional)
- [ ] Update any outdated information
- [ ] Deploy to the web
- [ ] Share with the world!

---

## 🎉 That's It!

Your beautiful Stone House website is ready to go. Just add your photos and launch!

**Questions?** Everything is documented in [README.md](README.md)
