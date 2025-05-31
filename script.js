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

// Complete Settings Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Settings Tab Navigation
    const settingsTabs = document.querySelectorAll('.settings-nav-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.getAttribute('data-panel');
            
            // Remove active class from all tabs and panels
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panel = document.getElementById(targetPanel);
            if (panel) panel.classList.add('active');
            
            // Visual feedback
            tab.style.transform = 'scale(0.98)';
            setTimeout(() => {
                tab.style.transform = '';
            }, 150);
        });
    });
    
    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.settings-toggle input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.parentElement.querySelector('span');
            const status = this.checked ? 'Enabled' : 'Disabled';
            
            // Visual feedback
            this.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.parentElement.style.transform = '';
            }, 200);
            
            showSettingsNotification(`${label.textContent}: ${status}`);
        });
    });
    
    // Language selector
    const languageSelect = document.getElementById('demo-language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            showSettingsNotification(`Language changed to: ${this.options[this.selectedIndex].text}`);
        });
    }
    
    // Sync frequency selector
    const syncSelect = document.getElementById('demo-sync-frequency');
    if (syncSelect) {
        syncSelect.addEventListener('change', function() {
            showSettingsNotification(`Sync frequency: ${this.options[this.selectedIndex].text}`);
        });
    }
    
    // Settings action buttons
    const settingsButtons = document.querySelectorAll('.settings-actions .btn');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            // Simulate action
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.opacity = '';
                this.style.transform = '';
                
                switch(action) {
                    case 'Export Settings':
                        showSettingsNotification('Settings exported successfully!');
                        break;
                    case 'Import Settings':
                        showSettingsNotification('Settings imported successfully!');
                        break;
                    case 'Reset to Defaults':
                        showSettingsNotification('Settings reset to defaults!');
                        break;
                    case 'Manual Sync':
                        showSettingsNotification('Database sync completed!');
                        break;
                }
            }, 300);
        });
    });
    
    function showSettingsNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'settings-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
});

// Multi-Language Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageBtns = document.querySelectorAll('.language-demo-btn');
    const languageResults = document.querySelectorAll('.language-result');
    const autoDetectBtn = document.getElementById('auto-detect-demo');
    const translateBtn = document.getElementById('translate-demo');
    
    // Language switching
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang');
            
            // Remove active class from all buttons and results
            languageBtns.forEach(b => b.classList.remove('active'));
            languageResults.forEach(r => r.classList.remove('active'));
            
            // Add active class to clicked button and corresponding result
            btn.classList.add('active');
            const result = document.getElementById(`demo-${targetLang}`);
            if (result) result.classList.add('active');
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
    
    // Auto-detect functionality
    if (autoDetectBtn) {
        autoDetectBtn.addEventListener('click', () => {
            autoDetectBtn.disabled = true;
            autoDetectBtn.textContent = 'Detecting...';
            
            setTimeout(() => {
                autoDetectBtn.textContent = 'Language Detected: Spanish';
                autoDetectBtn.style.background = '#10b981';
                
                // Activate Spanish
                document.querySelector('[data-lang="spanish"]').click();
            }, 1500);
        });
    }
    
    // Translation functionality
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            translateBtn.disabled = true;
            translateBtn.textContent = 'Translating...';
            
            setTimeout(() => {
                translateBtn.textContent = 'Translation Complete!';
                translateBtn.style.background = '#10b981';
                
                // Show translated content
                showTranslationResult();
            }, 2000);
        });
    }
    
    function showTranslationResult() {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'translation-result';
        resultDiv.innerHTML = `
            <h4>📄 Translated Content</h4>
            <p><strong>Original:</strong> ¿Cuál es la derivada de f(x) = 3x² + 2x - 5?</p>
            <p><strong>English:</strong> What is the derivative of f(x) = 3x² + 2x - 5?</p>
            <p><strong>Answer:</strong> f'(x) = 6x + 2</p>
        `;
        resultDiv.style.cssText = `
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            animation: fadeInUp 0.5s ease;
        `;
        
        const container = document.querySelector('#demo-multilang .demo-content');
        container.appendChild(resultDiv);
    }
});

