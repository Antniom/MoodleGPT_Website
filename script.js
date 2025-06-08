// Website JavaScript for MoodleGPT

// Global variables
let currentDemoVersion = 'pro';
let currentStep = 1;
let totalSteps = 4;

// Loading screen
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system first
    initializeLanguage();
    
    // Simulate loading
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Initialize all animations and scrolling
        initializeAnimations();
        initializeSmoothScrolling();
        initializeMobileScrolling();
        initializeScrollEffects();
    }, 3000);
    
    // Initialize navbar
    initializeNavbar();
    
    // Initialize hero popup
    initializeHeroPopup();
    
    // Initialize demo
    initializeDemo();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
      // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
}

// Initialize hero popup with actual extension UI
function initializeHeroPopup() {
    const heroPopup = document.getElementById('heroPopup');
    heroPopup.innerHTML = createExtensionUI('pro', 'hero');
}

// Initialize animations - prevent multiple initialization
let animationsInitialized = false;

function initializeAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add different animation classes based on element type
                const element = entry.target;
                
                // Check if already animated to prevent re-triggering
                if (element.classList.contains('animate-in') || element.classList.contains('revealed')) {
                    observer.unobserve(element);
                    return;
                }
                
                if (element.classList.contains('comparison-card')) {
                    element.classList.add('animate-in', 'slide-up');
                } else if (element.classList.contains('feature-card')) {
                    element.classList.add('animate-in', 'fade-scale');
                } else if (element.classList.contains('pricing-card')) {
                    element.classList.add('animate-in', 'bounce-in');
                } else if (element.classList.contains('section-reveal')) {
                    element.classList.add('revealed');
                } else {
                    element.classList.add('animate-in', 'slide-up');
                }
                
                // Add staggered delays for multiple elements
                const siblings = Array.from(element.parentNode.children);
                const index = siblings.indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
                
                // Unobserve element after animation to prevent re-triggering
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.comparison-card, .feature-card, .pricing-card, .section-reveal, .hero-content, .hero-visual').forEach(card => {
        observer.observe(card);
    });
    
    // Initialize parallax scrolling
    initializeParallax();
    
    // Initialize progressive reveal
    initializeProgressiveReveal();
}

// Enhanced smooth scrolling with easing
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for navbar
        const start = window.pageYOffset;
        const distance = offsetTop - start;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
        let startTime = null;
        
        function scrollAnimation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (ease-out-quart)
            const ease = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, start + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }
        
        requestAnimationFrame(scrollAnimation);
    }
}

// Initialize parallax scrolling effects - prevent multiple initialization
let parallaxInitialized = false;

function initializeParallax() {
    if (parallaxInitialized) return;
    parallaxInitialized = true;
    
    const parallaxElements = document.querySelectorAll('.parallax-element, .floating-shapes, .hero-background');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2); // Different speeds for different elements
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttled scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize progressive reveal animations - prevent multiple initialization
let progressiveRevealInitialized = false;

function initializeProgressiveReveal() {
    if (progressiveRevealInitialized) return;
    progressiveRevealInitialized = true;
    
    const progressiveElements = document.querySelectorAll('.progressive-reveal');
      const progressiveObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Check if already revealed to prevent re-triggering
                if (entry.target.classList.contains('show')) {
                    progressiveObserver.unobserve(entry.target);
                    return;
                }
                
                setTimeout(() => {
                    entry.target.classList.add('show');
                    // Unobserve after animation to prevent re-triggering
                    progressiveObserver.unobserve(entry.target);
                }, index * 100); // Stagger the reveals
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });
      progressiveElements.forEach(element => {
        progressiveObserver.observe(element);
    });
}

// Demo functionality
function initializeDemo() {
    goToStep(1);
    updateStepIndicator();
}

