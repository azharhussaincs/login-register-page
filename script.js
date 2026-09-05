document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initThemeSelector();
  initCard3DTilt();
  setupLiveInputValidation();
});

/* --------------------------------------------------------------------------
   1. AMBIENT PARTICLE CANVAS ENGINE
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 22), 65);
  
  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. TAB SWITCHING LOGIC
   -------------------------------------------------------------------------- */
function switchTab(targetTab) {
  const tabs = document.getElementById('auth-tabs');
  const indicator = document.getElementById('tab-indicator');
  const tagline = document.getElementById('brand-tagline');
  
  const loginTabBtn = document.getElementById('tab-login');
  const signupTabBtn = document.getElementById('tab-signup');
  
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const forgotForm = document.getElementById('forgot-form');
  const dashView = document.getElementById('dashboard-view');

  dashView.classList.remove('active');
  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
  forgotForm.classList.remove('active');

  if (targetTab === 'login') {
    tabs.style.display = 'flex';
    indicator.style.transform = 'translateX(0%)';
    loginTabBtn.classList.add('active');
    signupTabBtn.classList.remove('active');
    
    setTimeout(() => loginForm.classList.add('active'), 50);
    tagline.textContent = 'Welcome back! Please enter your details.';
  } 
  else if (targetTab === 'signup') {
    tabs.style.display = 'flex';
    indicator.style.transform = 'translateX(100%)';
    signupTabBtn.classList.add('active');
    loginTabBtn.classList.remove('active');
    
    setTimeout(() => signupForm.classList.add('active'), 50);
    tagline.textContent = 'Start your 14-day free trial today.';
  } 
  else if (targetTab === 'forgot') {
    tabs.style.display = 'none';
    setTimeout(() => forgotForm.classList.add('active'), 50);
    tagline.textContent = 'Reset your password securely.';
  }
}

/* --------------------------------------------------------------------------
   3. PASSWORD VISIBILITY TOGGLE
   -------------------------------------------------------------------------- */
function togglePasswordVisibility(inputId, buttonEl) {
  const input = document.getElementById(inputId);
  const icon = buttonEl.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-regular fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-regular fa-eye';
  }
}

/* --------------------------------------------------------------------------
   4. PASSWORD STRENGTH METER & LIVE ASSESSOR
   -------------------------------------------------------------------------- */
function assessPasswordStrength(password) {
  const bar1 = document.getElementById('bar-1');
  const bar2 = document.getElementById('bar-2');
  const bar3 = document.getElementById('bar-3');
  const bar4 = document.getElementById('bar-4');
  const text = document.getElementById('strength-text');

  const reqLength = document.getElementById('req-length');
  const reqUpper = document.getElementById('req-upper');
  const reqNumber = document.getElementById('req-number');

  let score = 0;

  const isLength = password.length >= 8;
  if (isLength) {
    score++;
    reqLength.classList.add('met');
    reqLength.querySelector('i').className = 'fa-solid fa-circle-check';
  } else {
    reqLength.classList.remove('met');
    reqLength.querySelector('i').className = 'fa-solid fa-circle-dot';
  }

  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  if (hasUpperLower) {
    score++;
    reqUpper.classList.add('met');
    reqUpper.querySelector('i').className = 'fa-solid fa-circle-check';
  } else {
    reqUpper.classList.remove('met');
    reqUpper.querySelector('i').className = 'fa-solid fa-circle-dot';
  }

  const hasNumSpec = /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
  if (hasNumSpec) {
    score++;
    reqNumber.classList.add('met');
    reqNumber.querySelector('i').className = 'fa-solid fa-circle-check';
  } else {
    reqNumber.classList.remove('met');
    reqNumber.querySelector('i').className = 'fa-solid fa-circle-dot';
  }

  if (password.length >= 12 && score === 3) {
    score = 4;
  }

  [bar1, bar2, bar3, bar4].forEach(bar => {
    bar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  });

  if (password.length === 0) {
    text.textContent = 'Password strength';
    text.style.color = 'var(--text-muted)';
    return;
  }

  if (score === 1) {
    bar1.style.backgroundColor = 'var(--error)';
    text.textContent = 'Weak Password';
    text.style.color = 'var(--error)';
  } else if (score === 2) {
    bar1.style.backgroundColor = 'var(--warning)';
    bar2.style.backgroundColor = 'var(--warning)';
    text.textContent = 'Medium Password';
    text.style.color = 'var(--warning)';
  } else if (score === 3) {
    bar1.style.backgroundColor = '#3b82f6';
    bar2.style.backgroundColor = '#3b82f6';
    bar3.style.backgroundColor = '#3b82f6';
    text.textContent = 'Good Password';
    text.style.color = '#3b82f6';
  } else if (score === 4) {
    bar1.style.backgroundColor = 'var(--success)';
    bar2.style.backgroundColor = 'var(--success)';
    bar3.style.backgroundColor = 'var(--success)';
    bar4.style.backgroundColor = 'var(--success)';
    text.textContent = 'Strong Password 🔥';
    text.style.color = 'var(--success)';
  }
}