// Learning Modes Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    const learningModeBtns = document.querySelectorAll('.learning-mode-btn');
    const modeContents = document.querySelectorAll('.mode-content');
    
    learningModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetMode = btn.getAttribute('data-mode');
            
            // Remove active class from all buttons and contents
            learningModeBtns.forEach(b => b.classList.remove('active'));
            modeContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const content = document.getElementById(`${targetMode}-content`);
            if (content) content.classList.add('active');
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Initialize mode-specific functionality
            initializeModeFeatures(targetMode);
        });
    });
    
    function initializeModeFeatures(mode) {
        switch(mode) {
            case 'study':
                initializeStudyMode();
                break;
            case 'exam':
                initializeExamMode();
                break;
            case 'hint':
                initializeHintMode();
                break;
        }
    }
    
    function initializeStudyMode() {
        const createFlashcardBtn = document.getElementById('create-flashcard-btn');
        if (createFlashcardBtn) {
            createFlashcardBtn.onclick = () => {
                createFlashcardBtn.textContent = 'Flashcard Created! ✅';
                createFlashcardBtn.style.background = '#10b981';
                setTimeout(() => {
                    createFlashcardBtn.textContent = 'Create Flashcard';
                    createFlashcardBtn.style.background = '#2563eb';
                }, 2000);
            };
        }
    }
    
    function initializeExamMode() {
        const requestHintBtn = document.getElementById('request-hint-btn');
        if (requestHintBtn) {
            requestHintBtn.onclick = () => {
                requestHintBtn.textContent = 'Hint requests limited in exam mode';
                requestHintBtn.style.background = '#f59e0b';
                requestHintBtn.disabled = true;
            };
        }
    }
    
    function initializeHintMode() {
        const hintBtns = document.querySelectorAll('.hint-btn');
        hintBtns.forEach((btn, index) => {
            btn.onclick = () => {
                btn.style.background = '#10b981';
                btn.style.color = 'white';
                btn.textContent = 'Revealed ✅';
                
                // Enable next hint button
                if (hintBtns[index + 1]) {
                    hintBtns[index + 1].disabled = false;
                    hintBtns[index + 1].style.opacity = '1';
                }
            };
        });
    }
});

// Batch Processing Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    const inputMethodBtns = document.querySelectorAll('.input-method-btn');
    const inputSections = document.querySelectorAll('.input-section');
    const processBtn = document.getElementById('start-batch-process');
    const exportBtns = document.querySelectorAll('.export-btn');
    
    // Input method switching
    inputMethodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetMethod = btn.getAttribute('data-method');
            
            // Remove active class from all buttons and sections
            inputMethodBtns.forEach(b => b.classList.remove('active'));
            inputSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const section = document.getElementById(`${targetMethod}-input`);
            if (section) section.classList.add('active');
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
    
    // Batch processing simulation
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            startBatchProcessing();
        });
    }
    
    // Export functionality
    exportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.getAttribute('data-format');
            simulateExport(format);
        });
    });
    
    function startBatchProcessing() {
        const progressBars = document.querySelectorAll('.batch-progress-bar');
        const statusText = document.getElementById('batch-status');
        const processBtn = document.getElementById('start-batch-process');
        
        processBtn.disabled = true;
        processBtn.textContent = 'Processing...';
        statusText.textContent = 'Initializing batch processing...';
        
        // Simulate processing multiple items
        const items = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
        let currentItem = 0;
        
        const processInterval = setInterval(() => {
            if (currentItem < items.length) {
                const progress = ((currentItem + 1) / items.length) * 100;
                progressBars.forEach(bar => {
                    bar.style.width = `${progress}%`;
                });
                
                statusText.textContent = `Processing ${items[currentItem]}... (${currentItem + 1}/${items.length})`;
                currentItem++;
            } else {
                clearInterval(processInterval);
                
                // Processing complete
                statusText.textContent = 'Batch processing completed! 🎉';
                processBtn.textContent = 'Process Complete ✅';
                processBtn.style.background = '#10b981';
                
                // Show export buttons
                const exportSection = document.querySelector('.export-section');
                if (exportSection) {
                    exportSection.style.display = 'block';
                    exportSection.style.animation = 'fadeInUp 0.5s ease';
                }
                
                // Update stats
                updateBatchStats();
            }
        }, 800);
    }
    
    function simulateExport(format) {
        const btn = event.target;
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.textContent = 'Exporting...';
        
        setTimeout(() => {
            btn.textContent = `Exported to ${format.toUpperCase()} ✅`;
            btn.style.background = '#10b981';
            
            // Show download notification
            showNotification(`Successfully exported to ${format.toUpperCase()} format!`, 'success');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    }
    
    function updateBatchStats() {
        const stats = {
            'batch-questions': '25',
            'batch-accuracy': '94%',
            'batch-time': '2.3 min'
        };
        
        Object.entries(stats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                element.style.animation = 'pulse 1s ease';
            }
        });
    }
});

