  document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate form
            if (!terms) {
                alert('Please agree to the Terms & Privacy Policy');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', { firstName, lastName, email, password, terms });
            
            // For demo purposes, show success message
            alert('Account created successfully! Redirecting to dashboard...');
            // Redirect to dashboard or show success message
        });