# Aetheria - Next-Gen Glassmorphic Authentication System

A modern, responsive, pixel-perfect glassmorphic authentication interface crafted with pure HTML5, CSS3, and vanilla JavaScript. Features an interactive constellation particle canvas, dynamic multi-theme switcher, 3D mouse tilt perspective, real-time password strength assessor, and simulated session dashboard.

---

## ✨ Features

- **🪐 Interactive Particle Network Canvas**: Dynamic HTML5 Canvas particle mesh with distance-based node connections that actively react to mouse cursor proximity.
- **🎨 3 Dynamic Themes**:
  - **Midnight Nebula** (Default deep indigo & purple)
  - **Cyberpunk Neon** (Vibrant fuchsia, violet & cyan)
  - **Emerald Aurora** (Lush emerald, teal & blue)
- **💎 Glassmorphic Aesthetic**: 28px backdrop blur, frosted glass depth, floating ambient radial light orbs, and top accent gradient line.
- **🕹️ 3D Mouse Perspective Tilt**: Smooth perspective tilt effect on the card that reacts to desktop cursor movement.
- **📱 4 UI States / Views**:
  1. **Sign In**: Email & password authentication with remember me checkbox and password visibility toggle.
  2. **Create Account**: Full registration flow with live password strength meter and requirement checklist.
  3. **Forgot Password**: Password reset request flow with back-to-login navigation.
  4. **Authenticated Session Dashboard**: Success state with user badge, encryption status, and uptime stats.
- **🔐 Real-Time Password Strength Assessor**: Live 4-bar progress indicator and checklist checking:
  - Minimum 8 characters
  - Mixed uppercase & lowercase letters
  - Numbers & special characters
- **⚡ Form Validation & Micro-Interactions**: Real-time validation with error shake animations, status icons, and assistive helper text.
- **🍞 Dynamic Toast Notification Engine**: Custom floating alert toasts with animated auto-dismiss progress bars.
- **🌐 Social Login Integration**: Pre-styled Google, GitHub, and Apple single sign-on buttons.
- **📱 100% Responsive**: Seamless layout adaptation across mobile, tablet, and desktop screens.

---

## 📁 Project Structure

```text
login-register-page/
├── index.html       # Semantic HTML5 markup, forms, and CDN references
├── style.css        # Glassmorphic UI styles, animations, variables, and themes
├── script.js        # Canvas animation, theme switcher, form logic, & tilt effect
└── README.md        # Documentation and setup instructions
```

---

## 🚀 Quick Start Guide

Follow these step-by-step instructions to clone and run the project locally.

### Prerequisites

You only need:
- [Git](https://git-scm.com/) installed on your machine.
- Any modern web browser (Google Chrome, Firefox, Edge, Safari, Brave, etc.).
- *(Optional)* Python 3 or Node.js if you prefer serving through a local HTTP server.

---

### Step 1: Clone the Repository

Open your terminal or command prompt and clone the repository:

```bash
git clone https://github.com/azharhussaincs/login-register-page.git
```

---

### Step 2: Navigate to the Project Directory

```bash
cd login-register-page
```

---

### Step 3: Run the Application

You can choose any of the methods below to run the project:

#### Method A: Direct File Open (Simplest)
- Simply double-click the `index.html` file in your file explorer, or run:
  - **Linux:** `xdg-open index.html`
  - **macOS:** `open index.html`
  - **Windows:** `start index.html`

#### Method B: Using Python (Recommended)
If you have Python installed, launch a local web server:

```bash
# Python 3
python3 -m http.server 8000
```
Then open your browser and navigate to:
```text
http://localhost:8000
```

#### Method C: Using Node.js (`npx serve`)
If you have Node.js installed, you can use `npx`:

```bash
npx serve .
```
Then navigate to the URL displayed in your terminal (typically `http://localhost:3000`).

#### Method D: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 🛠️ Customization

### Changing or Adding Color Themes
All theme colors and gradients are defined using CSS custom properties in `style.css`:

```css
:root {
  /* Midnight Nebula (Default) */
  --bg-primary: #070913;
  --accent-primary: #6366f1;
  --accent-secondary: #a855f7;
  /* ... */
}

/* Custom theme example */
body[data-theme="my-theme"] {
  --bg-primary: #0b1120;
  --accent-primary: #0ea5e9;
  /* ... */
}
```

### Adjusting the Background Canvas
In `script.js`, you can modify particle count, connection radius, and interaction distance:

```javascript
// Change particle density
const particleCount = Math.min(Math.floor(width / 22), 65);

// Adjust mouse interaction radius
let mouse = { x: null, y: null, radius: 140 };

// Change line connection threshold
if (dist < 110) { ... }
```

### Backend Integration
The form handlers in `script.js` (`handleLogin`, `handleSignup`, `handleForgot`) use simulated timeouts. You can connect them to your backend API (REST, GraphQL, Firebase, Supabase, etc.):

```javascript
async function handleLogin(e) {
  e.preventDefault();
  // Call your authentication endpoint:
  // const response = await fetch('/api/login', { ... });
}
```

---

## 🌐 Browser Compatibility

| Browser | Supported Version |
| :--- | :--- |
| **Google Chrome** | Latest (v88+) |
| **Mozilla Firefox** | Latest (v85+) |
| **Microsoft Edge** | Latest (v88+) |
| **Apple Safari** | Latest (v14+) |
| **Mobile Browsers** | iOS Safari, Chrome Android |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create a new branch**: `git checkout -b feature/amazing-feature`.
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`.
4. **Push to the branch**: `git push origin feature/amazing-feature`.
5. **Open a Pull Request**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it for personal or commercial projects.