// Hotkeys Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hotkeyCombos = document.querySelectorAll('.hotkey-combo');
    const testBtn = document.getElementById('test-hotkeys-btn');
    const hotkeyLog = document.getElementById('hotkey-log');
    
    let isTestMode = false;
    let testedHotkeys = new Set();
    
    // Hotkey testing mode
    if (testBtn) {
        testBtn.addEventListener('click', () => {
            isTestMode = !isTestMode;
            
            if (isTestMode) {
                testBtn.textContent = 'Stop Testing';
                testBtn.style.background = '#ef4444';
                hotkeyLog.innerHTML = '<div class="log-entry">🎮 Test mode active! Try pressing hotkey combinations...</div>';
                
                // Enable keyboard listeners
                enableHotkeyTesting();
            } else {
                testBtn.textContent = 'Test Hotkeys';
                testBtn.style.background = '#2563eb';
                hotkeyLog.innerHTML = '<div class="log-entry">💡 Click "Test Hotkeys" to try the keyboard shortcuts!</div>';
                
                // Disable keyboard listeners
                disableHotkeyTesting();
            }
        });
    }
    
    // Individual hotkey demonstrations
    hotkeyCombos.forEach(combo => {
        combo.addEventListener('click', () => {
            const action = combo.querySelector('.hotkey-action').textContent;
            demonstrateHotkey(action, combo);
        });
    });
    
    function enableHotkeyTesting() {
        document.addEventListener('keydown', handleHotkeyTest);
    }
    
    function disableHotkeyTesting() {
        document.removeEventListener('keydown', handleHotkeyTest);
        testedHotkeys.clear();
        
        // Reset visual states
        hotkeyCombos.forEach(combo => {
            combo.classList.remove('tested');
        });
    }
    
    function handleHotkeyTest(e) {
        if (!isTestMode) return;
        
        const keyCombo = getKeyCombo(e);
        const matchingHotkey = findMatchingHotkey(keyCombo);
        
        if (matchingHotkey) {
            e.preventDefault();
            const action = matchingHotkey.querySelector('.hotkey-action').textContent;
            logHotkeyTest(keyCombo, action, true);
            
            // Mark as tested
            matchingHotkey.classList.add('tested');
            testedHotkeys.add(keyCombo);
            
            // Check if all hotkeys tested
            if (testedHotkeys.size >= 8) {
                setTimeout(() => {
                    logHotkeyTest('', 'All hotkeys tested! 🎉', true);
                }, 500);
            }
        }
    }
    
    function getKeyCombo(e) {
        const keys = [];
        if (e.ctrlKey) keys.push('Ctrl');
        if (e.altKey) keys.push('Alt');
        if (e.shiftKey) keys.push('Shift');
        
        const key = e.key.toUpperCase();
        if (key !== 'CONTROL' && key !== 'ALT' && key !== 'SHIFT') {
            keys.push(key);
        }
        
        return keys.join('+');
    }
    
    function findMatchingHotkey(keyCombo) {
        const hotkeyMap = {
            'ALT+S': 'solve-question',
            'ALT+X': 'extract-answer', 
            'ALT+F': 'create-flashcard',
            'ALT+Q': 'open-qa',
            'ALT+1': 'study-mode',
            'ALT+2': 'exam-mode',
            'ALT+3': 'hint-mode',
            'ESCAPE': 'close-popup',
            'ALT+SHIFT+S': 'toggle-study',
            'ALT+SHIFT+E': 'toggle-exam',
            'ALT+SHIFT+H': 'toggle-hint',
            'CTRL+ALT+B': 'batch-process',
            'CTRL+ALT+C': 'copy-results',
            'CTRL+ALT+T': 'toggle-theme',
            'CTRL+ALT+R': 'refresh-qa'
        };
        
        const action = hotkeyMap[keyCombo];
        if (action) {
            return document.querySelector(`[data-action="${action}"]`);
        }
        
        return null;
    }
    
    function logHotkeyTest(keyCombo, action, success) {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${success ? 'success' : 'error'}`;
        logEntry.innerHTML = `
            <span class="log-time">${new Date().toLocaleTimeString()}</span>
            <span class="log-combo">${keyCombo}</span>
            <span class="log-action">${action}</span>
            <span class="log-status">${success ? '✅' : '❌'}</span>
        `;
        
        hotkeyLog.appendChild(logEntry);
        hotkeyLog.scrollTop = hotkeyLog.scrollHeight;
    }
    
    function demonstrateHotkey(action, element) {
        // Visual feedback
        element.style.transform = 'scale(1.05)';
        element.style.background = 'rgba(37, 99, 235, 0.1)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.background = '';
        }, 300);
        
        // Show action feedback
        const feedback = document.createElement('div');
        feedback.className = 'hotkey-feedback';
        feedback.textContent = `🎮 ${action} activated!`;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: hotkey-feedback 2s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
});

// Integrations Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    const integrationCards = document.querySelectorAll('.integration-card');
    const testIntegrationBtns = document.querySelectorAll('.test-integration-btn');
    const connectBtns = document.querySelectorAll('.connect-btn');
    
    // Integration card hover effects
    integrationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Test integration functionality
    testIntegrationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            testIntegration(platform, btn);
        });
    });
    
    // Connect button functionality
    connectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            simulateConnection(service, btn);
        });
    });
    
    function testIntegration(platform, button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Testing...';
        
        // Simulate connection test
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% success rate
            
            if (isSuccess) {
                button.textContent = 'Connected ✅';
                button.style.background = '#10b981';
                showIntegrationResult(platform, 'success');
            } else {
                button.textContent = 'Failed ❌';
                button.style.background = '#ef4444';
                showIntegrationResult(platform, 'error');
            }
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }, 2000);
    }
    
    function simulateConnection(service, button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Connecting...';
        
        setTimeout(() => {
            button.textContent = 'Connected ✅';
            button.style.background = '#10b981';
            showIntegrationResult(service, 'connected');
            
            setTimeout(() => {
                button.textContent = 'Disconnect';
                button.style.background = '#ef4444';
                button.disabled = false;
                
                // Change functionality to disconnect
                button.onclick = () => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.onclick = () => simulateConnection(service, button);
                    showIntegrationResult(service, 'disconnected');
                };
            }, 2000);
        }, 1500);
    }
    
    function showIntegrationResult(platform, status) {
        const messages = {
            'success': `✅ ${platform} integration working perfectly!`,
            'error': `❌ ${platform} connection failed. Check your settings.`,
            'connected': `🔗 Successfully connected to ${platform}!`,
            'disconnected': `🔌 Disconnected from ${platform}.`
        };
        
        const colors = {
            'success': '#10b981',
            'error': '#ef4444', 
            'connected': '#2563eb',
            'disconnected': '#f59e0b'
        };
        
        const notification = document.createElement('div');
        notification.className = 'integration-notification';
        notification.textContent = messages[status];
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: ${colors[status]};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInUp 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
});

// Add CSS animations for new features
const newAnimationStyles = `
    <style>
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideOutDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes hotkey-feedback {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        15% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        85% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
    }
    
    .settings-toggle input:checked + .toggle-slider {
        background: #10b981;
    }
    
    .settings-toggle input:checked + .toggle-slider:before {
        transform: translateX(20px);
    }
    
    .updating {
        animation: pulse 0.3s ease;
    }
    
    .tested {
        background: rgba(16, 185, 129, 0.1) !important;
        border-color: #10b981 !important;
    }
    
    .log-entry.success {
        background: rgba(16, 185, 129, 0.1);
        border-left: 3px solid #10b981;
    }
    
    .log-entry.error {
        background: rgba(239, 68, 68, 0.1);
        border-left: 3px solid #ef4444;
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', newAnimationStyles);

// Demo Progress Tracking and Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo progress tracking
    const demoProgress = {
        'extension-interface': false,
        'confidence': false, 
        'qa-database': false,
        'flashcards': false,
        'progress': false,
        'themes': false,
        'settings': false,
        'multilang': false,
        'learning-modes': false,
        'batch': false,
        'hotkeys': false,
        'integrations': false
    };
    
    // Track demo interactions
    function markDemoAsExplored(demoId) {
        if (!demoProgress[demoId]) {
            demoProgress[demoId] = true;
            updateProgressIndicator();
            
            // Show completion notification
            const completedCount = Object.values(demoProgress).filter(Boolean).length;
            if (completedCount === Object.keys(demoProgress).length) {
                showCompletionCelebration();
            }
        }
    }
    
    function updateProgressIndicator() {
        const completedCount = Object.values(demoProgress).filter(Boolean).length;
        const totalCount = Object.keys(demoProgress).length;
        const percentage = Math.round((completedCount / totalCount) * 100);
        
        // Update or create progress indicator
        let progressIndicator = document.getElementById('demo-progress-indicator');
        if (!progressIndicator) {
            progressIndicator = createProgressIndicator();
        }
        
        const progressBar = progressIndicator.querySelector('.progress-fill');
        const progressText = progressIndicator.querySelector('.progress-text');
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completedCount}/${totalCount} demos explored (${percentage}%)`;
        
        // Color coding
        if (percentage < 30) {
            progressBar.style.background = '#ef4444';
        } else if (percentage < 70) {
            progressBar.style.background = '#f59e0b';
        } else {
            progressBar.style.background = '#10b981';
        }
    }
    
    function createProgressIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'demo-progress-indicator';
        indicator.innerHTML = `
            <div class="progress-header">
                <span class="progress-label">🎯 Demo Exploration Progress</span>
                <span class="progress-text">0/12 demos explored (0%)</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill"></div>
            </div>
        `;
        indicator.style.cssText = `
            position: fixed;
            top: 60px;
            left: 20px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            z-index: 1000;
            min-width: 280px;
            font-size: 14px;
        `;
        
        // Add progress styles
        const progressStyles = `
            <style>
            .progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .progress-label {
                font-weight: 600;
                color: #1f2937;
            }
            
            .progress-text {
                font-size: 12px;
                color: #6b7280;
            }
            
            .progress-track {
                width: 100%;
                height: 6px;
                background: #f3f4f6;
                border-radius: 3px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                width: 0%;
                background: #ef4444;
                border-radius: 3px;
                transition: all 0.5s ease;
            }
            
            #demo-progress-indicator {
                animation: slideInLeft 0.5s ease;
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            </style>
        `;
        
        if (!document.querySelector('style[data-progress]')) {
            const style = document.createElement('style');
            style.setAttribute('data-progress', '');
            style.textContent = progressStyles.replace(/<\/?style>/g, '');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(indicator);
        return indicator;
    }
    
    function showCompletionCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div class="celebration-content">
                <h2>🎉 Congratulations!</h2>
                <p>You've explored all MoodleGPT Pro demo features!</p>
                <p>Ready to supercharge your Moodle experience?</p>
                <div class="celebration-actions">
                    <a href="#download" class="btn-primary">Download MoodleGPT Pro</a>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn-secondary">Continue Exploring</button>
                </div>
            </div>
        `;
        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
        `;
        
        const celebrationStyles = `
            <style>
            .celebration-content {
                background: white;
                border-radius: 16px;
                padding: 40px;
                text-align: center;
                max-width: 500px;
                animation: celebrationBounce 0.6s ease;
            }
            
            .celebration-content h2 {
                margin: 0 0 16px 0;
                color: #1f2937;
                font-size: 28px;
            }
            
            .celebration-content p {
                margin: 0 0 12px 0;
                color: #6b7280;
                font-size: 16px;
                line-height: 1.5;
            }
            
            .celebration-actions {
                display: flex;
                gap: 16px;
                justify-content: center;
                margin-top: 24px;
            }
            
            @keyframes celebrationBounce {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }
            </style>
        `;
        
        if (!document.querySelector('style[data-celebration]')) {
            const style = document.createElement('style');
            style.setAttribute('data-celebration', '');
            style.textContent = celebrationStyles.replace(/<\/?style>/g, '');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(celebration);
    }
    
    // Enhanced demo tab switching with progress tracking
    const originalDemoTabs = document.querySelectorAll('.demo-tab');
    originalDemoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const demoId = tab.getAttribute('data-demo');
            markDemoAsExplored(demoId);
        });
    });
    
    // Track interactions within demo panels
    const trackableElements = document.querySelectorAll(`
        .demo-mode-btn, .theme-option, .settings-nav-tab, .language-demo-btn,
        .learning-mode-btn, .input-method-btn, .hotkey-combo, .integration-card
    `);
    
    trackableElements.forEach(element => {
        element.addEventListener('click', () => {
            const demoPanel = element.closest('.demo-panel');
            if (demoPanel) {
                const demoId = demoPanel.id.replace('demo-', '');
                markDemoAsExplored(demoId);
            }
        });
    });
    
    // Initialize progress indicator
    setTimeout(() => {
        updateProgressIndicator();
    }, 1000);
});

// Enhanced Error Handling and User Feedback
window.addEventListener('error', function(e) {
    console.error('Demo Error:', e.error);
    
    // Show user-friendly error message
    const errorNotification = document.createElement('div');
    errorNotification.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Oops! Something went wrong with the demo. Please refresh the page.</span>
            <button onclick="location.reload()" class="btn-fix">Refresh Page</button>
        </div>
    `;
    errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 16px;
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease;
    `;
    
    const errorStyles = `
        <style>
        .error-content {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #dc2626;
            font-size: 14px;
        }
        
        .error-content i {
            font-size: 18px;
            flex-shrink: 0;
        }
        
        .btn-fix {
            background: #dc2626;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            margin-left: auto;
            flex-shrink: 0;
        }
        
        .btn-fix:hover {
            background: #b91c1c;
        }
        </style>
    `;
    
    if (!document.querySelector('style[data-error]')) {
        const style = document.createElement('style');
        style.setAttribute('data-error', '');
        style.textContent = errorStyles.replace(/<\/?style>/g, '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(errorNotification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorNotification.parentElement) {
            errorNotification.remove();
        }
    }, 10000);
});

// Performance optimization for demo animations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll-based animations
const optimizedScrollHandler = debounce(() => {
    // Existing scroll functionality with better performance
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.removeEventListener('scroll', function() {}); // Remove old listener
window.addEventListener('scroll', optimizedScrollHandler);

console.log('🚀 MoodleGPT Pro Website - All demo features loaded successfully!');
console.log('📊 Interactive demos: 12 comprehensive sections');
console.log('🎮 Features: Settings, Multi-language, Learning modes, Batch processing, Hotkeys, Integrations');
console.log('✨ Enhanced with progress tracking, error handling, and performance optimizations');
