/* START OF FILE: js/contact-form.js */
(function() {
    // Initialize EmailJS with your User ID
    // IMPORTANT: Replace 'YOUR_USER_ID' with your actual EmailJS User ID
    emailjs.init("uqKcGwCeZJee7dzx6"); // This was provided in an earlier prompt by you. Confirm it's correct.

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status'); 
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton) {
        const originalButtonText = submitButton.textContent;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            if (formStatus) formStatus.textContent = ''; 

            // --- IMPORTANT: Replace with YOUR EmailJS Service ID and Template ID ---
            // These are specific to your EmailJS account and the template you set up.
            const serviceID = 'YOUR_EMAILJS_SERVICE_ID'; // e.g., 'service_techelite'
            const templateID = 'YOUR_EMAILJS_TEMPLATE_ID'; // e.g., 'template_contact_form'
            // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

            if (!serviceID || serviceID === 'YOUR_EMAILJS_SERVICE_ID' || !templateID || templateID === 'YOUR_EMAILJS_TEMPLATE_ID') {
                console.error("EmailJS Service ID or Template ID is not configured.");
                if (formStatus) {
                    formStatus.textContent = 'Form not configured. Please contact site administrator.';
                    formStatus.style.color = 'red';
                }
                submitButton.textContent = 'Configuration Error';
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }, 5000);
                return;
            }

            emailjs.sendForm(serviceID, templateID, this)
                .then(function() {
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! We\'ll be in touch soon.';
                        formStatus.style.color = 'var(--color-primary)'; // Use theme color for success
                    }
                    submitButton.textContent = 'Sent!';
                    contactForm.reset(); 
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        if (formStatus) formStatus.textContent = ''; 
                    }, 5000);
                }, function(error) {
                    if (formStatus) {
                        formStatus.textContent = 'Failed to send message. Please try again or email us directly.';
                        formStatus.style.color = '#e74c3c'; // A distinct error color
                        console.error('EmailJS Error:', error);
                    }
                    submitButton.textContent = 'Send Failed';
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                         if (formStatus) formStatus.textContent = '';
                    }, 5000);
                });
        });
    }
})();
/* END OF FILE: js/contact-form.js */