function switchDemoVersion(version) {
    currentDemoVersion = version;
    
    // Update version buttons
    document.querySelectorAll('.version-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-version="${version}"]`).classList.add('active');
    
    // Reload current step with new version
    goToStep(currentStep);
}

function goToStep(step) {
    currentStep = step;
    
    // Update step buttons
    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    
    // Load step content
    loadStepContent(step);
    updateStepIndicator();
    updateNavigationButtons();
}

function loadStepContent(step) {
    const demoScreen = document.getElementById('demoScreen');
    
    switch(step) {
        case 1:
            demoScreen.innerHTML = createSetupDemo();
            break;
        case 2:
            demoScreen.innerHTML = createQuizSolvingDemo();
            break;
        case 3:
            demoScreen.innerHTML = createStudyFeaturesDemo();
            break;
        case 4:
            demoScreen.innerHTML = createCustomizationDemo();
            break;
    }
    
    // Add interactive elements after content is loaded
    setTimeout(() => {
        addStepInteractivity(step);
    }, 100);
}

function createSetupDemo() {
    return `
        <div class="demo-step-content">
            <h3>Step 1: Easy Setup</h3>
            <p>Get started with MoodleGPT ${currentDemoVersion === 'pro' ? 'Pro' : 'Standard'} in just a few clicks:</p>
            <div class="setup-demo">
                ${createExtensionUI(currentDemoVersion, 'setup')}
                <div class="setup-instructions">
                    <div class="instruction-item">
                        <span class="instruction-number">1</span>
                        <span>Install the extension</span>
                    </div>
                    <div class="instruction-item">
                        <span class="instruction-number">2</span>
                        <span>Get your Gemini API key</span>
                    </div>
                    <div class="instruction-item">
                        <span class="instruction-number">3</span>
                        <span>Enter your API key</span>
                    </div>
                    <div class="instruction-item">
                        <span class="instruction-number">4</span>
                        <span>Start solving quizzes!</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createQuizSolvingDemo() {
    return `
        <div class="demo-step-content">
            <h3>Step 2: AI-Powered Quiz Solving</h3>
            <p>Watch how MoodleGPT intelligently analyzes and answers quiz questions:</p>
            <div class="quiz-demo">
                <div class="quiz-question">
                    <h4>Sample Quiz Question:</h4>
                    <div class="question-content">
                        <p><strong>Which of the following is a characteristic of object-oriented programming?</strong></p>
                        <div class="quiz-options">
                            <label><input type="radio" name="demo-q1" value="a"> A) Linear execution</label>
                            <label><input type="radio" name="demo-q1" value="b"> B) Encapsulation</label>
                            <label><input type="radio" name="demo-q1" value="c"> C) Procedural approach</label>
                            <label><input type="radio" name="demo-q1" value="d"> D) Static typing only</label>
                        </div>
                    </div>
                </div>
                <div class="ai-analysis">
                    <div class="analysis-step">
                        <span class="step-icon">🔍</span>
                        <span>Analyzing question context...</span>
                    </div>
                    <div class="analysis-step">
                        <span class="step-icon">🧠</span>
                        <span>Processing with Gemini AI...</span>
                    </div>
                    <div class="analysis-step">
                        <span class="step-icon">✅</span>
                        <span>Answer: B) Encapsulation - Correct!</span>
                    </div>
                </div>
                <button class="demo-solve-btn" onclick="simulateQuizSolving()">Use Alt+S to Solve</button>
            </div>
        </div>
    `;
}

function createStudyFeaturesDemo() {
    if (currentDemoVersion === 'standard') {
        return `
            <div class="demo-step-content">
                <h3>Step 3: Study Features</h3>
                <div class="feature-unavailable">
                    <div class="unavailable-icon">🔒</div>
                    <h4>Advanced Study Features</h4>
                    <p>Flashcards, progress tracking, and study analytics are available in MoodleGPT Pro.</p>
                    <button class="btn btn-primary" onclick="switchDemoVersion('pro')">Upgrade to Pro</button>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="demo-step-content">
            <h3>Step 3: Advanced Study Features (Pro Only)</h3>
            <p>Enhance your learning with intelligent study tools:</p>
            <div class="study-features-demo">
                <div class="feature-tabs">
                    <button class="tab-btn active" onclick="showStudyFeature('flashcards')">Flashcards</button>
                    <button class="tab-btn" onclick="showStudyFeature('progress')">Progress</button>
                    <button class="tab-btn" onclick="showStudyFeature('analytics')">Analytics</button>
                </div>
                <div class="feature-content" id="studyFeatureContent">
                    ${createFlashcardsDemo()}
                </div>
            </div>
        </div>
    `;
}

function createCustomizationDemo() {
    if (currentDemoVersion === 'standard') {
        return `
            <div class="demo-step-content">
                <h3>Step 4: Customization</h3>
                <div class="feature-unavailable">
                    <div class="unavailable-icon">🔒</div>
                    <h4>Theme & UI Customization</h4>
                    <p>Beautiful themes and UI customization options are available in MoodleGPT Pro.</p>
                    <button class="btn btn-primary" onclick="switchDemoVersion('pro')">Upgrade to Pro</button>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="demo-step-content">
            <h3>Step 4: Beautiful Customization (Pro Only)</h3>
            <p>Personalize your experience with stunning themes and settings:</p>
            <div class="customization-demo">
                <div class="theme-preview">
                    ${createExtensionUI('pro', 'customization')}
                </div>
                <div class="customization-controls">
                    <h4>Choose Your Theme:</h4>
                    <div class="theme-gallery">                        <div class="theme-item" onclick="changeThemePreview('light')">
                            <div class="theme-preview-mini theme-light"></div>
                            <span>☀️ Light</span>
                        </div>
                        <div class="theme-item active" onclick="changeThemePreview('dark')">
                            <div class="theme-preview-mini theme-dark"></div>
                            <span>🌙 Dark</span>
                        </div>
                        <div class="theme-item" onclick="changeThemePreview('ocean')">
                            <div class="theme-preview-mini theme-ocean"></div>
                            <span>🌊 Ocean</span>
                        </div>
                        <div class="theme-item" onclick="changeThemePreview('forest')">
                            <div class="theme-preview-mini theme-forest"></div>
                            <span>🌲 Forest</span>
                        </div>
                        <div class="theme-item" onclick="changeThemePreview('royal')">
                            <div class="theme-preview-mini theme-royal"></div>
                            <span>👑 Royal</span>
                        </div>
                        <div class="theme-item" onclick="changeThemePreview('sunset')">
                            <div class="theme-preview-mini theme-sunset"></div>
                            <span>🌅 Sunset</span>
                        </div>
                        <div class="theme-item" onclick="changeThemePreview('rose')">
                            <div class="theme-preview-mini theme-rose"></div>
                            <span>� Rose</span>
                        </div>
                    </div>
                    <div class="size-controls">
                        <h4>UI Size:</h4>
                        <div class="size-options">
                            <button class="size-btn" onclick="changeUISize('compact')">Compact</button>
                            <button class="size-btn active" onclick="changeUISize('expanded')">Expanded</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createExtensionUI(version, context) {
    const isProVersion = version === 'pro';
    
    if (context === 'setup') {
        return `
            <div class="extension-ui">
                <div class="ui-header">
                    <div class="ui-title">MoodleGPT ${isProVersion ? 'Pro' : 'Standard'}</div>
                    <div class="ui-subtitle">AI-Powered Quiz Assistant</div>
                </div>
                <input type="text" class="ui-input" placeholder="Enter your Gemini API key..." value="">
                <button class="ui-button ui-button-primary" onclick="simulateAPIKeySave()">Save API Key</button>
                <div class="ui-status" id="setupStatus" style="display: none;"></div>
                ${isProVersion ? `
                    <div class="ui-section">
                        <h4>Quick Settings</h4>
                        <button class="ui-button" onclick="openSettings()">⚙️ Settings</button>
                        <button class="ui-button" onclick="openHelp()">❓ Help</button>
                    </div>
                ` : ''}
                <div class="ui-footer">
                    <small>Hotkey: Alt+S to extract quiz</small>
                </div>
            </div>
        `;
    } else if (context === 'customization' && isProVersion) {
        return `
            <div class="extension-ui" id="themePreviewUI">
                <div class="ui-header">
                    <div class="ui-title">MoodleGPT Pro</div>
                    <div class="ui-subtitle">Dark Theme Active</div>
                </div>
                <input type="text" class="ui-input" placeholder="API Key configured ✓" disabled>
                <button class="ui-button ui-button-primary">Extract Quiz Content</button>                <div class="ui-status success">Ready to solve quizzes!</div>
                <div class="ui-section">
                    <div class="theme-selector">
                        <div class="theme-option theme-light" onclick="changeThemePreview('light')"></div>
                        <div class="theme-option theme-dark active" onclick="changeThemePreview('dark')"></div>
                        <div class="theme-option theme-ocean" onclick="changeThemePreview('ocean')"></div>
                        <div class="theme-option theme-forest" onclick="changeThemePreview('forest')"></div>
                        <div class="theme-option theme-royal" onclick="changeThemePreview('royal')"></div>
                        <div class="theme-option theme-sunset" onclick="changeThemePreview('sunset')"></div>
                        <div class="theme-option theme-rose" onclick="changeThemePreview('rose')"></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="extension-ui">
                <div class="ui-header">
                    <div class="ui-title">MoodleGPT ${isProVersion ? 'Pro' : 'Standard'}</div>
                    <div class="ui-subtitle">Ready to assist</div>
                </div>
                <input type="text" class="ui-input" placeholder="API Key configured ✓" disabled>
                <button class="ui-button ui-button-primary">Extract Quiz Content</button>
                <div class="ui-status success">Connected and ready!</div>
                ${isProVersion ? `
                    <div class="ui-section">
                        <button class="ui-button">📚 Study Features</button>
                        <button class="ui-button">⚙️ Settings</button>
                    </div>
                ` : ''}
                <div class="ui-footer">
                    <small>Press Alt+S on any quiz page</small>
                </div>
            </div>
        `;
    }
}

