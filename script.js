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
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDemo = tab.getAttribute('data-demo');
            
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(`demo-${targetDemo}`).classList.add('active');
        });
    });
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

// Bot Showcase Animation
class BotShowcase {
    constructor() {
        this.isPlaying = false;
        this.init();
    }

    init() {
        const playBtn = document.getElementById('play-demo');
        const replayBtn = document.getElementById('replay-demo');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => this.startDemo());
        }
        
        if (replayBtn) {
            replayBtn.addEventListener('click', () => this.startDemo());
        }
    }

    async startDemo() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const playBtn = document.getElementById('play-demo');
        const replayBtn = document.getElementById('replay-demo');
        const botAssistant = document.getElementById('bot-assistant');
        const responseText = document.querySelector('.response-text');
        const confidenceFill = document.getElementById('confidence-fill');
        const confidenceText = document.getElementById('confidence-text');
        const options = document.querySelectorAll('.option');
        
        // Hide buttons
        playBtn.style.display = 'none';
        replayBtn.style.display = 'none';
        
        // Reset state
        options.forEach(option => option.classList.remove('correct'));
        botAssistant.classList.remove('active');
        confidenceFill.style.width = '0%';
        
        // Step 1: Show bot thinking
        await this.delay(500);
        botAssistant.classList.add('active');
        responseText.textContent = 'Analyzing question...';
        confidenceText.textContent = 'Calculating...';
        
        // Step 2: Simulate thinking process
        await this.delay(2000);
        responseText.textContent = 'Processing calculus rules...';
        
        // Step 3: Show confidence building
        await this.delay(1500);
        responseText.textContent = 'Applying derivative formulas...';
        confidenceFill.style.width = '45%';
        confidenceText.textContent = '45%';
        
        // Step 4: Higher confidence
        await this.delay(1000);
        responseText.textContent = 'Verifying calculation...';
        confidenceFill.style.width = '78%';
        confidenceText.textContent = '78%';
        
        // Step 5: Final answer
        await this.delay(1000);
        responseText.textContent = '✅ Found the correct answer! The derivative of f(x) = x² + 3x - 5 is f\'(x) = 2x + 3';
        confidenceFill.style.width = '95%';
        confidenceText.textContent = '95% High';
        
        // Step 6: Highlight correct answer
        await this.delay(800);
        const correctOption = document.querySelector('[data-option="b"]');
        if (correctOption) {
            correctOption.classList.add('correct');
            const radio = correctOption.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        }
        
        // Step 7: Show replay button
        await this.delay(2000);
        replayBtn.style.display = 'inline-flex';
        this.isPlaying = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Additional animations for existing code
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Initialize bot showcase
    new BotShowcase();
    
    // Intersection Observer for showcase animations
    const showcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe showcase elements
    const showcaseElements = document.querySelectorAll('.feature-highlight, .animated-demo');
    showcaseElements.forEach(el => {
        showcaseObserver.observe(el);
    });
    
    // Auto-play demo when section comes into view
    const showcaseSection = document.querySelector('.bot-showcase');
    if (showcaseSection) {
        const autoPlayObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !sessionStorage.getItem('demoPlayed')) {
                    setTimeout(() => {
                        const playBtn = document.getElementById('play-demo');
                        if (playBtn && playBtn.style.display !== 'none') {
                            playBtn.click();
                            sessionStorage.setItem('demoPlayed', 'true');
                        }
                    }, 1000);
                }
            });
        }, {
            threshold: 0.5
        });
        
        autoPlayObserver.observe(showcaseSection);
    }
    
    // ...rest of existing code...
});
