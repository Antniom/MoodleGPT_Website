// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Demo tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoTabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetDemo = tab.getAttribute('data-demo');
            const targetPanel = document.getElementById(`demo-${targetDemo}`);
            
            if (!targetPanel) {
                console.error('Target panel not found:', `demo-${targetDemo}`);
                return;
            }
            
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            targetPanel.classList.add('active');
            
            // Add visual feedback
            tab.style.transform = 'scale(0.98)';
            setTimeout(() => {
                tab.style.transform = '';
            }, 150);
        });
    });
    
    // Ensure first tab is active on load
    if (demoTabs.length > 0 && demoPanels.length > 0) {
        demoTabs[0].classList.add('active');
        demoPanels[0].classList.add('active');
    }
});

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            // Add visual feedback
            option.style.transform = 'scale(1.05)';
            setTimeout(() => {
                option.style.transform = '';
            }, 200);
        });
    });
});

// Animated counters for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-number')) {
                const value = entry.target.textContent.replace(/[^\d]/g, '');
                if (value) {
                    animateCounter(entry.target, parseInt(value));
                }
            }
            
            // Animate confidence bar
            if (entry.target.classList.contains('confidence-fill')) {
                entry.target.style.width = '92%';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.stat-number, .feature-card, .pricing-card, .confidence-fill');
    animateElements.forEach(el => observer.observe(el));
});

// Download functionality
function downloadPro() {
    // Create a mock download
    const downloadData = {
        name: "MoodleGPT_Pro_v7.0.zip",
        files: [
            "NewApproach/",
            "NewApproach/manifest.json",
            "NewApproach/popup_gemini.html",
            "NewApproach/popup_gemini.js",
            "NewApproach/background.js",
            "NewApproach/content_gemini.js",
            "NewApproach/gemini_answer.js",
            "NewApproach/study_features.js",
            "NewApproach/theme-manager.js",
            "NewApproach/qa-sync.js",
            "NewApproach/translations.js",
            "NewApproach/error-handler.js",
            "NewApproach/settings.html",
            "NewApproach/settings.js",
            "NewApproach/help.html",
            "NewApproach/help.js",
            "NewApproach/QA.json",
            "NewApproach/icon/",
            "README.md",
            "INSTALLATION_GUIDE.md"
        ]
    };
    
    // Show download modal
    showDownloadModal(downloadData);
}

