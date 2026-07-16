document.addEventListener('DOMContentLoaded', () => {
    initAccentColor();
    injectHeader();
    injectFooter();
    initTheme();
    initMobileMenu();
    initModal();
    initHeaderScroll();
    initScrollAnimations();
    initContactForm();
    if (document.getElementById('calc-users')) initCalculator();
});

function initAccentColor() {
    // Fixed brand identity — no random rotation
}

function injectHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = (href) => page === href ? 'aria-current="page"' : '';

    const businessPages = ['business.html','consulting.html','microsoft.html','development.html'];
    const homePages = ['home.html','smarthome.html'];
    const isBusiness = businessPages.includes(page);
    const isHome = homePages.includes(page);

    header.innerHTML = `
    <nav>
        <a href="index.html" class="logo">hain.it<span class="logo-blink">_</span></a>
        <div class="nav-links">
            <div class="nav-group ${isBusiness ? 'active' : ''}" data-section="business">
                <span class="nav-group-label">Business</span>
                <div class="nav-group-items">
                    <a href="consulting.html" ${isActive('consulting.html')}>Consulting</a>
                    <a href="microsoft.html" ${isActive('microsoft.html')}>Microsoft</a>
                    <a href="development.html" ${isActive('development.html')}>Development</a>
                </div>
            </div>
            <div class="nav-group ${isHome ? 'active' : ''}" data-section="home">
                <span class="nav-group-label">Private</span>
                <div class="nav-group-items">
                    <a href="home.html" ${isActive('home.html')}>Smart Home</a>
                </div>
            </div>
            <a href="portfolio.html" ${isActive('portfolio.html')} class="nav-standalone">Portfolio</a>
        </div>
        <div class="nav-cta">
            <button class="theme-toggle" aria-label="Toggle theme">
                <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            </button>
            <a href="contact.html" class="btn btn-primary btn-sm">Get in touch</a>
            <button class="mobile-toggle" aria-label="Menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
        </div>
    </nav>`;
}

function injectFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = `
    <div class="footer-grid">
        <div class="footer-brand">
            <a href="index.html" class="logo">hain.it<span class="logo-blink">_</span></a>
            <p>Digitalization, automation & smart living.</p>
        </div>
        <div class="footer-col">
            <h4>Services</h4>
            <a href="consulting.html">Process Consulting</a>
            <a href="home.html">Smart Home</a>
            <a href="development.html">Development</a>
            <a href="microsoft.html">Microsoft</a>
        </div>
        <div class="footer-col">
            <h4>Portfolio</h4>
            <a href="portfolio.html">Technologies</a>
        </div>
        <div class="footer-col">
            <h4>Contact</h4>
            <a href="mailto:info@hain.it">info@hain.it</a>
            <a href="contact.html">Contact form</a>
        </div>
    </div>
    <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} hain.it_ &mdash; Felix Hain</span>
        &nbsp;&middot;&nbsp;
        <a href="impressum.html">Imprint</a>
        &nbsp;&middot;&nbsp;
        <a href="datenschutz.html">Privacy</a>
    </div>`;
}

function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (!sun || !moon) return;
    if (theme === 'dark') {
        sun.style.display = 'block';
        moon.style.display = 'none';
    } else {
        sun.style.display = 'none';
        moon.style.display = 'block';
    }
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('active');
    }));
}

function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initModal() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => openModal(trigger.getAttribute('data-modal')));
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const active = document.querySelector('.modal-overlay.active');
            if (active) closeModal(active);
        }
    });
}

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        initFallbackAnimations();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    // Staggered card reveals
    gsap.utils.toArray('.cards-grid, .cards-grid-2, .cards-grid-3, .tech-grid').forEach(grid => {
        const items = grid.children;
        if (!items.length) return;
        gsap.fromTo(items,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' } }
        );
    });

    // Badge stagger
    gsap.utils.toArray('.badge-list').forEach(list => {
        const badges = list.children;
        if (!badges.length) return;
        gsap.fromTo(badges,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: list, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });

    // Hero parallax fade
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            y: -100, opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    // Feature showcases
    gsap.utils.toArray('.feature-showcase').forEach(showcase => {
        const text = showcase.querySelector('.feature-text');
        const visual = showcase.querySelector('.feature-visual');
        const isReverse = showcase.classList.contains('reverse');

        if (text) {
            gsap.fromTo(text,
                { opacity: 0, x: isReverse ? 50 : -50 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                  scrollTrigger: { trigger: showcase, start: 'top 75%', toggleActions: 'play none none none' } }
            );
        }
        if (visual) {
            gsap.fromTo(visual,
                { opacity: 0, x: isReverse ? -50 : 50 },
                { opacity: 1, x: 0, duration: 1, delay: 0.1, ease: 'power3.out',
                  scrollTrigger: { trigger: showcase, start: 'top 75%', toggleActions: 'play none none none' } }
            );
        }
    });

    // Timeline stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
        gsap.fromTo(timelineItems,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
              scrollTrigger: { trigger: '.timeline', start: 'top 80%', toggleActions: 'play none none none' } }
        );
    }
}

function initFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
        el.style.transitionDuration = '0.7s';
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const subject = encodeURIComponent(data.get('subject') || 'Anfrage über hain.it');
        const body = encodeURIComponent(
            `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\n\n${data.get('message')}`
        );
        window.location.href = `mailto:info@hain.it?subject=${subject}&body=${body}`;
    });
}

function initCalculator() {
    const users = document.getElementById('calc-users');
    const plan = document.getElementById('calc-plan');
    const copilot = document.getElementById('calc-copilot');
    const power = document.getElementById('calc-power');
    const powerusers = document.getElementById('calc-powerusers');

    function calc() {
        const u = parseInt(users.value) || 0;
        const p = parseFloat(plan.value) || 0;
        const c = parseFloat(copilot.value) || 0;
        const pw = parseFloat(power.value) || 0;
        const pu = parseInt(powerusers.value) || 0;
        const monthly = (u * (p + c)) + (pu * pw);
        const yearly = monthly * 12;
        const perUser = u > 0 ? monthly / u : 0;
        const fmt = (v) => v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        document.getElementById('calc-monthly').textContent = fmt(monthly);
        document.getElementById('calc-yearly').textContent = fmt(yearly);
        document.getElementById('calc-peruser').textContent = fmt(perUser);
    }

    [users, plan, copilot, power, powerusers].forEach(el => {
        el.addEventListener('input', calc);
        el.addEventListener('change', calc);
    });
    calc();
}
