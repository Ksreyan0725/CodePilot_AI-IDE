const questions = [
    "Hi there! Welcome to CodePilot_AI IDE. I'm here to help you create your account. What's your full name?",
    "Nice to meet you, {name}! What should I call you? (Your preferred name or nickname)",
    "Great! What's your email address?",
    "Perfect! Now, please create a secure password.",
    "Awesome! All set. Creating your account..."
];

let currentQuestion = 0;
let userData = {};
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatSignInOption = document.getElementById('chatSignInOption');
let isChatMode = true;
let revealInitialized = false;
let hasStartedSignup = false; // Track if user has started the signup process
let passwordStrengthIndicator = null; // Track password strength indicator element

// Escape HTML to prevent pasted rich content from injecting styles/markup
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    // Check password length with better scoring
    if (password.length >= 8) {
        strength++;
    } else {
        feedback.push('at least 8 characters');
    }
    
    if (password.length >= 12) {
        strength++;
    }
    
    if (password.length >= 16) {
        strength++;
    }
    
    // Check for lowercase and uppercase with better scoring
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    if (hasLower) strength += 0.5;
    if (hasUpper) strength += 0.5;
    if (!hasLower) feedback.push('lowercase letters');
    if (!hasUpper) feedback.push('uppercase letters');
    
    // Check for numbers with better scoring
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount > 0) {
        strength += Math.min(numberCount * 0.25, 1); // Up to 1 point for multiple numbers
    } else {
        feedback.push('numbers');
    }
    
    // Check for special characters with better scoring
    const specialCount = (password.match(/[^a-zA-Z\d]/g) || []).length;
    if (specialCount > 0) {
        strength += Math.min(specialCount * 0.25, 1); // Up to 1 point for multiple special chars
    } else {
        feedback.push('special characters');
    }
    
    // Check for common patterns and sequences
    if (/123|abc|qwerty|password|admin/i.test(password)) {
        strength -= 1;
        feedback.push('avoid common patterns');
    }
    
    return { strength, feedback };
}

// Get password strength label and color
function getPasswordStrengthInfo(strength) {
    if (strength <= 2) {
        return {
            level: 'Weak',
            color: '#f44336',
            percentage: 33,
            message: 'Your password is weak. Consider adding more complexity.'
        };
    } else if (strength <= 3) {
        return {
            level: 'Medium',
            color: '#ff9800',
            percentage: 66,
            message: 'Your password is decent but could be stronger.'
        };
    } else {
        return {
            level: 'Strong',
            color: '#4caf50',
            percentage: 100,
            message: 'Excellent! Your password is strong and secure.'
        };
    }
}

// Add or update password strength indicator in chat
function addPasswordStrengthIndicator(password) {
    const { strength, feedback } = calculatePasswordStrength(password);
    const info = getPasswordStrengthInfo(strength);
    
    // Remove existing indicator if present
    if (passwordStrengthIndicator) {
        passwordStrengthIndicator.remove();
    }
    
    if (password.length === 0) {
        return;
    }
    
    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'chat-password-strength-indicator';
    indicator.innerHTML = `
        <div class="chat-password-message">
            <span class="strength-label">Password strength: <strong>${info.level}</strong></span>
        </div>
        <div class="chat-password-bar-container">
            <div class="chat-password-bar" style="width: ${info.percentage}%; background-color: ${info.color};"></div>
        </div>
        <p class="chat-password-feedback">${info.message}</p>
    `;
    
    chatMessages.appendChild(indicator);
    passwordStrengthIndicator = indicator;
    
    // Scroll to show the indicator
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });
}

// Check localStorage for saved mode preference
function updateModeToggleLabel() {
    const modeText = document.getElementById('modeText');
    const modeIcon = document.getElementById('modeIcon');
    if (!modeText || !modeIcon) return;
    
    const isMobile = window.innerWidth <= 768;
    
    // Button label indicates the destination mode (what clicking will switch to)
    if (isMobile) {
        // Use images on mobile
        modeText.style.display = 'none';
        modeIcon.style.display = 'block';
        modeIcon.style.width = '20px';
        modeIcon.style.height = '20px';
        
        if (isChatMode) {
            // Currently in chat, show form icon
            modeIcon.src = '../assets/Images.icons/form.png';
            modeIcon.alt = 'Quick Mode';
        } else {
            // Currently in form, show chat icon
            modeIcon.src = '../assets/Images.icons/chat.png';
            modeIcon.alt = 'Chat Mode';
        }
    } else {
        // Use text on desktop
        modeIcon.style.display = 'none';
        modeText.style.display = 'inline';
        modeText.textContent = isChatMode ? 'Quick Mode' : 'Chat Mode';
    }
}