function createFlashcardsDemo() {
    return `
        <div class="flashcards-demo">
            <div class="flashcard">
                <div class="flashcard-front">
                    <h4>What is encapsulation in OOP?</h4>
                    <button class="flip-btn" onclick="flipFlashcard()">Show Answer</button>
                </div>
                <div class="flashcard-back" style="display: none;">
                    <p>Encapsulation is the bundling of data and methods that operate on that data within a single unit or class, hiding internal implementation details.</p>
                    <div class="flashcard-actions">
                        <button class="difficulty-btn easy" onclick="markDifficulty('easy')">Easy</button>
                        <button class="difficulty-btn medium" onclick="markDifficulty('medium')">Medium</button>
                        <button class="difficulty-btn hard" onclick="markDifficulty('hard')">Hard</button>
                    </div>
                </div>
            </div>
            <div class="flashcard-stats">
                <div class="stat">
                    <span class="stat-number">24</span>
                    <span class="stat-label">Cards Studied</span>
                </div>
                <div class="stat">
                    <span class="stat-number">87%</span>
                    <span class="stat-label">Accuracy</span>
                </div>
                <div class="stat">
                    <span class="stat-number">5</span>
                    <span class="stat-label">Due Today</span>
                </div>
            </div>
        </div>
    `;
}

