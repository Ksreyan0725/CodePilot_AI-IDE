document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat background animation
    initChatAnimation();

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // TODO: Add proper validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // TODO: Implement actual login logic here
            console.log('Login attempted with:', { email, remember });
            alert('Login functionality will be implemented here.');
        });
    }

    function initChatAnimation() {
        const chatMessages = document.querySelectorAll('.chat-message');
        
        chatMessages.forEach((message, index) => {
            // Set random starting positions
            const startX = Math.random() * window.innerWidth;
            const delay = index * (Math.random() * 2000 + 1000);
            
            message.style.left = `${startX}px`;
            message.style.animationDelay = `${delay}ms`;
            
            // Clone messages for continuous animation
            setInterval(() => {
                const clone = message.cloneNode(true);
                const randomX = Math.random() * window.innerWidth;
                clone.style.left = `${randomX}px`;
                
                document.querySelector('.chat-background').appendChild(clone);
                
                // Remove clone after animation
                setTimeout(() => {
                    clone.remove();
                }, 15000);
            }, 15000);
        });
    }

    // Handle OAuth buttons
    const googleButtons = document.querySelectorAll('.social-signin.google');
    const githubButtons = document.querySelectorAll('.social-signin.github');

    googleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // TODO: Implement Google OAuth
            console.log('Google OAuth clicked');
            alert('Google Sign In will be implemented here.');
        });
    });

    githubButtons.forEach(button => {
        button.addEventListener('click', function() {
            // TODO: Implement GitHub OAuth
            console.log('GitHub OAuth clicked');
            alert('GitHub Sign In will be implemented here.');
        });
    });
});

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            console.log('Signup attempt:', { name, email, password: '***' });
            
            alert('Account creation functionality would be implemented here!\n\nName: ' + name + '\nEmail: ' + email);
            closeSignupModal();
        });

        function openSignupModal() {
            document.getElementById('signupModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeSignupModal() {
            document.getElementById('signupModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function signupWithProvider(provider) {
            console.log('Signup with ' + provider);
            alert('Signing up with ' + provider + '!\n\nThis would redirect to ' + provider + ' OAuth flow.');
        }

        // Close modal when clicking outside
        document.getElementById('signupModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeSignupModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSignupModal();
            }
        });

        // Animate features on page load
        document.querySelectorAll('.feature').forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.6s ease';
            
            // Add a small delay for each feature to create a cascade effect
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, 500 + (index * 200)); // Increased delay for smoother animation

            // Add hover animation
            feature.addEventListener('mouseenter', () => {
                feature.style.transform = 'translateY(-5px)';
                feature.querySelector('.feature-icon').style.transform = 'scale(1.1)';
            });

            feature.addEventListener('mouseleave', () => {
                feature.style.transform = 'translateY(0)';
                feature.querySelector('.feature-icon').style.transform = 'scale(1)';
            });
        });
        // Login form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    console.log('Login attempt:', { email, password: '***', remember });
    
    alert('Login functionality would be implemented here!\n\nEmail: ' + email + '\nRemember me: ' + remember);
});
// Signup form submission handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    console.log('Login attempt:', { email, password: '***', remember });
    
    alert('Login functionality would be implemented here!\n\nEmail: ' + email + '\nRemember me: ' + remember);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    console.log('Signup attempt:', { name, email, password: '***' });
    
    alert('Account creation functionality would be implemented here!\n\nName: ' + name + '\nEmail: ' + email);
    closeSignupModal();
});

// Modal control functions
function openSignupModal() {
    document.getElementById('signupModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function signupWithProvider(provider) {
    console.log('Signup with ' + provider);
    alert('Signing up with ' + provider + '!\n\nThis would redirect to ' + provider + ' OAuth flow.');
}

// Close modal when clicking outside
document.getElementById('signupModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSignupModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSignupModal();
    }
});

// Feature animations
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.6s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
});
        // The typing animation is now handled by CSS
        // No JavaScript needed for the typing effect

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            console.log('Login attempt:', { email, password: '***', remember });
            
            alert('Login functionality would be implemented here!\n\nEmail: ' + email + '\nRemember me: ' + remember);
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            console.log('Signup attempt:', { name, email, password: '***' });
            
            alert('Account creation functionality would be implemented here!\n\nName: ' + name + '\nEmail: ' + email);
            closeSignupModal();
        });

        function openSignupModal() {
            document.getElementById('signupModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeSignupModal() {
            document.getElementById('signupModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function signupWithProvider(provider) {
            console.log('Signup with ' + provider);
            alert('Signing up with ' + provider + '!\n\nThis would redirect to ' + provider + ' OAuth flow.');
        }

        // Close modal when clicking outside
        document.getElementById('signupModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeSignupModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSignupModal();
            }
        });

        // Keep existing animations
        document.addEventListener('DOMContentLoaded', function() {
            // Animate features with staggered delay
            document.querySelectorAll('.feature').forEach((feature, index) => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    feature.style.transition = 'all 0.6s ease';
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                }, 200 + (index * 100));
            });

            // Add animation delay to login card
            const loginCard = document.querySelector('.login-card');
            if (loginCard) {
                loginCard.style.animationDelay = '0.3s';
            }
        });