function showDownloadModal(data) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-download"></i> Download MoodleGPT Pro</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="download-info">
                    <div class="download-package">
                        <i class="fas fa-file-archive"></i>
                        <div class="package-details">
                            <h4>${data.name}</h4>
                            <p>Complete MoodleGPT Pro package with all features</p>
                            <div class="package-size">~2.5 MB</div>
                        </div>
                    </div>
                    <div class="file-list">
                        <h5>Package Contents:</h5>
                        <ul>
                            ${data.files.map(file => `<li><i class="fas fa-${file.endsWith('/') ? 'folder' : 'file'}"></i> ${file}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="download-note">
                        <i class="fas fa-info-circle"></i>
                        <p>This download includes the complete MoodleGPT Pro extension with all premium features. Follow the installation guide below to set it up.</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn-primary" onclick="startDownload()">
                    <i class="fas fa-download"></i> Start Download
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #1a73e8;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f5f5f5;
            color: #333;
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .download-package {
            display: flex;
            align-items: center;
            gap: 16px;
            background: #f8fbff;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 24px;
        }
        
        .download-package i {
            font-size: 32px;
            color: #1a73e8;
        }
        
        .package-details h4 {
            margin: 0 0 4px 0;
            color: #1a1a1a;
        }
        
        .package-details p {
            margin: 0 0 8px 0;
            color: #666;
            font-size: 14px;
        }
        
        .package-size {
            background: #e3f2fd;
            color: #1a73e8;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }
        
        .file-list {
            margin-bottom: 24px;
        }
        
        .file-list h5 {
            margin: 0 0 12px 0;
            color: #1a1a1a;
        }
        
        .file-list ul {
            max-height: 200px;
            overflow-y: auto;
            background: #f8f8f8;
            border-radius: 8px;
            padding: 16px;
            margin: 0;
            list-style: none;
        }
        
        .file-list li {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 0;
            color: #666;
            font-size: 14px;
        }
        
        .file-list li i {
            color: #1a73e8;
            width: 16px;
        }
        
        .download-note {
            display: flex;
            gap: 12px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 16px;
        }
        
        .download-note i {
            color: #f39c12;
            font-size: 16px;
            margin-top: 2px;
        }
        
        .download-note p {
            margin: 0;
            color: #856404;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            padding: 24px;
            border-top: 1px solid #eee;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.download-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function startDownload() {
    // Create a download notification
    showNotification('Download started! Please check your Downloads folder.', 'success');
    
    // Create a mock ZIP file download
    const link = document.createElement('a');
    link.href = 'data:application/zip;base64,UEsDBBQAAAAIABCqVVMA...'; // Mock base64 data
    link.download = 'MoodleGPT_Pro_v7.0.zip';
    
    // In a real implementation, this would point to the actual ZIP file
    // For demo purposes, we'll create a text file with installation instructions
    const instructions = `
MoodleGPT Pro Installation Instructions
=====================================

Thank you for downloading MoodleGPT Pro!

Installation Steps:
1. Extract this ZIP file to a folder on your computer
2. Open Chrome or Edge browser
3. Go to chrome://extensions/ (or edge://extensions/)
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the NewApproach folder
6. Get a free Gemini API key from https://makersuite.google.com/app/apikey
7. Configure the API key in the extension settings
8. Visit any Moodle quiz page and enjoy!

Features included:
- AI-powered answer suggestions
- Confidence indicators
- Community Q&A database
- Progress tracking
- Custom themes
- Study features

For support, visit: https://antniom.github.io/

Happy studying!
António Coelho
    `;
    
    const blob = new Blob([instructions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'MoodleGPT_Pro_Installation_Instructions.txt';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    closeModal();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    const notificationStyles = `
        <style>
        .notification {
            position: fixed;
            top: 90px;
            right: 24px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid #4CAF50;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }
        
        .notification i {
            color: #4CAF50;
            font-size: 18px;
        }
        
        .notification span {
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        </style>
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', '');
        style.textContent = notificationStyles.replace(/<\/?style>/g, '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real implementation, you would send this data to your server
            console.log('Form submitted:', data);
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 1000);
            }
        });
    });
});

// Add CSS for loading buttons
const loadingStyles = `
    <style>
    .btn-primary.loading,
    .btn-secondary.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .btn-primary.loading::after,
    .btn-secondary.loading::after {
        content: "";
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);

// Initialize particles background for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(26, 115, 232, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add particle animation CSS
const particleStyles = `
    <style>
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', particleStyles);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Realistic Extension Demo Animation
class ExtensionDemo {
    constructor() {
        this.isPlaying = false;
        this.currentStep = 0;
        this.steps = [
            { name: 'Click Extension', duration: 1000 },
            { name: 'Popup Opens', duration: 1500 },
            { name: 'Select Mode', duration: 1200 },
            { name: 'Extract Answer', duration: 2000 },
            { name: 'Show Results', duration: 2500 }
        ];
        this.init();
    }

    init() {
        this.createDemoControls();
        this.setupEventListeners();
    }

    createDemoControls() {
        const demoContainer = document.querySelector('.animated-demo');
        if (!demoContainer) return;

        // Add demo steps indicator
        const stepsHTML = `
            <div class="demo-steps">
                ${this.steps.map((step, index) => 
                    `<div class="demo-step" data-step="${index}" title="${step.name}"></div>`
                ).join('')}
            </div>
        `;

        // Add control buttons
        const controlsHTML = `
            <div class="demo-controls">
                <button class="demo-control-btn" id="play-extension-demo">▶ Play Demo</button>
                <button class="demo-control-btn" id="replay-extension-demo" style="display: none;">🔄 Replay</button>
            </div>
        `;

        demoContainer.insertAdjacentHTML('afterend', stepsHTML + controlsHTML);
    }

