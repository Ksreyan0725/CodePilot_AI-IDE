function launchApp() {
    alert('🚀 Launching CodePilot_AI...\n\nRedirecting to your web IDE...');
    // Replace with your actual IDE URL
    window.location.href = 'Login/login.html';
}

function signUp() {
    alert('📝 Opening sign up page...');
    // Replace with your actual sign up URL
    window.location.href = 'Signup/signup.html';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