function initializeMode() {
    const savedMode = localStorage.getItem('signupMode');
    if (savedMode === 'form') {
        isChatMode = true; // Start as true so toggleMode switches it to false
        toggleMode();
    }
    updateModeToggleLabel();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMode();
    // Keep label responsive to screen resizes
    window.addEventListener('resize', updateModeToggleLabel);
    if (userInput) {
        userInput.focus();
        
        // Add input validation for email in chat mode
        userInput.addEventListener('input', function(e) {
            if (currentQuestion === 2) { // Email question
                const email = e.target.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                e.target.setCustomValidity(emailRegex.test(email) ? '' : 'Please enter a valid email address');
            }
        });
    }
    initRevealOnScroll();
    
    // Add initial message with typing animation when page loads in chat mode
    if (isChatMode) {
        setTimeout(() => {
            addInitialMessage();
        }, 500); // Small delay for better UX
    }

    // Cleanup on page unload
    window.addEventListener('unload', function() {
        // Clear any timers or intervals
        if (window.typingTimer) clearTimeout(window.typingTimer);
        
        // Remove event listeners
        if (userInput) {
            userInput.removeEventListener('input', null);
        }
    });
});

// Function to add the initial welcome message with typing animation
function addInitialMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const welcomeText = questions[0];
    messageDiv.innerHTML = `
        <div class="message-avatar">CodePilot_AI</div>
        <div class="message-content typing">
            <p></p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Type out the message character by character with variable speed
    const paragraph = messageDiv.querySelector('p');
    let charIndex = 0;
    
    const getTypingSpeed = (char, nextChar) => {
        // Base speed with natural variation - faster
        let speed = 10 + Math.random() * 15; // 10-25ms variation
        
        // Slower after punctuation (more realistic pauses)
        if (char === '.' || char === '!' || char === '?') {
            speed += 50 + Math.random() * 50; // 50-100ms pause
        } else if (char === ',' || char === ';') {
            speed += 20 + Math.random() * 20; // 20-40ms pause
        } else if (char === ' ') {
            speed += 3 + Math.random() * 7; // 3-10ms for spaces
        }
        
        return speed;
    };
    
    const typeCharacter = () => {
        if (charIndex < welcomeText.length) {
            const char = welcomeText.charAt(charIndex);
            paragraph.textContent += char;
            charIndex++;
            
            // Scroll to show the message as it types
            requestAnimationFrame(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            
            const nextChar = welcomeText.charAt(charIndex);
            const speed = getTypingSpeed(char, nextChar);
            setTimeout(typeCharacter, speed);
        } else {
            // Animation complete - remove typing class
            const messageContent = messageDiv.querySelector('.message-content');
            if (messageContent) {
                messageContent.classList.remove('typing');
                messageContent.classList.add('typing-complete');
            }
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 300);
    
    // Scroll to show the message
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });
}

function toggleMode() {
    isChatMode = !isChatMode;
    const chatMode = document.getElementById('chatMode');
    const formMode = document.getElementById('formMode');
    const modeText = document.getElementById('modeText');

    if (isChatMode) {
        chatMode.style.display = 'block';
        formMode.style.display = 'none';
        localStorage.setItem('signupMode', 'chat');
        
        // If chat is empty, add the initial message
        if (chatMessages.children.length === 0) {
            setTimeout(() => {
                addInitialMessage();
            }, 300);
        }
    } else {
        chatMode.style.display = 'none';
        formMode.style.display = 'block';
        localStorage.setItem('signupMode', 'form');
    }
    // Update the toggle label based on current mode and viewport
    updateModeToggleLabel();
    
    // Restart typing animation when switching modes
    if (typeof startTypingAnimation === 'function') {
        startTypingAnimation();
    }
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : ''}`;
    
    const safeText = escapeHTML(text);
    // Apply typing animation only to AI/system messages, not user messages
    const contentClass = isUser ? 'message-content' : 'message-content typing';
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? 'User' : 'CodePilot_AI'}</div>
        <div class="${contentClass}">
            <p>${isUser ? safeText : ''}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Apply typing effect only to AI messages with natural variation
    if (!isUser) {
        const paragraph = messageDiv.querySelector('p');
        let charIndex = 0;
        
        const getTypingSpeed = (char, nextChar) => {
            // Base speed with natural variation - faster
            let speed = 10 + Math.random() * 15; // 10-25ms variation
            
            // Slower after punctuation (more realistic pauses)
            if (char === '.' || char === '!' || char === '?') {
                speed += 50 + Math.random() * 50; // 50-100ms pause
            } else if (char === ',' || char === ';') {
                speed += 20 + Math.random() * 20; // 20-40ms pause
            } else if (char === ' ') {
                speed += 3 + Math.random() * 7; // 3-10ms for spaces
            }
            
            return speed;
        };
        
        const typeCharacter = () => {
            if (charIndex < text.length) {
                const char = text.charAt(charIndex);
                // Use textContent to add plain text (already escaped)
                paragraph.textContent += char;
                charIndex++;
                
                // Scroll to show the message as it types
                requestAnimationFrame(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                });
                
                const nextChar = text.charAt(charIndex);
                const speed = getTypingSpeed(char, nextChar);
                setTimeout(typeCharacter, speed);
            } else {
                // Animation complete - remove typing class
                const messageContent = messageDiv.querySelector('.message-content');
                if (messageContent) {
                    messageContent.classList.remove('typing');
                    messageContent.classList.add('typing-complete');
                }
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeCharacter, 100);
    }
    
    // Force immediate scroll to bottom after adding message
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });

    // After a few messages, start hiding the earliest ones to keep focus
    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length > 5) {
        // Hide the first two visible messages smoothly
        for (let i = 0; i < messages.length - 4; i++) {
            const m = messages[i];
            if (!m.classList.contains('hide-up')) {
                m.classList.add('hide-up');
            }
        }
    }

    // Try revealing any hidden messages currently in view
    checkReveal();
}