    setupEventListeners() {
        const playBtn = document.getElementById('play-extension-demo');
        const replayBtn = document.getElementById('replay-extension-demo');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => this.startDemo());
        }
        
        if (replayBtn) {
            replayBtn.addEventListener('click', () => this.startDemo());
        }

        // Manual extension icon click
        const extensionIcon = document.getElementById('extension-icon');
        if (extensionIcon) {
            extensionIcon.addEventListener('click', () => {
                if (!this.isPlaying) {
                    this.togglePopup();
                }
            });
        }

        // Popup close button
        const closeBtn = document.getElementById('close-popup');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePopup());
        }

        // Mode buttons
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isPlaying) {
                    this.selectMode(btn);
                }
            });
        });
    }

    async startDemo() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentStep = 0;
        
        const playBtn = document.getElementById('play-extension-demo');
        const replayBtn = document.getElementById('replay-extension-demo');
        
        // Update button states
        playBtn.style.display = 'none';
        playBtn.disabled = true;
        
        // Reset all elements
        this.resetDemo();
        
        // Start animation sequence
        await this.runDemoSequence();
        
        // Demo complete
        this.isPlaying = false;
        playBtn.style.display = 'none';
        replayBtn.style.display = 'inline-block';
    }

    async runDemoSequence() {
        // Step 1: Highlight extension icon
        await this.animateStep(0, async () => {
            const extensionIcon = document.getElementById('extension-icon');
            extensionIcon.style.transform = 'scale(1.2)';
            extensionIcon.style.boxShadow = '0 0 0 4px rgba(26, 115, 232, 0.3)';
            await this.wait(500);
            extensionIcon.style.transform = 'scale(1.05)';
        });

        // Step 2: Show popup
        await this.animateStep(1, async () => {
            await this.showPopup();
            await this.wait(800);
        });

        // Step 3: Select Study mode
        await this.animateStep(2, async () => {
            const studyBtn = document.getElementById('study-mode');
            studyBtn.style.transform = 'scale(1.1)';
            studyBtn.style.boxShadow = '0 0 0 3px rgba(26, 115, 232, 0.3)';
            await this.wait(600);
            this.selectMode(studyBtn);
            studyBtn.style.transform = '';
            studyBtn.style.boxShadow = '';
        });

        // Step 4: Extract answer (simulate processing)
        await this.animateStep(3, async () => {
            const confidenceFill = document.querySelector('.confidence-fill');
            const confidenceText = document.querySelector('.confidence-text');
            
            // Animate confidence building
            confidenceText.textContent = 'Processing...';
            confidenceFill.style.width = '0%';
            confidenceFill.style.background = '#ff9800';
            
            await this.wait(500);
            confidenceFill.style.width = '60%';
            confidenceText.textContent = 'Analyzing question...';
            
            await this.wait(700);
            confidenceFill.style.width = '95%';
            confidenceFill.style.background = 'linear-gradient(90deg, #34a853, #7cb342)';
            confidenceText.textContent = 'High Confidence (95%)';
            
            // Highlight correct answer
            const correctOption = document.querySelector('.quiz-option:first-child');
            correctOption.classList.add('correct');
        });

        // Step 5: Show results overlay
        await this.animateStep(4, async () => {
            await this.showResults();
            await this.wait(2000);
            await this.hideResults();
        });
    }

    async animateStep(stepIndex, animationFn) {
        this.updateStepIndicators(stepIndex);
        await animationFn();
        document.querySelector(`.demo-step[data-step="${stepIndex}"]`).classList.add('completed');
        await this.wait(200);
    }

    updateStepIndicators(activeStep) {
        const steps = document.querySelectorAll('.demo-step');
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === activeStep) {
                step.classList.add('active');
            }
        });
    }

    async showPopup() {
        const popup = document.getElementById('extension-popup');
        const extensionIcon = document.getElementById('extension-icon');
        
        extensionIcon.classList.add('active');
        popup.classList.add('visible');
        
        return this.wait(300);
    }

    hidePopup() {
        const popup = document.getElementById('extension-popup');
        const extensionIcon = document.getElementById('extension-icon');
        
        popup.classList.remove('visible');
        extensionIcon.classList.remove('active');
        extensionIcon.style.transform = '';
        extensionIcon.style.boxShadow = '';
    }

    togglePopup() {
        const popup = document.getElementById('extension-popup');
        if (popup.classList.contains('visible')) {
            this.hidePopup();
        } else {
            this.showPopup();
        }
    }

    selectMode(button) {
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    async showResults() {
        const browserContent = document.querySelector('.browser-content');
        
        // Create results overlay if it doesn't exist
        let resultsPanel = document.querySelector('.results-panel');
        if (!resultsPanel) {
            resultsPanel = document.createElement('div');
            resultsPanel.className = 'results-panel';
            resultsPanel.innerHTML = `
                <h3>🎯 Correct Answer Found!</h3>
                <div class="answer">f'(x) = 6x + 2</div>
                <div class="explanation">
                    Using the power rule: The derivative of 3x² is 6x, 
                    the derivative of 2x is 2, and the derivative of a constant (-5) is 0.
                </div>
            `;
            browserContent.appendChild(resultsPanel);
        }
        
        resultsPanel.classList.add('visible');
        return this.wait(300);
    }

    async hideResults() {
        const resultsPanel = document.querySelector('.results-panel');
        if (resultsPanel) {
            resultsPanel.classList.remove('visible');
        }
        return this.wait(300);
    }

    resetDemo() {
        // Reset all visual states
        this.hidePopup();
        this.hideResults();
        
        // Reset quiz options
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
        
        // Reset confidence indicator
        const confidenceFill = document.querySelector('.confidence-fill');
        const confidenceText = document.querySelector('.confidence-text');
        if (confidenceFill && confidenceText) {
            confidenceFill.style.width = '95%';
            confidenceFill.style.background = 'linear-gradient(90deg, #34a853, #7cb342)';
            confidenceText.textContent = 'High Confidence (95%)';
        }
        
        // Reset step indicators
        const steps = document.querySelectorAll('.demo-step');
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        // Reset extension icon
        const extensionIcon = document.getElementById('extension-icon');
        if (extensionIcon) {
            extensionIcon.style.transform = '';
            extensionIcon.style.boxShadow = '';
            extensionIcon.classList.remove('active');
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the extension demo when page loads
document.addEventListener('DOMContentLoaded', function() {
    new ExtensionDemo();
});

// Extension Interface Demo Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to update status with animation
    function updateStatus(message, color) {
        const statusEl = document.getElementById('demo-status');
        if (statusEl) {
            statusEl.classList.add('updating');
            statusEl.textContent = message;
            statusEl.style.color = color;
            
            setTimeout(() => {
                statusEl.classList.remove('updating');
            }, 300);
        }
    }
    
    // Mode button functionality
    const demoModeButtons = document.querySelectorAll('.demo-mode-btn');
    demoModeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all mode buttons
            demoModeButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = '#6b7280';
            });
            
            // Add active class and color to clicked button
            button.classList.add('active');
            button.style.background = '#10b981';
            
            // Update status message based on mode
            const mode = button.getAttribute('data-mode');
            switch(mode) {
                case 'study':
                    updateStatus('📚 Study Mode Activated - Detailed explanations enabled', '#10b981');
                    break;
                case 'exam':
                    updateStatus('🎯 Exam Mode Activated - Minimal hints only', '#f59e0b');
                    break;
                case 'hint':
                    updateStatus('💡 Hint Mode Activated - Guidance without answers', '#8b5cf6');
                    break;
            }
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });

    // Flashcard button functionality
    const flashcardBtn = document.querySelector('.demo-flashcard-btn');
    const flashcardCount = document.getElementById('demo-flashcard-count');
    
    if (flashcardBtn && flashcardCount) {
        flashcardBtn.addEventListener('click', () => {
            // Simulate reviewing flashcards
            let currentCount = parseInt(flashcardCount.textContent);
            if (currentCount > 0) {
                currentCount--;
                flashcardCount.textContent = currentCount;
                
                // Visual feedback
                flashcardBtn.style.background = 'rgba(16,185,129,0.9)';
                flashcardBtn.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    flashcardBtn.style.background = 'rgba(16,185,129,0.7)';
                    flashcardBtn.style.transform = '';
                }, 200);
                
                updateStatus(`📚 Reviewed flashcard! ${currentCount} remaining`, '#10b981');
            } else {
                // All done
                updateStatus('🎉 All flashcards reviewed! Great job!', '#22c55e');
                flashcardCount.textContent = '0';
            }
        });
    }

    // Other interactive buttons
    const demoButtons = document.querySelectorAll('.demo-manage-btn, .demo-settings-btn, .demo-help-btn, .demo-save-btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Show feedback based on button type
            if (button.classList.contains('demo-manage-btn')) {
                updateStatus('💳 Opening payment management...', '#2563eb');
            } else if (button.classList.contains('demo-settings-btn')) {
                updateStatus('⚙️ Opening settings panel...', '#6366f1');
            } else if (button.classList.contains('demo-help-btn')) {
                updateStatus('❓ Opening help documentation...', '#059669');
            } else if (button.classList.contains('demo-save-btn')) {
                updateStatus('✅ API Key saved successfully!', '#22c55e');
            }
        });
    });
});

// ...existing code...
