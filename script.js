// hain.it_ — Professional Site Script

document.addEventListener('DOMContentLoaded', () => {
    initAccentColor();
    injectHeader();
    injectFooter();
    initTheme();
    initMobileMenu();
    initDropdown();
    initModal();
    initScrollAnimations();
    initContactForm();
    if (document.getElementById('calc-users')) initCalculator();
});

// Dynamic Accent Color
function initAccentColor() {
    const palettes = [
        { accent: '#c45d1a', hover: '#a84e15', light: 'rgba(196,93,26,0.08)', lightDark: 'rgba(212,118,58,0.1)', dark: '#d4763a', darkHover: '#e88a4a' },
        { accent: '#1a6b8a', hover: '#155a74', light: 'rgba(26,107,138,0.08)', lightDark: 'rgba(42,140,178,0.1)', dark: '#2a8cb2', darkHover: '#3da5cc' },
        { accent: '#6b4c9a', hover: '#5a3f84', light: 'rgba(107,76,154,0.08)', lightDark: 'rgba(140,108,186,0.1)', dark: '#8c6cba', darkHover: '#a388cc' },
        { accent: '#2d8a5e', hover: '#247549', light: 'rgba(45,138,94,0.08)', lightDark: 'rgba(60,170,116,0.1)', dark: '#3caa74', darkHover: '#4fc48c' },
        { accent: '#b84c4c', hover: '#9e3f3f', light: 'rgba(184,76,76,0.08)', lightDark: 'rgba(210,100,100,0.1)', dark: '#d26464', darkHover: '#e27a7a' },
    ];
    const idx = Math.floor(Math.random() * palettes.length);
    const p = palettes[idx];
    const root = document.documentElement;
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--accent-hover', p.hover);
    root.style.setProperty('--accent-light', p.light);
    document.documentElement.dataset.accentIdx = idx;

    const style = document.createElement('style');
    style.textContent = `[data-theme="dark"] { --accent: ${p.dark}; --accent-hover: ${p.darkHover}; --accent-light: ${p.lightDark}; }`;
    document.head.appendChild(style);
}

// Shared Header
function injectHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    header.innerHTML = `
        <nav>
            <a href="index.html" class="logo">hain.it<span class="accent">_</span></a>
            <div class="nav-links">
                <div class="nav-dropdown">
                    <button class="nav-dropdown-trigger">Leistungen <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button>
                    <div class="nav-dropdown-menu">
                        <a href="prozessberatung.html"${currentPage === 'prozessberatung.html' ? ' aria-current="page"' : ''}>Prozessberatung</a>
                        <a href="smarthome.html"${currentPage === 'smarthome.html' ? ' aria-current="page"' : ''}>Smart Home</a>
                        <a href="entwicklung.html"${currentPage === 'entwicklung.html' ? ' aria-current="page"' : ''}>Individualentwicklung</a>
                    </div>
                </div>
                <a href="microsoft.html"${currentPage === 'microsoft.html' ? ' aria-current="page"' : ''}>Portfolio</a>
                <a href="index.html#contact">Kontakt</a>
            </div>
            <div class="nav-actions">
                <button id="theme-toggle" aria-label="Theme wechseln">
                    <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
                <a href="index.html#contact" class="btn btn-primary btn-sm">Kontakt aufnehmen</a>
            </div>
            <button class="mobile-menu-btn" aria-label="Menü öffnen">
                <span></span><span></span><span></span>
            </button>
        </nav>
    `;
}

// Shared Footer
function injectFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <span class="logo">hain.it<span class="accent">_</span></span>
                    <p>Digitalisierung, Automatisierung & Smart Living</p>
                </div>
                <div class="footer-links">
                    <h4>Leistungen</h4>
                    <a href="prozessberatung.html">Prozessberatung</a>
                    <a href="smarthome.html">Smart Home</a>
                    <a href="entwicklung.html">Individualentwicklung</a>
                </div>
                <div class="footer-links">
                    <h4>Portfolio</h4>
                    <a href="microsoft.html">Microsoft</a>
                </div>
                <div class="footer-links">
                    <h4>Kontakt</h4>
                    <a href="mailto:info@hain.it">info@hain.it</a>
                    <a href="index.html#contact">Kontaktformular</a>
                </div>
                <div class="footer-links">
                    <h4>Rechtliches</h4>
                    <a href="impressum.html">Impressum</a>
                    <a href="datenschutz.html">Datenschutz</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} hain.it_ &mdash; Felix Hain</p>
            </div>
        </div>
    `;
}

// Theme
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        btn.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            btn.classList.remove('active');
        }
    });
}

// Dropdown Navigation
function initDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;

    let timeout;
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        dropdown.classList.add('open');
    });
    dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => dropdown.classList.remove('open'), 200);
    });

    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });
}

// Modal System
function initModal() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            openModal(trigger.dataset.modal);
        }

        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }

        if (e.target.closest('.modal-close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const active = document.querySelector('.modal-overlay.active');
    if (!active) return;
    active.classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll Animations
function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
        return;
    }

    const elements = document.querySelectorAll('.animate-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const subject = encodeURIComponent(`[hain.it] ${data.get('subject')} — ${data.get('name')}`);
        const body = encodeURIComponent(`Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nBetreff: ${data.get('subject')}\n\n${data.get('message')}`);
        window.location.href = `mailto:info@hain.it?subject=${subject}&body=${body}`;
        form.reset();
    });
}

// Licensing Calculator
function initCalculator() {
    const users = document.getElementById('calc-users');
    const plan = document.getElementById('calc-plan');
    const copilot = document.getElementById('calc-copilot');
    const power = document.getElementById('calc-power');
    const powerUsers = document.getElementById('calc-powerusers');

    if (!users || !plan) return;

    function calculate() {
        const numUsers = parseInt(users.value) || 0;
        const planCost = parseFloat(plan.value) || 0;
        const copilotCost = copilot ? parseFloat(copilot.value) || 0 : 0;
        const powerCost = power ? parseFloat(power.value) || 0 : 0;
        const numPowerUsers = powerUsers ? parseInt(powerUsers.value) || 0 : 0;

        const m365Monthly = numUsers * (planCost + copilotCost);
        const powerMonthly = numPowerUsers * powerCost;
        const totalMonthly = m365Monthly + powerMonthly;
        const totalYearly = totalMonthly * 12;
        const perUser = numUsers > 0 ? totalMonthly / numUsers : 0;

        const fmt = (n) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

        const elMonthly = document.getElementById('calc-monthly');
        const elYearly = document.getElementById('calc-yearly');
        const elPerUser = document.getElementById('calc-peruser');

        if (elMonthly) elMonthly.textContent = fmt(totalMonthly);
        if (elYearly) elYearly.textContent = fmt(totalYearly);
        if (elPerUser) elPerUser.textContent = fmt(perUser);
    }

    [users, plan, copilot, power, powerUsers].filter(Boolean).forEach(el => {
        el.addEventListener('input', calculate);
        el.addEventListener('change', calculate);
    });

    calculate();
}
