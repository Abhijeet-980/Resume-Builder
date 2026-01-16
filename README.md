# 🚀 Resume Builder

A modern, responsive **Resume Builder web application** that allows users to create clean, professional, and ATS-friendly resumes directly in the browser. The app focuses on simplicity, usability, and privacy — no backend or database required.

**Live Demo:** https://resume-builder-ashy-eight.vercel.app/

![Resume Builder](https://img.shields.io/badge/HTML-CSS-JavaScript-orange?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

### 🛠️ Resume Creation
- Form-based input for personal details, education, experience, and skills
- Real-time resume preview while typing
- Clean and professional resume layout
- Browser-based data handling (no backend required)

### 🎨 UI & Experience
- Fully responsive design (desktop, tablet, mobile)
- Simple and intuitive user interface
- Print-ready resume layout
- Privacy-friendly — data stays in the browser

---

## 🧰 Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling & layout
- **JavaScript (Vanilla)** – Logic & interactivity
- **Deployment** – Vercel

---


### Architectural Flow
---

1. The user enters data into the form (`index.html`).
2. `resume.js` listens to input events and updates the resume preview in real time.
3. `storage.js` stores and retrieves data using `localStorage`, enabling auto-save per user.
4. `auth.js` manages basic frontend-only user identity.
5. `theme.js` handles UI preferences such as theme selection.
6. `style.css` controls layout, responsiveness, and print styling.

This structure ensures:
- Clear separation of logic  
- Easy maintainability  
- Scalability for future features  
- Clean debugging and testing  

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser
- Git (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stutitiwari23/Resume-Builder.git
   cd Resume-Builder
2. Run the project

 Simply open index.html in your browser

OR

npx http-server .

Then visit http://localhost:8080

---

## Project Structure

Resume-Builder/
├── css/                # Stylesheets
├── images/             # Icons and images
├── docs/               # Documentation
├── tests/              # Test files
├── index.html          # Main landing page
├── resume-builder.html # Resume builder page
├── login.html          # Login page
├── register.html       # Registration page
├── style.css           # Global styles
├── resume.js           # Resume logic
├── sanitizer.js        # Input sanitization
└── README.md

## Hinghlights ⭐

 * Instant resume preview

* Clean, ATS-friendly formatting

* No account or backend needed

* Lightweight and fast

* Beginner-friendly codebase

# 🤝 Contributing

Thanks for your interest in contributing to **Resume Builder**!  
All contributions — bug fixes, features, UI improvements, and documentation — are welcome.

## 🚀 Quick Start

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Resume-Builder.git
   cd Resume-Builder
2. **Create a Branch**
   
  git checkout -b feature/your-feature-name

 * Use meaningful branch names like:

 * feature/add-pdf-export

# 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment for everyone contributing to **Resume Builder**.

## 🤝 Our Standards

Please:
- Be respectful and kind
- Give constructive feedback
- Respect different viewpoints and experiences

Unacceptable behavior includes:
- Harassment or discrimination
- Trolling or insulting comments
- Any form of abusive behavior

## 👩‍💻 Author


**Stuti Tiwari**  
Bachelor of Computer Applications (BCA), 2025  
Frontend Development | UI/UX | Web Applications  


## 🚨 Enforcement

Project maintainers have the right to remove or edit contributions that violate this code of conduct.

---

By participating in this project, you agree to follow this Code of Conduct.

Thank you for helping keep this community respectful and welcoming ❤️

