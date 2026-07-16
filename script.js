// hain.it_ — Main Script

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCalculator();
    initChatbot();
    initScrollAnimations();
    initMobileMenu();
    initContactForm();
});

// Theme Toggle
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// Licensing Calculator
function initCalculator() {
    const users = document.getElementById('calc-users');
    const plan = document.getElementById('calc-plan');
    const copilot = document.getElementById('calc-copilot');
    const power = document.getElementById('calc-power');
    const powerUsers = document.getElementById('calc-powerusers');

    function calculate() {
        const numUsers = parseInt(users.value) || 0;
        const planCost = parseFloat(plan.value) || 0;
        const copilotCost = parseFloat(copilot.value) || 0;
        const powerCost = parseFloat(power.value) || 0;
        const numPowerUsers = parseInt(powerUsers.value) || 0;

        const m365Monthly = numUsers * (planCost + copilotCost);
        const powerMonthly = numPowerUsers * powerCost;
        const totalMonthly = m365Monthly + powerMonthly;
        const totalYearly = totalMonthly * 12;
        const perUser = numUsers > 0 ? totalMonthly / numUsers : 0;

        document.getElementById('calc-monthly').textContent = formatCurrency(totalMonthly);
        document.getElementById('calc-yearly').textContent = formatCurrency(totalYearly);
        document.getElementById('calc-peruser').textContent = formatCurrency(perUser);
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    }

    [users, plan, copilot, power, powerUsers].forEach(el => {
        el.addEventListener('input', calculate);
        el.addEventListener('change', calculate);
    });

    calculate();
}

// Chatbot
function initChatbot() {
    const widget = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');

    toggle.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open')) {
            input.focus();
        }
    });

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        input.value = '';

        setTimeout(() => {
            const response = getBotResponse(text);
            appendMessage(response, 'bot');
        }, 800);
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        msg.innerHTML = `<p>${text}</p>`;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(input) {
        const lower = input.toLowerCase();

        if (lower.includes('preis') || lower.includes('kost') || lower.includes('was kostet')) {
            return 'Die Kosten hängen vom Projektumfang ab. Ein Erstgespräch ist kostenlos — dort kann ich dir eine realistische Einschätzung geben. Schreib mir gerne über das <a href="#contact">Kontaktformular</a>.';
        }
        if (lower.includes('smart home') || lower.includes('haus') || lower.includes('homeassistant')) {
            return 'Ich biete professionelle Smart Home Architektur an — basierend auf Home Assistant, mit Enterprise-Grade Automation. Von der Planung bis zur Übergabe.';
        }
        if (lower.includes('ki') || lower.includes('copilot') || lower.includes('ai') || lower.includes('künstliche')) {
            return 'Ich helfe bei KI-Strategie, Copilot-Einführung und Custom AI-Lösungen mit Azure AI Foundry. Von der Readiness-Analyse bis zum produktiven Betrieb.';
        }
        if (lower.includes('power platform') || lower.includes('power apps') || lower.includes('automate')) {
            return 'Power Platform ist einer meiner Schwerpunkte: Power Apps, Power Automate, Dataverse und ALM. Ich berate und setze um — von einfachen Flows bis zu Enterprise-Lösungen.';
        }
        if (lower.includes('web') || lower.includes('app') || lower.includes('entwickl') || lower.includes('software')) {
            return 'Ich entwickle Web-Apps, APIs und Portale — mit modernen Technologien wie React, Next.js oder auch Low-Code mit Power Platform. Was schwebt dir vor?';
        }
        if (lower.includes('kontakt') || lower.includes('termin') || lower.includes('gespräch') || lower.includes('buchen')) {
            return 'Am besten erreichst du mich über das <a href="#contact">Kontaktformular</a> oder direkt per Mail an <a href="mailto:info@hain.it">info@hain.it</a>. Ich melde mich innerhalb von 24h.';
        }
        if (lower.includes('hallo') || lower.includes('hi') || lower.includes('hey') || lower.includes('moin')) {
            return 'Hallo! 👋 Schön, dass du hier bist. Wie kann ich dir helfen? Frag mich zu Leistungen, Preisen oder meinem Vorgehen.';
        }
        return 'Gute Frage! Für eine individuelle Antwort schreib mir gerne über das <a href="#contact">Kontaktformular</a> oder per Mail an info@hain.it. Ich melde mich schnell bei dir.';
    }
}

// Scroll Animations
function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll('.service-card, .process-step, .calc-result-card, .contact-card');
    elements.forEach((el, i) => {
        el.classList.add('animate-in');
        el.style.transitionDelay = `${i % 4 * 100}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => observer.observe(el));
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    btn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        btn.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            btn.classList.remove('active');
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const subject = encodeURIComponent(`[hain.it] ${data.get('subject')} — ${data.get('name')}`);
        const body = encodeURIComponent(`Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nBetreff: ${data.get('subject')}\n\n${data.get('message')}`);

        window.location.href = `mailto:info@hain.it?subject=${subject}&body=${body}`;

        form.reset();
    });
}
