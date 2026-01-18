document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const spinner = submitBtn ? submitBtn.querySelector('.spinner-border') : null;

    // Track when the page was loaded to prevent bot submissions
    const loadTime = Date.now();

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Bot checks
            // Honeypot check
            const honeypot = document.getElementById('website').value;
            if (honeypot) {
                console.warn('Bot detected (honeypot)');
                return; // Silently ignore bot submissions
            }

            // Time check (reject if submitted too quickly, e.g., < 3 seconds)
            const submitTime = Date.now();
            if (submitTime - loadTime < 3000) {
                console.warn('Bot detected (time check)');
                showStatus('Please wait a moment before submitting.', 'error');
                return;
            }

            // 2. Validation
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const nameInput = document.getElementById('name');
            const subjectInput = document.getElementById('subject');

            let isValid = true;

            // Reset validation states
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            // Use Validator from validation.js if available
            if (typeof Validator !== 'undefined') {
                if (!Validator.isValidEmail(emailInput.value)) {
                    emailInput.classList.add('is-invalid');
                    isValid = false;
                }
            } else {
                // Simple fallback check
                if (!emailInput.value.includes('@')) {
                    emailInput.classList.add('is-invalid');
                    isValid = false;
                }
            }

            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // 3. Submission
            setLoading(true);

            // Simulate API call or fallback to mailto
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value || 'Contact Us Inquiry',
                message: messageInput.value
            };

            // Attempt to post to API
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('API not available');
                })
                .then(data => {
                    showStatus('Thanks — your message has been sent. We\'ll be in touch soon.', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    // Fallback to mailto if API fails or doesn't exist
                    console.log('Falling back to mailto:', error.message);

                    const mailtoLink = `mailto:support@resumebuilder.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message)}`;

                    window.location.href = mailtoLink;

                    showStatus('Opening your email client to send the message...', 'success');
                    setTimeout(() => {
                        contactForm.reset();
                    }, 1000);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    }

    function setLoading(isLoading) {
        if (!submitBtn) return;

        if (isLoading) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';
            if (spinner) spinner.classList.remove('d-none');
        } else {
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';
            if (spinner) spinner.classList.add('d-none');
        }
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = type; // success or error

        // Use ValidationUI if available
        if (typeof ValidationUI !== 'undefined') {
            ValidationUI.showToast(message, type === 'success' ? 'success' : 'error');
        }
    }
});
