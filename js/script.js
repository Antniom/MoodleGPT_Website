document.addEventListener('DOMContentLoaded', () => {
    // --- Localization & Theme Logic ---
    let currentLang = 'en'; // Default
    const langToggleBtn = document.getElementById('lang-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light (Anthropic style)
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const savedLang = localStorage.getItem('lang') || 'en';
    currentLang = savedLang;
    updateLanguage(currentLang);

    // Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Language Toggle
    if (langToggleBtn) {
        langToggleBtn.textContent = currentLang === 'en' ? 'PT' : 'EN';
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'pt' : 'en';
            localStorage.setItem('lang', currentLang);
            langToggleBtn.textContent = currentLang === 'en' ? 'PT' : 'EN';
            updateLanguage(currentLang);

            // Restart typing effect with new language
            resetTypingEffect();
        });
    }

    function updateLanguage(lang) {
        const t = window.translations[lang];
        if (!t) return;

        // Map of IDs to translation keys (Simple binding)
        const bindings = {
            'nav-features': t.navFeatures,
            'nav-setup': t.navSetup,
            'nav-faq': t.navFaq,
            'open-tos-btn': t.navGetExt,
            'hero-badge': t.heroBadge,
            'hero-title-prefix': t.heroTitlePrefix,
            'hero-subtitle': t.heroSubtitle,
            'hero-btn-features': t.heroBtnFeatures,
            'hero-btn-install': t.heroBtnInstall,

            // Showcase
            'showcase-title': t.showcaseTitle,
            'showcase-subtitle': t.showcaseSubtitle,
            'card-extract-title': t.cardExtractTitle,
            'card-extract-desc': t.cardExtractDesc,
            'card-stealth-title': t.cardStealthTitle,
            'card-stealth-desc': t.cardStealthDesc,
            'card-auto-title': t.cardAutoTitle,
            'card-auto-desc': t.cardAutoDesc,
            'card-dblclick-title': t.cardDblClickTitle,
            'card-dblclick-desc': t.cardDblClickDesc,
            'card-context-title': t.cardContextTitle,
            'card-context-desc': t.cardContextDesc,
            'card-essay-title': t.cardEssayTitle,
            'card-essay-desc': t.cardEssayDesc,

            // Setup
            'setup-title': t.setupTitle,
            'step1-title': t.step1Title,
            'step1-desc': t.step1Desc,
            'step2-title': t.step2Title,
            'step2-desc': t.step2Desc,
            'step2-btn': t.step2Btn,
            'step3-title': t.step3Title,
            'step3-desc': t.step3Desc,

            // FAQ
            'faq-title': t.faqTitle,
            'faq1-q': t.faq1Q, 'faq1-a': t.faq1A,
            'faq2-q': t.faq2Q, 'faq2-a': t.faq2A,
            'faq3-q': t.faq3Q, 'faq3-a': t.faq3A,
            'faq4-q': t.faq4Q, 'faq4-a': t.faq4A,

            // Footer
            'footer-tos-link': t.footerPrivacy,
            'footer-contact': t.footerContact,

            // TOS
            'tos-title': t.tosTitle,
            'accept-tos-btn': t.tosAcceptBtn
        };

        for (const [id, text] of Object.entries(bindings)) {
            const el = document.getElementById(id);
            if (el) el.innerHTML = text; // Use innerHTML to preserve spans
        }
    }


    // --- Typing Effect Logic (Modified for Lang) ---
    const textElement = document.getElementById('typing-text');
    let typingTimer = null;

    function resetTypingEffect() {
        if (typingTimer) clearTimeout(typingTimer);
        typeHero(true);
    }

    function typeHero(reset = false) {
        if (!textElement) return;

        const texts = currentLang === 'en'
            ? ["Quiz Assistant", "Study Partner", "Moodle Automator"]
            : ["Assistente de Quiz", "Parceiro de Estudo", "Automator Moodle"];

        // Reset state if needed
        if (reset) {
            typeHero.textIndex = 0;
            typeHero.charIndex = 0;
            typeHero.isDeleting = false;
        }

        // Initialize static props if undefined
        if (typeof typeHero.textIndex === 'undefined') {
            typeHero.textIndex = 0;
            typeHero.charIndex = 0;
            typeHero.isDeleting = false;
        }

        let typeSpeed = 100;
        const current = texts[typeHero.textIndex];

        if (typeHero.isDeleting) {
            textElement.textContent = current.substring(0, typeHero.charIndex - 1);
            typeHero.charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = current.substring(0, typeHero.charIndex + 1);
            typeHero.charIndex++;
            typeSpeed = 100;
        }

        if (!typeHero.isDeleting && typeHero.charIndex === current.length) {
            typeHero.isDeleting = true;
            typeSpeed = 2000;
        } else if (typeHero.isDeleting && typeHero.charIndex === 0) {
            typeHero.isDeleting = false;
            typeHero.textIndex = (typeHero.textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        typingTimer = setTimeout(typeHero, typeSpeed);
    }

    // Start typing
    typeHero();


    // Animation Logic for Feature Cards using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation(entry.target.id);
            } else {
                stopAnimation(entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));

    const animationTimers = {};

    function startAnimation(cardId) {
        if (animationTimers[cardId]) return; // Already running

        switch (cardId) {
            case 'card-extract':
                animateExtract();
                break;
            case 'card-stealth':
                animateStealth();
                break;
            case 'card-auto':
                animateAuto();
                break;
            case 'card-dblclick':
                animateDoubleClick();
                break;
            case 'card-context':
                animateContextMenu();
                break;
            case 'card-essay':
                animateEssay();
                break;
        }
    }

    function stopAnimation(cardId) {
        if (animationTimers[cardId]) {
            clearTimeout(animationTimers[cardId]);
            delete animationTimers[cardId];
        }
    }

    // --- 1. Extract Animation ---
    function animateExtract() {
        const questions = document.querySelectorAll('.mock-question');
        // Reset
        questions.forEach(q => q.classList.remove('q-solved'));

        // Loop
        const loop = async () => {
            await wait(1000); // Wait for "key press"

            // Scan effect
            for (let i = 0; i < questions.length; i++) {
                questions[i].classList.add('q-solved');
                await wait(400);
            }

            await wait(2000); // Hold
            questions.forEach(q => q.classList.remove('q-solved')); // Reset
            animationTimers['card-extract'] = setTimeout(loop, 500);
        };
        loop();
    }

    // --- 2. Stealth Animation ---
    function animateStealth() {
        const overlay = document.getElementById('mock-overlay');

        const loop = async () => {
            overlay.classList.remove('hidden');
            await wait(1500);

            // Key press happens
            overlay.classList.add('hidden');
            await wait(2000);

            animationTimers['card-stealth'] = setTimeout(loop, 500);
        };
        loop();
    }

    // --- 3. Auto Animation ---
    function animateAuto() {
        const bar = document.querySelector('.progress-fill');
        const text = document.querySelector('.progress-text');

        const loop = async () => {
            bar.style.width = '0%';
            text.textContent = 'Thinking...';
            await wait(1000);

            // Question 1
            bar.style.width = '33%';
            await wait(800);

            // Question 2
            bar.style.width = '66%';
            await wait(1200); // Random delay

            // Question 3
            bar.style.width = '100%';
            text.textContent = 'Complete';
            await wait(2000);

            animationTimers['card-auto'] = setTimeout(loop, 500);
        };
        loop();
    }

    // --- 4. Double Click Animation ---
    function animateDoubleClick() {
        const cursor = document.querySelector('.cursor-pointer');
        const opt = document.getElementById('opt-2');
        const status = document.querySelector('.mock-status-box');

        const loop = async () => {
            // Reset
            cursor.style.top = '100px';
            cursor.style.left = '100px';
            opt.classList.remove('correct', 'selected');
            opt.classList.add('correct'); // Pre-set correct but not selected
            status.classList.add('hidden');

            await wait(500);

            // Move cursor to question
            cursor.style.top = '40px';
            cursor.style.left = '50px';
            await wait(800);

            // Click 1
            cursor.classList.add('clicking');
            await wait(100);
            cursor.classList.remove('clicking');
            await wait(100);

            // Click 2
            cursor.classList.add('clicking');
            await wait(100);
            cursor.classList.remove('clicking');
            await wait(300);

            // Result appear
            opt.classList.add('selected');
            status.classList.remove('hidden');

            await wait(2500);
            animationTimers['card-dblclick'] = setTimeout(loop, 500);
        };
        loop();
    }

    // --- 5. Context Menu Animation ---
    function animateContextMenu() {
        const cursor = document.querySelector('.cursor-pointer-context');
        const menu = document.querySelector('.mock-context-menu');
        const panel = document.querySelector('.mock-global-panel');

        const loop = async () => {
            // Reset
            cursor.style.top = '100px'; cursor.style.left = '100px';
            menu.classList.add('hidden');
            panel.classList.add('hidden');

            await wait(500);

            // Move cursor
            cursor.style.top = '50px'; cursor.style.left = '100px';
            await wait(800);

            // Right Click
            cursor.classList.add('clicking');
            await wait(100);
            cursor.classList.remove('clicking');
            menu.classList.remove('hidden');
            await wait(800);

            // Move to item
            cursor.style.top = '110px'; cursor.style.left = '120px'; // Approx pos of "Answer Question"
            await wait(600);

            // Click Item
            cursor.classList.add('clicking');
            await wait(100);
            cursor.classList.remove('clicking');
            menu.classList.add('hidden');

            // Show Panel
            await wait(400);
            panel.classList.remove('hidden');

            await wait(3000);
            animationTimers['card-context'] = setTimeout(loop, 500);
        };
        loop();
    }

    // --- 6. Essay Animation ---
    let essayMode = 'overlay'; // 'overlay' or 'typing'

    // Bind toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            essayMode = e.target.dataset.mode;

            // Reset animation immediately
            stopAnimation('card-essay');
            startAnimation('card-essay');
        });
    });

    function animateEssay() {
        const overlay = document.querySelector('.glass-overlay');
        const typingArea = document.querySelector('.typing-area');
        const fullText = "The Industrial Revolution was a period of scientific and technological development...";

        const loop = async () => {
            // Reset
            overlay.classList.add('hidden');
            typingArea.textContent = '';

            await wait(500); // "Analysis" time

            if (essayMode === 'overlay') {
                overlay.classList.remove('hidden');
                await wait(4000);
            } else {
                // Typing simulation
                let current = '';
                for (let i = 0; i < fullText.length; i++) {
                    current += fullText[i];
                    typingArea.textContent = current;
                    await wait(Math.random() * 50 + 30); // Random typing speed
                }
                await wait(2000);
            }

            animationTimers['card-essay'] = setTimeout(loop, 500);
        };
        loop();
    }

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- TOS Modal Logic ---
    const modal = document.getElementById('tos-backdrop');
    const openBtns = [document.getElementById('open-tos-btn'), document.getElementById('footer-tos-link')];
    const closeBtn = document.querySelector('.close-btn');
    const acceptBtn = document.getElementById('accept-tos-btn');
    const tosBody = document.getElementById('tos-content');
    const scrollNotice = document.getElementById('scroll-notice');

    if (modal && tosBody) {
        // Open Modal
        openBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.classList.add('active');
                });
            }
        });

        // Close Modal
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        // Scroll Logic
        tosBody.addEventListener('scroll', () => {
            // Check if scrolled to bottom (with 50px buffer)
            if (tosBody.scrollTop + tosBody.offsetHeight >= tosBody.scrollHeight - 50) {
                acceptBtn.classList.remove('btn-disabled');
                scrollNotice.style.display = 'none';
                scrollNotice.textContent = '';
            }
        });
    }
});
