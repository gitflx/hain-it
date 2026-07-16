// hain.it_ — Professional Site Script

document.addEventListener('DOMContentLoaded', () => {
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
                        <a href="microsoft.html"${currentPage === 'microsoft.html' ? ' aria-current="page"' : ''}>Microsoft</a>
                        <a href="entwicklung.html"${currentPage === 'entwicklung.html' ? ' aria-current="page"' : ''}>Individualentwicklung</a>
                        <a href="smarthome.html"${currentPage === 'smarthome.html' ? ' aria-current="page"' : ''}>Smart Home</a>
                    </div>
                </div>
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
                    <a href="microsoft.html">Microsoft</a>
                    <a href="entwicklung.html">Individualentwicklung</a>
                    <a href="smarthome.html">Smart Home</a>
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