// Function to check if text contains dark mode related words
function containsDarkModeRequest(text) {
    const darkModeKeywords = ['dark', 'dark mode', 'darker', 'night', 'night mode', 'black theme'];
    return darkModeKeywords.some(keyword => text.toLowerCase().includes(keyword));
}

// Function to handle dark mode toggle
function handleDarkMode() {
    document.body.style.background = '#0a0a0a';
    document.querySelectorAll('.form-box, .message-content, .input-container').forEach(el => {
        el.style.background = '#1a1a1a';
    });
    document.querySelectorAll('input').forEach(input => {
        input.style.background = '#0a0a0a';
        input.style.borderColor = '#2a2a2a';
    });
    addMessage("I've switched to dark mode for better visibility. Let's continue with your signup. What would you like to tell me?");
}

function processAnswer(answer) {
    addMessage(answer, true);
    
    // Remove password strength indicator when submitting answer
    if (passwordStrengthIndicator) {
        passwordStrengthIndicator.remove();
        passwordStrengthIndicator = null;
    }
    
    // Hide Sign In option when user starts signup process
    if (!hasStartedSignup && chatSignInOption) {
        hasStartedSignup = true;
        chatSignInOption.classList.add('hidden');
    }
    
    // Check for dark mode request first
    if (containsDarkModeRequest(answer)) {
        handleDarkMode();
        return;
    }
    
    // Check if we're at the email step
    if (currentQuestion === 2) {
        // Simulate checking if email exists
        const existingEmails = ['test@gmail.com', 'demo@gmail.com', 'sample@gmail.com'];
        
        if (existingEmails.includes(answer.toLowerCase())) {
            setTimeout(() => {
                addMessage("It looks like this email is already registered with us. Would you like to sign in instead?");
                setTimeout(() => {
                    addMessage("Redirecting you to the sign-in page...");
                    setTimeout(() => {
                        alert('Redirecting to Sign In page...');
                    }, 1500);
                }, 1500);
            }, 1000);
            return;
        }
    }

    currentQuestion++;

    if (currentQuestion === 1) {
        userData.fullName = answer;
    } else if (currentQuestion === 2) {
        userData.preferredName = answer;
    } else if (currentQuestion === 3) {
        userData.email = answer;
    } else if (currentQuestion === 4) {
        userData.password = answer;
    }

    if (currentQuestion < questions.length) {
        setTimeout(() => {
            let nextQuestion = questions[currentQuestion];
            if (currentQuestion === 1) {
                nextQuestion = nextQuestion.replace('{name}', userData.fullName);
            }
            addMessage(nextQuestion);
            
            if (currentQuestion === questions.length - 1) {
                setTimeout(() => {
                    addMessage("Success! Your account has been created successfully. Welcome to CodePilot_AI IDE!");
                    setTimeout(() => {
                        addMessage("Redirecting you to the dashboard...");
                        // Hide input smoothly once flow is complete
                        const inputArea = document.querySelector('.input-container');
                        if (inputArea) inputArea.classList.add('hidden');
                    }, 1500);
                }, 2000);
            }
        }, 1000);
    }

    userInput.value = '';
}