// Step navigation
function nextStep() {
    if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

function updateStepIndicator() {
    document.querySelector('.current-step').textContent = currentStep;
    document.querySelector('.total-steps').textContent = totalSteps;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentStep === 1;
    nextBtn.disabled = currentStep === totalSteps;
}

// Interactive functions
function addStepInteractivity(step) {
    // Add specific interactivity based on step
    if (step === 2) {
        // Auto-select correct answer after delay
        setTimeout(() => {
            simulateQuizSolving();
        }, 2000);
    }
}

function simulateAPIKeySave() {
    const status = document.getElementById('setupStatus');
    status.style.display = 'block';
    status.className = 'ui-status';
    status.textContent = 'Validating API key...';
    
    setTimeout(() => {
        status.className = 'ui-status success';
        status.textContent = '✅ API key saved successfully!';
    }, 1500);
}

function simulateQuizSolving() {
    const options = document.querySelectorAll('input[name="demo-q1"]');
    const analysisSteps = document.querySelectorAll('.analysis-step');
    
    // Animate analysis steps
    analysisSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
            
            if (index === 2) {
                // Select correct answer
                setTimeout(() => {
                    options[1].checked = true; // Option B
                    options[1].parentElement.style.background = 'rgba(16, 185, 129, 0.2)';
                    options[1].parentElement.style.border = '2px solid #10b981';
                }, 500);
            }
        }, index * 800);
    });
}

function showStudyFeature(feature) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const content = document.getElementById('studyFeatureContent');
    
    switch(feature) {
        case 'flashcards':
            content.innerHTML = createFlashcardsDemo();
            break;
        case 'progress':
            content.innerHTML = createProgressDemo();
            break;
        case 'analytics':
            content.innerHTML = createAnalyticsDemo();
            break;
    }
}

function createProgressDemo() {
    return `
        <div class="progress-demo">
            <div class="progress-chart">
                <h4>Learning Progress</h4>
                <div class="progress-bars">
                    <div class="progress-item">
                        <span>JavaScript Fundamentals</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%;"></div>
                        </div>
                        <span>85%</span>
                    </div>
                    <div class="progress-item">
                        <span>Object-Oriented Programming</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 92%;"></div>
                        </div>
                        <span>92%</span>
                    </div>
                    <div class="progress-item">
                        <span>Data Structures</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 67%;"></div>
                        </div>
                        <span>67%</span>
                    </div>
                </div>
            </div>
            <div class="streak-info">
                <div class="streak-counter">
                    <span class="streak-number">🔥 7</span>
                    <span class="streak-label">Day Streak</span>
                </div>
            </div>
        </div>
    `;
}

