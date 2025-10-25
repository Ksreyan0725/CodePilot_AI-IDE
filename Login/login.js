document.addEventListener('DOMContentLoaded', function() {
    // Load prompts from chat-message.md into the background, then animate
    loadChatBackgroundFromMarkdown().then(() => {
        initChatAnimation();
    }).catch(() => {
        // Animate any existing nodes if loading fails
        initChatAnimation();
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // TODO: Implement actual login logic here
            console.log('Login attempted with:', { email, remember });
            alert('Login functionality will be implemented here.');
        });
    }

    async function loadChatBackgroundFromMarkdown() {
        const container = document.querySelector('.chat-background');
        if (!container) return;

        try {
            const res = await fetch('../chat-message.md', { 
                cache: 'no-store',
                headers: {
                    'Accept': 'text/plain'
                }
            });
            if (!res.ok) {
                console.warn(`Failed to fetch chat-message.md: ${res.status} ${res.statusText}`);
                throw new Error('Failed to fetch chat-message.md');
            }
            const md = await res.text();

            // Parse numbered prompts from markdown
            const items = [];
            let current = null;
            md.split(/\r?\n/).forEach(line => {
                const m = line.match(/^(\d+)\.\s+(.+)/);
                if (m) {
                    if (current) items.push(current);
                    current = { title: m[2].trim(), lines: [] };
                } else if (current) {
                    if (line.trim().length) {
                        current.lines.push(line.trim());
                    }
                }
            });
            if (current) items.push(current);

            // Populate UI
            container.innerHTML = '';
            items.forEach((it, idx) => {
                const msg = document.createElement('div');
                msg.className = 'chat-message ' + (idx % 2 === 0 ? 'user-message' : 'ai-message');

                const content = document.createElement('div');
                content.className = 'message-content';

                const title = document.createElement('strong');
                title.textContent = it.title;
                content.appendChild(title);

                if (it.lines.length) {
                    const desc = document.createElement('div');
                    desc.style.marginTop = '6px';
                    desc.innerHTML = it.lines.map(l => l).join('<br>');
                    content.appendChild(desc);
                }

                msg.appendChild(content);
                container.appendChild(msg);
            });
        } catch (err) {
            console.warn('Failed to load chat-message.md:', err);
            // Fallback: create default prompt bubbles if markdown file is missing
            createFallbackBubbles(container);
        }
    }

    function createFallbackBubbles(container) {
        const fallbackPrompts = [
            { title: 'Responsive Layout Fix Prompt', desc: 'Check that the entire webpage layout adapts correctly across all screen sizes.' },
            { title: 'Modernize Website UI Prompt', desc: 'Redesign the webpage with a cleaner, minimal, and modern UI.' },
            { title: 'Navigation Bar Optimization Prompt', desc: 'Improve the navigation bar responsiveness for all devices.' },
            { title: 'Hero Section Enhancement Prompt', desc: 'Redesign the hero section with a bold heading, short tagline, and clear CTA button.' },
            { title: 'Form Validation Prompt', desc: 'Add real-time validation for all form fields using JavaScript.' }
        ];

        container.innerHTML = '';
        fallbackPrompts.forEach((p, idx) => {
            const msg = document.createElement('div');
            msg.className = 'chat-message ' + (idx % 2 === 0 ? 'user-message' : 'ai-message');

            const content = document.createElement('div');
            content.className = 'message-content';

            const title = document.createElement('strong');
            title.textContent = p.title;
            content.appendChild(title);

            const desc = document.createElement('div');
            desc.style.marginTop = '6px';
            desc.textContent = p.desc;
            content.appendChild(desc);

            msg.appendChild(content);
            container.appendChild(msg);
        });
    }

    function initChatAnimation() {
        const messages = document.querySelectorAll('.chat-message');
        const bg = document.querySelector('.chat-background');
        if (!bg || messages.length === 0) return;

        // Create vertical lanes to reduce overlap
        const lanes = Math.max(6, Math.min(12, Math.floor(window.innerHeight / 80))); // adaptive number of lanes
        const laneHeight = window.innerHeight / lanes;

        function placeInLane(el, laneIdx) {
            const top = Math.max(8, laneIdx * laneHeight + 8);
            el.style.top = `${top}px`;
            el.style.left = '0px';
            // Staggered start and varied speeds
            const delay = 300 + Math.random() * 1500; // 0.3-1.8s for quicker start
            const duration = 14 + Math.random() * 10; // 14s - 24s
            el.style.animationDelay = `${delay}ms`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationName = 'floatMessageX';
        }

        messages.forEach((message, index) => {
            const laneIdx = index % lanes;
            placeInLane(message, laneIdx);

            // Clone messages for continuous animation, assign random lane and timings
            const intervalMs = 8000 + Math.random() * 6000; // 8-14s
            setInterval(() => {
                const clone = message.cloneNode(true);
                const randomLane = Math.floor(Math.random() * lanes);
                placeInLane(clone, randomLane);
                // Restart animation cleanly
                clone.style.animation = 'none';
                bg.appendChild(clone);
                // force reflow then restore
                void clone.offsetWidth;
                clone.style.animation = '';
                // Remove after one pass plus buffer
                const removeAfter = (parseFloat(clone.style.animationDuration) * 1000) + 2000;
                setTimeout(() => clone.remove(), removeAfter);
            }, intervalMs);
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


  // Page fade-in on load
        window.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('page-loaded');
            // Clicking the logo reloads the page (with fade)
            var logo = document.querySelector('.logo-container');
            if (logo) {
                logo.addEventListener('click', function (e) {
                    e.preventDefault();
                    navigateWithTransition(window.location.href);
                });
            }
        });

        // Smooth navigate with fade-out
        function navigateWithTransition(url) {
            document.body.classList.remove('page-loaded');
            setTimeout(function() { window.location.href = url; }, 300);
        }
        // Typing animation for brand name
        const text = 'CodePilot_AI IDE';
        const typingElement = document.getElementById('typingText');
        let index = 0;

        function typeText() {
            if (index < text.length) {
                const char = text.charAt(index);
                
                // Build "_AI" as a complete highlighted section
                if (index === 9) {
                    // Add the entire "_AI" span at once when we reach index 9
                    typingElement.innerHTML += '<span class="highlight">_AI</span>';
                    index = 12; // Skip to after "I" (index 11 + 1)
                } else if (index < 9 || index >= 12) {
                    // Add regular characters
                    typingElement.innerHTML += char;
                    index++;
                } else {
                    // Skip indices 10 and 11 since we already added them
                    index++;
                }
                
                setTimeout(typeText, 100);
            }
        }

        typeText();