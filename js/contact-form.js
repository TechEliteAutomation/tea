/* START OF FILE: js/contact-form.js */

// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function () {

    // --- START: EmailJS Configuration ---
    // IMPORTANT: Replace these placeholders with your actual EmailJS values!
    // Find these in your EmailJS dashboard:
    // - Public Key: Account -> API Keys
    // - Service ID: Email Services -> (Your service)
    // - Template ID: Email Templates -> (Your template)
    const EMAILJS_PUBLIC_KEY = 'j-OrtrloWJVQ-6oHi'; 
    const EMAILJS_SERVICE_ID = 'service_c32q7a5'; // Replace with your Service ID
    const EMAILJS_TEMPLATE_ID = 'template_rjaqoee'; // Replace with your Template ID
    // --- END: EmailJS Configuration ---

    // Initialize EmailJS with your Public Key
    // Make sure the EMAILJS_PUBLIC_KEY above is correct.
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'j-OrtrloWJVQ-6oHi') { // Basic check
         emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("EmailJS Public Key is missing or is a placeholder. Form will not work.");
        // Optionally provide feedback to the user or disable the form entirely
    }


    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton && formStatus) { // Ensure all elements exist
        const originalButtonText = submitButton.textContent;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // --- Preliminary Check ---
            // Check if Service ID or Template ID are still placeholders
            if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID' ||
                !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'YOUR_EMAILJS_TEMPLATE_ID' ||
                !EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {

                console.error("EmailJS configuration (Public Key, Service ID, or Template ID) is incomplete or uses placeholders.");
                formStatus.textContent = 'Form configuration error. Please contact the administrator.';
                formStatus.className = 'form-status-message form-status-error'; // Use CSS class
                submitButton.disabled = true; // Keep button disabled
                submitButton.textContent = 'Config Error';
                return; // Stop the submission process
            }

            // --- Start Submission Process ---
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.textContent = 'Sending your message...';
            formStatus.className = 'form-status-message form-status-sending'; // Use CSS class

            // Send the form data using EmailJS
            // 'this' refers to the form element itself
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(function() {
                    // --- Success ---
                    formStatus.textContent = 'Message sent successfully! We\'ll be in touch soon.';
                    formStatus.className = 'form-status-message form-status-success'; // Use CSS class
                    submitButton.textContent = 'Sent!';
                    contactForm.reset(); // Clear the form fields

                    // Reset button and status message after a delay
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        formStatus.textContent = '';
                        formStatus.className = 'form-status-message'; // Reset class
                    }, 5000); // 5 seconds

                }, function(error) {
                    // --- Error ---
                    console.error('EmailJS Send Error:', error);
                    formStatus.textContent = `Failed to send message. Error: ${error.text || 'Unknown error'}. Please try again or email us directly.`;
                    formStatus.className = 'form-status-message form-status-error'; // Use CSS class
                    submitButton.textContent = 'Send Failed';

                    // Reset button after a delay, but keep the error message for a bit longer
                     setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        // Optionally clear the error message after a longer period or leave it
                        // setTimeout(() => {
                        //    if (formStatus.classList.contains('form-status-error')) { // Check if it's still the error message
                        //        formStatus.textContent = '';
                        //        formStatus.className = 'form-status-message';
                        //    }
                        // }, 10000); // e.g., clear error after 10 more seconds
                    }, 5000); // 5 seconds
                });
        });
    } else {
        // Log an error if essential elements are missing
        if (!contactForm) console.error("Contact form with ID 'contactForm' not found.");
        if (!submitButton) console.error("Submit button within the contact form not found.");
        if (!formStatus) console.error("Form status element with ID 'form-status' not found.");
    }

}); // End of DOMContentLoaded listener

/* END OF FILE: js/contact-form.js */