/* --------------------------------------------------------------------------
   5. REAL-TIME INPUT VALIDATION
   -------------------------------------------------------------------------- */
function setupLiveInputValidation() {
  const inputs = document.querySelectorAll('input[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      const group = input.closest('.input-group');
      if (group && group.classList.contains('error')) {
        validateInput(input);
      }
    });
  });
}

function validateInput(input) {
  const group = input.closest('.input-group');
  if (!group) return true;

  let isValid = true;
  const value = input.value.trim();

  if (!value) {
    isValid = false;
  } else if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (input.id === 'signup-password') {
    isValid = value.length >= 8;
  }

  if (isValid) {
    group.classList.remove('error');
    group.classList.add('success');
  } else {
    group.classList.remove('success');
    group.classList.add('error');
  }

  return isValid;
}

/* --------------------------------------------------------------------------
   6. FORM SUBMISSION HANDLERS & DASHBOARD STATE
   -------------------------------------------------------------------------- */
function handleLogin(e) {
  e.preventDefault();

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('login-submit-btn');

  const isEmailValid = validateInput(emailInput);
  const isPasswordValid = validateInput(passwordInput);

  if (!isEmailValid || !isPasswordValid) {
    showToast('Validation Error', 'Please complete all required fields correctly.', 'error');
    return;
  }

  submitBtn.classList.add('loading');

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    showToast('Sign In Successful', 'Welcome back to your Aetheria account!', 'success');
    openDashboard(emailInput.value.split('@')[0]);
  }, 1400);
}

function handleSignup(e) {
  e.preventDefault();

  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const termsCheckbox = document.getElementById('terms-agree');
  const submitBtn = document.getElementById('signup-submit-btn');

  const isNameValid = validateInput(nameInput);
  const isEmailValid = validateInput(emailInput);
  const isPasswordValid = validateInput(passwordInput);

  if (!termsCheckbox.checked) {
    showToast('Terms Required', 'You must agree to the Terms of Service to proceed.', 'error');
    return;
  }

  if (!isNameValid || !isEmailValid || !isPasswordValid) {
    showToast('Form Error', 'Please check your registration details.', 'error');
    return;
  }

  submitBtn.classList.add('loading');

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    showToast('Account Created!', 'Your Aetheria account has been set up successfully.', 'success');
    openDashboard(nameInput.value);
  }, 1600);
}

function handleForgot(e) {
  e.preventDefault();

  const emailInput = document.getElementById('forgot-email');
  const submitBtn = document.getElementById('forgot-submit-btn');

  if (!validateInput(emailInput)) {
    showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    return;
  }

  submitBtn.classList.add('loading');

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    showToast('Email Sent', `Password reset instructions sent to ${emailInput.value}`, 'info');
    setTimeout(() => switchTab('login'), 2000);
  }, 1200);
}

function handleSocialAuth(providerName) {
  showToast('Connecting Provider', `Redirecting to secure ${providerName} authentication...`, 'info');
  
  setTimeout(() => {
    showToast('Auth Success', `Authenticated with ${providerName}!`, 'success');
    openDashboard(`${providerName}_User`);
  }, 1500);
}

function openDashboard(username) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const forgotForm = document.getElementById('forgot-form');
  const dashView = document.getElementById('dashboard-view');
  const tabs = document.getElementById('auth-tabs');
  const tagline = document.getElementById('brand-tagline');
  const dashUserName = document.getElementById('dash-user-name');

  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
  forgotForm.classList.remove('active');
  tabs.style.display = 'none';

  dashUserName.textContent = username || 'Explorer';
  tagline.textContent = 'Active Session Management';
  dashView.classList.add('active');
}

function handleLogout() {
  showToast('Signed Out', 'You have been safely signed out.', 'info');
  switchTab('login');
}

/* --------------------------------------------------------------------------
   7. TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(title, description, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconClass = 'fa-solid fa-circle-info';
  if (type === 'success') iconClass = 'fa-solid fa-circle-check';
  if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${description}</div>
    </div>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/* --------------------------------------------------------------------------
   8. CARD 3D TILT EFFECT
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const card = document.getElementById('auth-card');
  if (!card) return;

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    const rotateX = (-mouseY / (window.innerHeight / 2)) * 6;
    const rotateY = (mouseX / (window.innerWidth / 2)) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  window.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* --------------------------------------------------------------------------
   9. THEME SELECTOR ENGINE
   -------------------------------------------------------------------------- */
function initThemeSelector() {
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      if (theme === 'midnight') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', theme);
      }
      showToast('Theme Changed', `Switched to ${theme.toUpperCase()} visual palette`, 'info');
    });
  });
}
