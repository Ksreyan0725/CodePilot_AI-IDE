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
    
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const agreeTerms = document.getElementById('agree-terms').checked;
    
    if (!agreeTerms) {
        alert('Please agree to the Terms & Privacy Policy');
        return;
    }
    
    console.log('Signup attempt:', { firstname, lastname, email, password: '***' });
    
    alert('Account creation functionality would be implemented here!\n\nName: ' + firstname + ' ' + lastname + '\nEmail: ' + email);
});

function showSignup() {
    const loginCard = document.getElementById('loginCard');
    const signupCard = document.getElementById('signupCard');
    
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        loginCard.classList.add('hidden');
        signupCard.classList.remove('hidden');
        
        signupCard.style.opacity = '0';
        signupCard.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            signupCard.style.opacity = '1';
            signupCard.style.transform = 'translateX(0)';
        }, 10);
    }, 300);
}

function showLogin() {
    const loginCard = document.getElementById('loginCard');
    const signupCard = document.getElementById('signupCard');
    
    signupCard.style.opacity = '0';
    signupCard.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        signupCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
        
        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            loginCard.style.opacity = '1';
            loginCard.style.transform = 'translateX(0)';
        }, 10);
    }, 300);
}

function signupWithGoogle() {
    alert('Google OAuth integration would redirect to Google sign-in here!');
}

function signupWithGitHub() {
    alert('GitHub OAuth integration would redirect to GitHub sign-in here!');
}