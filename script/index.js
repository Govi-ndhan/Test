let currentCaptcha = '';

        function generateCaptcha() {
            const canvas = document.getElementById('captchaCanvas');
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Generate random captcha text (mix of letters and numbers)
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
            currentCaptcha = '';
            for (let i = 0; i < 6; i++) {
                currentCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            // Set canvas background with gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#f8f9fa');
            gradient.addColorStop(1, '#e9ecef');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add noise lines
            for (let i = 0; i < 8; i++) {
                ctx.strokeStyle = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 0.3)`;
                ctx.lineWidth = Math.random() * 2 + 1;
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
            
            // Add noise dots
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`;
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, 2 * Math.PI);
                ctx.fill();
            }
            
            // Draw captcha text
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const letterSpacing = canvas.width / (currentCaptcha.length + 1);
            
            for (let i = 0; i < currentCaptcha.length; i++) {
                const x = letterSpacing * (i + 1);
                const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
                const rotation = (Math.random() - 0.5) * 0.4;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                
                // Add text shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillText(currentCaptcha[i], 2, 2);
                
                // Add main text with random colors
                const colors = ['#667eea', '#764ba2', '#2c3e50', '#e74c3c', '#27ae60', '#f39c12'];
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillText(currentCaptcha[i], 0, 0);
                
                ctx.restore();
            }
        }

        function validateCaptcha() {
            const userInput = document.getElementById('captcha').value;
            const errorDiv = document.querySelector('.captcha-error');
            
            if (userInput.toLowerCase() !== currentCaptcha.toLowerCase()) {
                if (!errorDiv) {
                    const error = document.createElement('div');
                    error.className = 'captcha-error';
                    error.textContent = 'Invalid CAPTCHA. Please try again.';
                    document.querySelector('.captcha-container').appendChild(error);
                }
                document.querySelector('.captcha-error').style.display = 'block';
                generateCaptcha();
                document.getElementById('captcha').value = '';
                return false;
            } else {
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                }
                return true;
            }
        }

        
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleButton = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleButton.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleButton.textContent = '👁️';
            }
        }

        // Add smooth focus animations
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Generate initial CAPTCHA when page loads
        window.addEventListener('load', function() {
            generateCaptcha();
            
            // Allow clicking on canvas to refresh CAPTCHA
            document.getElementById('captchaCanvas').addEventListener('click', generateCaptcha);
        });
                function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Validate CAPTCHA
            if (!validateCaptcha()) {
                return;
            }
            
            // Here you would typically send the data to your server
            if( email == user && password == psswd){
                console.log('Login attempt:', { email, password, remember });
                alert('Login successful! CAPTCHA verified.');
                location.href = "upload.html"; }
            else if(email != user){
                    alert("Wrong User Alert!");
                }
            else if(password != psswd){
                alert("Wrong Password Alert!");
            }
            else{
                alert("Login error!");
            }
            
            // Reset form and generate new CAPTCHA
            document.getElementById('captcha').value = '';
            generateCaptcha();
        }
const user = "Rupa", psswd = "Rupa@tamil1";