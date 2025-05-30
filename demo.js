// Live Demo JavaScript Functions
// Handles all interactive demonstrations

// Demo State Management
let demoState = {
    currentTheme: 'light',
    flashcardFlipped: false,
    compactMode: false,
    currentQuestion: 3,
    totalQuestions: 15
};

// Simulation Functions
function simulateExtraction() {
    const extractBtn = document.querySelector('.action-btn.extract');
    const originalText = extractBtn.innerHTML;
    
    // Show loading state
    extractBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Extracting...</span>';
    extractBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate extraction complete
        extractBtn.innerHTML = '<i class="fas fa-check"></i> <span>15 Questions Found</span>';
        extractBtn.style.background = '#4CAF50';
        
        // Update question info
        updateQuestionProgress();
        
        // Show notification
        showDemoNotification('Quiz extracted successfully! Found 15 questions.', 'success');
        
        setTimeout(() => {
            extractBtn.innerHTML = originalText;
            extractBtn.disabled = false;
            extractBtn.style.background = '';
        }, 3000);
    }, 2000);
}

function simulateAnswering() {
    const answerBtn = document.querySelector('.action-btn.answer');
    const originalText = answerBtn.innerHTML;
    
    // Show processing state
    answerBtn.innerHTML = '<i class="fas fa-robot fa-pulse"></i> <span>AI Processing...</span>';
    answerBtn.disabled = true;
    
    // Simulate AI analysis
    setTimeout(() => {
        // Highlight correct answer
        const correctOption = document.getElementById('correct-option');
        correctOption.classList.add('ai-selected');
        
        // Update confidence badge
        const confidenceBadge = document.getElementById('confidence-badge');
        confidenceBadge.innerHTML = '<i class="fas fa-check-circle"></i> <span>High Confidence (94%)</span>';
        confidenceBadge.classList.add('animated');
        
        // Show AI assistant
        const aiAssistant = document.getElementById('ai-assistant');
        aiAssistant.classList.add('active');
        aiAssistant.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        answerBtn.innerHTML = '<i class="fas fa-check"></i> <span>Answer Suggested</span>';
        answerBtn.style.background = '#4CAF50';
        
        showDemoNotification('AI has analyzed the question and suggested the correct answer!', 'success');
        
        setTimeout(() => {
            answerBtn.innerHTML = originalText;
            answerBtn.disabled = false;
            answerBtn.style.background = '';
        }, 3000);
    }, 1500);
}

function nextQuestion() {
    if (demoState.currentQuestion < demoState.totalQuestions) {
        demoState.currentQuestion++;
        updateQuestionProgress();
        
        // Reset the demo
        resetQuestionDemo();
        
        showDemoNotification(`Moved to question ${demoState.currentQuestion}`, 'info');
    }
}

function updateQuestionProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const questionCount = document.querySelector('.question-count');
    
    const percentage = (demoState.currentQuestion / demoState.totalQuestions) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}% Complete`;
    questionCount.textContent = `Question ${demoState.currentQuestion} of ${demoState.totalQuestions}`;
}

function resetQuestionDemo() {
    // Reset correct option highlighting
    const correctOption = document.getElementById('correct-option');
    correctOption.classList.remove('ai-selected');
    
    // Reset AI assistant
    const aiAssistant = document.getElementById('ai-assistant');
    aiAssistant.classList.remove('active');
    
    // Reset confidence badge
    const confidenceBadge = document.getElementById('confidence-badge');
    confidenceBadge.classList.remove('animated');
}

// Study Feature Functions
function addToFlashcards() {
    showDemoNotification('Question added to your flashcard deck!', 'success');
    
    // Update flashcard count in popup
    const flashcardBtn = document.querySelector('.feature-btn');
    const countMatch = flashcardBtn.innerHTML.match(/\((\d+)\)/);
    if (countMatch) {
        const newCount = parseInt(countMatch[1]) + 1;
        flashcardBtn.innerHTML = flashcardBtn.innerHTML.replace(/\(\d+\)/, `(${newCount})`);
    }
}

function getExplanation() {
    showDemoNotification('Detailed explanation loaded in study mode!', 'info');
}

function viewSimilar() {
    showDemoNotification('Found 23 similar questions in the database!', 'info');
}

// Flashcard Functions
function flipFlashcard() {
    const flashcard = document.getElementById('demo-flashcard');
    const front = flashcard.querySelector('.flashcard-front');
    const back = flashcard.querySelector('.flashcard-back');
    
    if (demoState.flashcardFlipped) {
        front.classList.add('active');
        back.classList.remove('active');
        demoState.flashcardFlipped = false;
    } else {
        front.classList.remove('active');
        back.classList.add('active');
        demoState.flashcardFlipped = true;
    }
}

function markEasy() {
    showDemoNotification('Card marked as easy! Next review in 4 days.', 'success');
    nextFlashcard();
}

function markMedium() {
    showDemoNotification('Card marked as medium! Next review in 1 day.', 'info');
    nextFlashcard();
}

function markHard() {
    showDemoNotification('Card marked as hard! Review again in 10 minutes.', 'warning');
    nextFlashcard();
}

function nextFlashcard() {
    setTimeout(() => {
        // Reset flashcard to front
        const flashcard = document.getElementById('demo-flashcard');
        const front = flashcard.querySelector('.flashcard-front');
        const back = flashcard.querySelector('.flashcard-back');
        
        front.classList.add('active');
        back.classList.remove('active');
        demoState.flashcardFlipped = false;
        
        // Update stats
        const dueCards = document.querySelector('.flashcard-stats .stat-number');
        const currentDue = parseInt(dueCards.textContent);
        if (currentDue > 0) {
            dueCards.textContent = currentDue - 1;
        }
    }, 1000);
}

// Theme Functions
function switchTheme(theme) {
    demoState.currentTheme = theme;
    
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    // Update theme preview
    const preview = document.getElementById('theme-preview');
    preview.className = `theme-preview-large ${theme}`;
    
    showDemoNotification(`Switched to ${theme} theme!`, 'success');
}

// Extension Popup Functions
function toggleCompactMode() {
    const popup = document.getElementById('extension-popup');
    demoState.compactMode = !demoState.compactMode;
    
    if (demoState.compactMode) {
        popup.classList.add('compact');
        showDemoNotification('Switched to compact mode', 'info');
    } else {
        popup.classList.remove('compact');
        showDemoNotification('Switched to expanded mode', 'info');
    }
}

function openFlashcards() {
    const flashcardsDemo = document.getElementById('flashcards-demo');
    flashcardsDemo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    flashcardsDemo.classList.add('highlight');
    
    setTimeout(() => {
        flashcardsDemo.classList.remove('highlight');
    }, 2000);
    
    showDemoNotification('Opening flashcards study mode...', 'info');
}

function openProgress() {
    const progressDemo = document.getElementById('progress-demo');
    progressDemo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    progressDemo.classList.add('highlight');
    
    setTimeout(() => {
        progressDemo.classList.remove('highlight');
    }, 2000);
    
    showDemoNotification('Opening progress analytics...', 'info');
}

function openThemes() {
    const themesDemo = document.getElementById('themes-demo');
    themesDemo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    themesDemo.classList.add('highlight');
    
    setTimeout(() => {
        themesDemo.classList.remove('highlight');
    }, 2000);
    
    showDemoNotification('Opening theme customization...', 'info');
}

// Notification System
function showDemoNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `demo-notification ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Progress Chart
function createProgressChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample data for the last 7 days
    const data = [78, 82, 85, 89, 91, 94, 96];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw line chart
    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const stepX = width / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
        const x = i * stepX;
        const y = height - (data[i] / 100) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw points
        ctx.save();
        ctx.fillStyle = '#1a73e8';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    
    ctx.stroke();
    
    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(26, 115, 232, 0.3)');
    gradient.addColorStop(1, 'rgba(26, 115, 232, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let i = 0; i < data.length; i++) {
        const x = i * stepX;
        const y = height - (data[i] / 100) * height;
        if (i === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
}

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    // Create progress chart
    createProgressChart();
    
    // Initialize AI assistant as hidden
    const aiAssistant = document.getElementById('ai-assistant');
    if (aiAssistant) {
        aiAssistant.style.display = 'none';
    }
    
    // Add smooth scrolling
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
    
    // Auto-demo sequence (optional)
    setTimeout(() => {
        showDemoNotification('Welcome to the MoodleGPT Pro live demo! Try the interactive features.', 'info');
    }, 1000);
});

// CSS for demo notifications
const demoNotificationStyles = `
    <style>
    .demo-notification {
        position: fixed;
        top: 90px;
        right: 24px;
        background: white;
        border-radius: 8px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
        border-left: 4px solid #1a73e8;
    }
    
    .demo-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .demo-notification.success {
        border-left-color: #4CAF50;
    }
    
    .demo-notification.success i {
        color: #4CAF50;
    }
    
    .demo-notification.error {
        border-left-color: #f44336;
    }
    
    .demo-notification.error i {
        color: #f44336;
    }
    
    .demo-notification.warning {
        border-left-color: #ff9800;
    }
    
    .demo-notification.warning i {
        color: #ff9800;
    }
    
    .demo-notification.info {
        border-left-color: #2196F3;
    }
    
    .demo-notification.info i {
        color: #2196F3;
    }
    
    .demo-notification i {
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .demo-notification span {
        color: #333;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.4;
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', demoNotificationStyles);
