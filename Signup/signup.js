const questions = [
    "Hi there! Welcome to CodePilot_AI IDE. I'm here to help you create your account. What's your full name?",
    "Nice to meet you, {name}! What should I call you? (Your preferred name or nickname)",
    "Great! What's your Gmail address?",
    "Perfect! Now, please create a secure password.",
    "Awesome! All set. Creating your account..."
];

let currentQuestion = 0;
let userData = {};
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
let isChatMode = true;

// Check localStorage for saved mode preference
function initializeMode() {
    const savedMode = localStorage.getItem('signupMode');
    if (savedMode === 'form') {
        isChatMode = true; // Start as true so toggleMode switches it to false
        toggleMode();
    }
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMode();
    if (userInput) {
        userInput.focus();
    }
});

function toggleMode() {
    isChatMode = !isChatMode;
    const chatMode = document.getElementById('chatMode');
    const formMode = document.getElementById('formMode');
    const modeText = document.getElementById('modeText');

    if (isChatMode) {
        chatMode.style.display = 'block';
        formMode.style.display = 'none';
        modeText.textContent = 'Use Quick Form';
        localStorage.setItem('signupMode', 'chat');
    } else {
        chatMode.style.display = 'none';
        formMode.style.display = 'block';
        modeText.textContent = 'Use Chat Mode';
        localStorage.setItem('signupMode', 'form');
    }
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : ''}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? 'User' : 'CodePilot_AI'}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
                    addMessage("🎉 Success! Your account has been created successfully. Welcome to CodePilot_AI IDE!");
                    setTimeout(() => {
                        addMessage("Redirecting you to the dashboard...");
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

// Password strength checker
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('passwordStrengthBar');
const strengthText = document.getElementById('passwordStrengthText');
const strengthContainer = document.getElementById('passwordStrength');

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

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeOffIcon = document.querySelector('.eye-off-icon');

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