function createAnalyticsDemo() {
    return `
        <div class="analytics-demo">
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h4>Questions Answered</h4>
                    <div class="analytics-number">342</div>
                    <div class="analytics-trend">+23 this week</div>
                </div>
                <div class="analytics-card">
                    <h4>Average Accuracy</h4>
                    <div class="analytics-number">89%</div>
                    <div class="analytics-trend">+5% improvement</div>
                </div>
                <div class="analytics-card">
                    <h4>Study Time</h4>
                    <div class="analytics-number">24h</div>
                    <div class="analytics-trend">This month</div>
                </div>
                <div class="analytics-card">
                    <h4>Weak Areas</h4>
                    <div class="weak-areas">
                        <span class="weak-topic">Algorithms</span>
                        <span class="weak-topic">Database Design</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function flipFlashcard() {
    const front = document.querySelector('.flashcard-front');
    const back = document.querySelector('.flashcard-back');
    
    front.style.display = 'none';
    back.style.display = 'block';
}

function markDifficulty(level) {
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Simulate saving and showing next card
    setTimeout(() => {
        const flashcard = document.querySelector('.flashcard');
        flashcard.style.transform = 'translateX(100%)';
        flashcard.style.opacity = '0';
        
        setTimeout(() => {
            // Reset to front and show new question
            document.querySelector('.flashcard-front').style.display = 'block';
            document.querySelector('.flashcard-back').style.display = 'none';
            document.querySelector('.flashcard-front h4').textContent = 'What is polymorphism?';
            flashcard.style.transform = 'translateX(0)';
            flashcard.style.opacity = '1';
        }, 300);
    }, 500);
}

function changeThemePreview(theme) {
    const ui = document.getElementById('themePreviewUI');
    const subtitle = ui.querySelector('.ui-subtitle');
    
    // Update theme classes
    ui.className = `extension-ui theme-${theme}`;
      // Update subtitle
    const themeNames = {
        light: 'Light Theme',
        dark: 'Dark Theme',
        ocean: 'Ocean Theme',
        forest: 'Forest Theme',
        royal: 'Royal Theme',
        sunset: 'Sunset Theme',
        rose: 'Rose Theme'
    };
    
    subtitle.textContent = `${themeNames[theme]} Active`;
    
    // Update active theme selector
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`.theme-option.theme-${theme}`).classList.add('active');
    
    // Update gallery selection
    document.querySelectorAll('.theme-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.theme-item').classList.add('active');
}

function changeUISize(size) {
    const ui = document.getElementById('themePreviewUI');
    
    if (size === 'compact') {
        ui.style.transform = 'scale(0.8)';
        ui.style.transformOrigin = 'center';
    } else {
        ui.style.transform = 'scale(1)';
    }
    
    // Update size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Global variable to track current modal feature
let currentModalFeature = null;

// Feature demo functions
function showFeatureDemo(feature) {
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Store the current feature for language switching
    currentModalFeature = feature;
    
    const featureContent = {
        'ai-answering': {
            title: getTranslation('modalAiAnsweringTitle'),
            content: `
                <div class="feature-demo-content">
                    <h4>${getTranslation('modalAiAnsweringHow')}</h4>
                    <div class="ai-process">
                        <div class="process-step">
                            <div class="step-icon">📝</div>
                            <div class="step-content">
                                <h5>${getTranslation('modalQuestionAnalysis')}</h5>
                                <p>${getTranslation('modalQuestionAnalysisDesc')}</p>
                            </div>
                        </div>
                        <div class="process-step">
                            <div class="step-icon">🧠</div>
                            <div class="step-content">
                                <h5>${getTranslation('modalKnowledgeProcessing')}</h5>
                                <p>${getTranslation('modalKnowledgeProcessingDesc')}</p>
                            </div>
                        </div>
                        <div class="process-step">
                            <div class="step-icon">✨</div>
                            <div class="step-content">
                                <h5>${getTranslation('modalAnswerGeneration')}</h5>
                                <p>${getTranslation('modalAnswerGenerationDesc')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="accuracy-stats">
                        <h4>${getTranslation('modalAccuracyByType')}</h4>
                        <div class="accuracy-item">
                            <span>${getTranslation('modalMultipleChoice')}</span>
                            <div class="accuracy-bar">
                                <div class="accuracy-fill" style="width: 95%"></div>
                            </div>
                            <span>95%</span>
                        </div>
                        <div class="accuracy-item">
                            <span>${getTranslation('modalTrueFalse')}</span>
                            <div class="accuracy-bar">
                                <div class="accuracy-fill" style="width: 98%"></div>
                            </div>
                            <span>98%</span>
                        </div>
                        <div class="accuracy-item">
                            <span>${getTranslation('modalFillBlank')}</span>
                            <div class="accuracy-bar">
                                <div class="accuracy-fill" style="width: 87%"></div>
                            </div>
                            <span>87%</span>
                        </div>
                    </div>
                </div>
            `
        },
        'study-system': {
            title: getTranslation('modalStudySystemTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="study-features-grid">
                        <div class="study-feature">
                            <div class="feature-icon">🗂️</div>
                            <h4>${getTranslation('modalSmartFlashcards')}</h4>
                            <p>${getTranslation('modalSmartFlashcardsDesc')}</p>
                        </div>
                        <div class="study-feature">
                            <div class="feature-icon">📊</div>
                            <h4>${getTranslation('modalProgressTracking')}</h4>
                            <p>${getTranslation('modalProgressTrackingDesc')}</p>
                        </div>
                        <div class="study-feature">
                            <div class="feature-icon">🎯</div>
                            <h4>${getTranslation('modalWeakAreaDetection')}</h4>
                            <p>${getTranslation('modalWeakAreaDetectionDesc')}</p>
                        </div>
                        <div class="study-feature">
                            <div class="feature-icon">🔥</div>
                            <h4>${getTranslation('modalStudyStreaks')}</h4>
                            <p>${getTranslation('modalStudyStreaksDesc')}</p>
                        </div>
                    </div>
                    <div class="upgrade-prompt">
                        <p><strong>${getTranslation('modalAvailableProOnly')}</strong></p>
                        <button class="btn btn-primary">${getTranslation('modalUpgradeToProBtn')}</button>
                    </div>
                </div>
            `
        },
        'themes': {
            title: getTranslation('modalThemesTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="themes-showcase">
                        <div class="theme-preview-large">
                            <div class="theme-demo light-theme">
                                <h4>${getTranslation('modalLightTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo dark-theme">
                                <h4>${getTranslation('modalDarkTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo ocean-theme">
                                <h4>${getTranslation('modalOceanTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo forest-theme">
                                <h4>${getTranslation('modalForestTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo royal-theme">
                                <h4>${getTranslation('modalRoyalTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo sunset-theme">
                                <h4>${getTranslation('modalSunsetTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                            <div class="theme-demo rose-theme">
                                <h4>${getTranslation('modalRoseTheme')}</h4>
                                <div class="theme-ui-preview">
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                    <div class="ui-element"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-features">
                        <h4>${getTranslation('modalThemeFeatures')}</h4>
                        <ul>
                            <li>${getTranslation('modalThemeFeature1')}</li>
                            <li>${getTranslation('modalThemeFeature2')}</li>
                            <li>${getTranslation('modalThemeFeature3')}</li>
                            <li>${getTranslation('modalThemeFeature4')}</li>
                            <li>${getTranslation('modalThemeFeature5')}</li>
                        </ul>
                    </div>
                </div>
            `
        },        'hotkeys': {
            title: getTranslation('modalHotkeysTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="hotkeys-list">
                        <div class="hotkey-item">
                            <div class="hotkey-combo">
                                <kbd>Alt</kbd> + <kbd>S</kbd>
                            </div>
                            <div class="hotkey-description">
                                <h4>${getTranslation('modalExtractQuizContent')}</h4>
                                <p>${getTranslation('modalInstantlyExtract')}</p>
                            </div>
                        </div>
                        <div class="hotkey-item">
                            <div class="hotkey-combo">
                                <kbd>Alt</kbd> + <kbd>X</kbd>
                            </div>
                            <div class="hotkey-description">
                                <h4>${getTranslation('modalToggleResults')}</h4>
                                <p>${getTranslation('modalToggleResultsDesc')}</p>
                            </div>
                        </div>
                        <div class="hotkey-demo">
                            <h4>${getTranslation('modalHotkeysHow')}</h4>
                            <div class="demo-sequence">
                                <div class="demo-step">
                                    <span class="step-number">1</span>
                                    <span>${getTranslation('modalHotkeysStep1')}</span>
                                </div>
                                <div class="demo-step">
                                    <span class="step-number">2</span>
                                    <span>${getTranslation('modalHotkeysStep2')}</span>
                                </div>
                                <div class="demo-step">
                                    <span class="step-number">3</span>
                                    <span>${getTranslation('modalHotkeysStep3')}</span>
                                </div>
                                <div class="demo-step">
                                    <span class="step-number">4</span>
                                    <span>${getTranslation('modalHotkeysStep4')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },        'auto-select': {
            title: getTranslation('modalAutoSelectTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="auto-select-demo">
                        <div class="demo-explanation">
                            <h4>${getTranslation('modalAutoSelectHow')}</h4>
                            <p>${getTranslation('modalAutoSelectDesc')}</p>
                        </div>
                        
                        <div class="auto-select-process">
                            <div class="process-step">
                                <div class="step-icon">🔍</div>
                                <div class="step-content">
                                    <h5>${getTranslation('modalQuestionDetection')}</h5>
                                    <p>${getTranslation('modalQuestionDetectionDesc')}</p>
                                </div>
                            </div>
                            <div class="process-step">
                                <div class="step-icon">🧠</div>
                                <div class="step-content">
                                    <h5>${getTranslation('modalAnswerAnalysis')}</h5>
                                    <p>${getTranslation('modalAnswerAnalysisDesc')}</p>
                                </div>
                            </div>
                            <div class="process-step">
                                <div class="step-icon">🎯</div>
                                <div class="step-content">
                                    <h5>${getTranslation('modalAutomaticSelection')}</h5>
                                    <p>${getTranslation('modalAutomaticSelectionDesc')}</p>
                                </div>
                            </div>
                        </div>

                        <div class="feature-benefits">
                            <h4>${getTranslation('modalBenefits')}</h4>
                            <ul>
                                <li>${getTranslation('modalBenefit1')}</li>
                                <li>${getTranslation('modalBenefit2')}</li>
                                <li>${getTranslation('modalBenefit3')}</li>
                                <li>${getTranslation('modalBenefit4')}</li>
                                <li>${getTranslation('modalBenefit5')}</li>
                            </ul>
                        </div>

                        <div class="demo-visual">
                            <h4>${getTranslation('modalVisualDemo')}</h4>
                            <div class="moodle-quiz-preview">
                                <div class="question-block">
                                    <h5>${getTranslation('modalSampleQuestion')}</h5>
                                    <p>${getTranslation('modalCapitalFrance')}</p>
                                    <div class="quiz-options">
                                        <label class="quiz-option">
                                            <input type="radio" name="demo-auto" value="london">
                                            <span>${getTranslation('modalLondon')}</span>
                                        </label>
                                        <label class="quiz-option selected-answer">
                                            <input type="radio" name="demo-auto" value="paris" checked>
                                            <span>${getTranslation('modalParis')}</span>
                                        </label>
                                        <label class="quiz-option">
                                            <input type="radio" name="demo-auto" value="berlin">
                                            <span>${getTranslation('modalBerlin')}</span>
                                        </label>
                                        <label class="quiz-option">
                                            <input type="radio" name="demo-auto" value="madrid">
                                            <span>${getTranslation('modalMadrid')}</span>
                                        </label>
                                    </div>
                                    <div class="auto-select-indicator">
                                        <span class="indicator-icon">🤖</span>
                                        <span>${getTranslation('modalAutoSelectedBy')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="upgrade-prompt">
                            <p><strong>${getTranslation('modalAvailableProOnly')}</strong></p>
                            <button class="btn btn-primary" onclick="scrollToSection('pricing')">${getTranslation('modalUpgradeToProBtn')}</button>
                        </div>
                    </div>
                </div>
            `
        },        'privacy': {
            title: getTranslation('modalPrivacyTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="privacy-features">
                        <div class="privacy-item">
                            <div class="privacy-icon">🔑</div>
                            <h4>${getTranslation('modalYourOwnApiKey')}</h4>
                            <p>${getTranslation('modalYourOwnApiKeyDesc')}</p>
                        </div>
                        <div class="privacy-item">
                            <div class="privacy-icon">🏠</div>
                            <h4>${getTranslation('modalLocalStorage')}</h4>
                            <p>${getTranslation('modalLocalStorageDesc')}</p>
                        </div>
                        <div class="privacy-item">
                            <div class="privacy-icon">🔒</div>
                            <h4>${getTranslation('modalNoDataCollection')}</h4>
                            <p>${getTranslation('modalNoDataCollectionDesc')}</p>
                        </div>
                        <div class="privacy-item">
                            <div class="privacy-icon">💰</div>
                            <h4>${getTranslation('modalCostControl')}</h4>
                            <p>${getTranslation('modalCostControlDesc')}</p>
                        </div>
                    </div>
                    <div class="api-setup">
                        <h4>${getTranslation('modalGettingApiKey')}</h4>
                        <ol>
                            <li><a href="https://makersuite.google.com/app/apikey" target="_blank">${getTranslation('modalApiStep1')}</a></li>
                            <li>${getTranslation('modalApiStep2')}</li>
                            <li>${getTranslation('modalApiStep3')}</li>
                            <li>${getTranslation('modalApiStep4')}</li>
                        </ol>
                    </div>
                </div>
            `
        },
        'multilingual': {
            title: getTranslation('modalMultilingualTitle'),
            content: `
                <div class="feature-demo-content">
                    <div class="language-grid">
                        <div class="language-item">
                            <span class="flag">🇺🇸</span>
                            <span>${getTranslation('modalEnglish')}</span>
                        </div>
                        <div class="language-item">
                            <span class="flag">🇪🇸</span>
                            <span>${getTranslation('modalSpanish')}</span>
                        </div>
                        <div class="language-item">
                            <span class="flag">🇫🇷</span>
                            <span>${getTranslation('modalFrench')}</span>
                        </div>
                        <div class="language-item">
                            <span class="flag">🇩🇪</span>
                            <span>${getTranslation('modalGerman')}</span>
                        </div>
                        <div class="language-item">
                            <span class="flag">🇮🇹</span>
                            <span>${getTranslation('modalItalian')}</span>
                        </div>
                        <div class="language-item">
                            <span class="flag">🇵🇹</span>
                            <span>${getTranslation('modalPortuguese')}</span>
                        </div>
                    </div>
                    <div class="translation-demo">
                        <h4>${getTranslation('modalAutomaticTranslation')}</h4>
                        <p>${getTranslation('modalTranslationDesc')}</p>
                        <div class="translation-example">
                            <div class="original">
                                <strong>${getTranslation('modalEnglish')}:</strong> "${getTranslation('modalTranslationExample')}"
                            </div>
                            <div class="translated">
                                <strong>${getTranslation('modalSpanish')}:</strong> "${getTranslation('modalTranslationExampleEs')}"
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    const content = featureContent[feature];
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.content;
    
    modal.classList.add('active');
}

function closeFeatureModal() {
    document.getElementById('featureModal').classList.remove('active');
    currentModalFeature = null; // Clear the stored feature
}

// Function to refresh modal content when language changes
function refreshModalContent() {
    const modal = document.getElementById('featureModal');
    if (modal && modal.classList.contains('active') && currentModalFeature) {
        // Re-show the same feature to update the content with new translations
        showFeatureDemo(currentModalFeature);
    }
}

// Make refreshModalContent globally available
window.refreshModalContent = refreshModalContent;

// Helper function to get feature content
function getFeatureContent(feature) {
    const featureContent = {
        'ai-answering': { title: getTranslation('modalAiAnsweringTitle') },
        'study-system': { title: getTranslation('modalStudySystemTitle') },
        'themes': { title: getTranslation('modalThemesTitle') },
        'hotkeys': { title: getTranslation('modalHotkeysTitle') },
        'auto-select': { title: getTranslation('modalAutoSelectTitle') },
        'privacy': { title: getTranslation('modalPrivacyTitle') },
        'multilingual': { title: getTranslation('modalMultilingualTitle') }
    };
    return featureContent[feature];
}

// Enhanced smooth scrolling for all anchor links - prevent multiple initialization
let smoothScrollingInitialized = false;

function initializeSmoothScrolling() {
    if (smoothScrollingInitialized) return;
    smoothScrollingInitialized = true;
    // Handle all anchor links, not just nav links
    document.addEventListener('click', (e) => {
        // Check if the clicked element is an anchor link
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        }
    });
    
    // Add smooth scrolling to buttons that trigger scrolling
    document.addEventListener('click', (e) => {
        if (e.target.matches('button[onclick*="scrollToSection"]')) {
            // Extract the section ID from the onclick attribute
            const onclickValue = e.target.getAttribute('onclick');
            const match = onclickValue.match(/scrollToSection\('([^']+)'\)/);
            if (match) {
                e.preventDefault();
                scrollToSection(match[1]);
            }
        }
    });
}

// Add momentum scrolling effect for mobile devices - prevent multiple initialization
let mobileScrollingInitialized = false;

function initializeMobileScrolling() {
    if (mobileScrollingInitialized) return;
    mobileScrollingInitialized = true;
    if (window.innerWidth <= 768) {
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.overflowScrolling = 'touch';
    }
}

// Add scroll-based navbar transparency - prevent multiple initialization
let scrollEffectsInitialized = false;

function initializeScrollEffects() {
    if (scrollEffectsInitialized) return;
    scrollEffectsInitialized = true;
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// Utility functions
function openSettings() {
    alert('Settings page would open in the actual extension!');
}

function openHelp() {
    alert('Help page would open in the actual extension!');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('featureModal');
    if (e.target === modal) {
        closeFeatureModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFeatureModal();
    }
    
    if (e.altKey && e.key === 'ArrowLeft') {
        previousStep();
    }
    
    if (e.altKey && e.key === 'ArrowRight') {
        nextStep();
    }
});

// Footer Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Enhanced keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close any open modal
    if (e.key === 'Escape') {
        const modals = ['featureModal', 'privacyModal', 'termsModal', 'supportModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && modal.style.display === 'flex') {
                closeModal(modalId);
            }
        });
    }
    
    // Demo navigation
    if (e.key === 'ArrowLeft') {
        navigateDemo('prev');
    } else if (e.key === 'ArrowRight') {
        navigateDemo('next');
    }
});

initializeSmoothScrolling();
initializeMobileScrolling();
initializeScrollEffects();