// Auto-capitalize first letter of each word for name inputs
userInput.addEventListener('input', (e) => {
    // Only capitalize for name questions (first two questions)
    if (currentQuestion === 0 || currentQuestion === 1) {
        let value = e.target.value;
        // Capitalize first letter of each word
        value = value.replace(/\b\w/g, char => char.toUpperCase());
        e.target.value = value;
    }
    
    // Password strength detection for question 3 (password question)
    if (currentQuestion === 3 && isChatMode) {
        const password = e.target.value.trim();
        addPasswordStrengthIndicator(password);
    }
});

sendBtn.addEventListener('click', () => {
    const answer = userInput.value.trim();
    if (answer && currentQuestion < questions.length) {
        processAnswer(answer);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const answer = userInput.value.trim();
        if (answer && currentQuestion < questions.length) {
            processAnswer(answer);
        }
    }
});

function signUpWithGoogle() {
    alert('Google Sign-Up would be initiated here');
}

function signUpWithGitHub() {
    alert('GitHub Sign-Up would be initiated here');
}

function signUpWithMicrosoft() {
    alert('Microsoft Sign-Up would be initiated here');
}

function signUpWithZoho() {
    alert('Zoho Mail Sign-Up would be initiated here');
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert('Account created successfully! Redirecting to dashboard...');
}

// Reveal hidden (older) messages when scrolled into view
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    // Consider element in view if at least its top is within viewport with a small margin
    return (
        rect.bottom >= 0 &&
        rect.top <= vh &&
        rect.right >= 0 &&
        rect.left <= vw
    );
}

function checkReveal() {
    if (!chatMessages) return;
    const hiddenMessages = chatMessages.querySelectorAll('.message.hide-up');
    hiddenMessages.forEach(m => {
        if (isInViewport(m)) {
            m.classList.remove('hide-up');
        }
    });
}

function initRevealOnScroll() {
    if (revealInitialized) return;
    revealInitialized = true;
    // Reveal on window scroll (page scroll)
    window.addEventListener('scroll', checkReveal, { passive: true });
    // Reveal on chat container scroll (mobile small screens)
    if (chatMessages) {
        chatMessages.addEventListener('scroll', checkReveal, { passive: true });
    }
    // Initial check
    checkReveal();
}

// Password strength checker for form mode
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('passwordStrengthBar');
const strengthText = document.getElementById('passwordStrengthText');
const strengthContainer = document.getElementById('passwordStrength');

if (passwordInput && strengthBar && strengthText && strengthContainer) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
            strengthContainer.classList.remove('show');
            strengthText.classList.remove('show');
            return;
        }

        strengthContainer.classList.add('show');
        strengthText.classList.add('show');

        let strength = 0;
        
        // Check password length
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Check for lowercase and uppercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Check for numbers
        if (/\d/.test(password)) strength++;
        
        // Check for special characters
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        // Remove all strength classes
        strengthBar.className = 'password-strength-bar';
        strengthText.className = 'password-strength-text show';

        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.classList.add('weak');
            strengthText.textContent = 'Weak - Add more characters, numbers, or symbols';
        } else if (strength <= 3) {
            strengthBar.classList.add('medium');
            strengthText.classList.add('medium');
            strengthText.textContent = 'Medium - Add uppercase, numbers, or special characters';
        } else {
            strengthBar.classList.add('strong');
            strengthText.classList.add('strong');
            strengthText.textContent = 'Strong - Great password!';
        }
    });
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeOffIcon = document.querySelector('.eye-off-icon');

    if (passwordInput && eyeIcon && eyeOffIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            eyeIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
        }
    }
}
