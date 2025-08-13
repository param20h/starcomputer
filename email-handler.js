/**
 * FIXED Email Handler for Star Computer Center
 * Simple and reliable contact form submission
 */

console.log('🚀 Loading Fixed Email Handler...');

// Wait for DOM and all scripts to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded - Setting up contact form...');
    
    // Wait a bit more for EmailJS to load
    setTimeout(() => {
        setupContactFormFixed();
    }, 1000);
});

function setupContactFormFixed() {
    console.log('🔧 Setting up contact form (FIXED version)...');
    
    // Check if EMAIL_CONFIG is available
    if (typeof EMAIL_CONFIG === 'undefined') {
        console.error('❌ EMAIL_CONFIG not found!');
        return;
    }
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded!');
        return;
    }
    
    // Initialize EmailJS
    try {
        emailjs.init({
            publicKey: EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
        });
        console.log('✅ EmailJS initialized with public key:', EMAIL_CONFIG.EMAILJS.PUBLIC_KEY);
    } catch (error) {
        console.error('❌ Failed to initialize EmailJS:', error);
        return;
    }
    
    // Find the contact form
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('❌ Contact form with ID "contact-form" not found!');
        return;
    }
    
    console.log('✅ Contact form found:', contactForm);
    
    // Remove any existing event listeners and add new one
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    
    // Add submit event listener to the new form
    newForm.addEventListener('submit', handleFormSubmit);
    
    console.log('✅ Form event listener attached successfully');
    
    // Test function
    window.testFormHandler = function() {
        console.log('🧪 Testing form handler...');
        const testEvent = new Event('submit');
        newForm.dispatchEvent(testEvent);
    };
    
    console.log('💡 Test function available: testFormHandler()');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    console.log('🎯 FORM SUBMITTED! Event triggered correctly');
    
    const form = event.target;
    
    // Get form elements
    const submitBtn = form.querySelector('#submit-btn') || form.querySelector('button[type="submit"]');
    const submitText = form.querySelector('#submit-text');
    const submitSpinner = form.querySelector('#submit-spinner');
    const statusDiv = document.getElementById('form-status');
    
    console.log('📝 Form elements found:', {
        submitBtn: !!submitBtn,
        submitText: !!submitText,
        submitSpinner: !!submitSpinner,
        statusDiv: !!statusDiv
    });
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        phone: formData.get('phone'),
        course_interest: formData.get('course_interest'),
        message: formData.get('message')
    };
    
    console.log('📊 Form data collected:', data);
    
    // Validate required fields
    if (!data.user_name || !data.user_email || !data.message || !data.course_interest) {
        console.warn('⚠️ Validation failed: Missing required fields');
        showStatusMessage('⚠️ Please fill in all required fields.', false);
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.user_email)) {
        console.warn('⚠️ Validation failed: Invalid email');
        showStatusMessage('⚠️ Please enter a valid email address.', false);
        return;
    }
    
    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Sending...';
        if (submitSpinner) submitSpinner.classList.remove('hidden');
    }
    
    try {
        console.log('📧 Preparing to send email...');
        
        // Prepare template parameters
        const templateParams = {
            title: 'Contact Form Submission - Star Computer Center',
            from_name: data.user_name,
            from_email: data.user_email,
            phone: data.phone || 'Not provided',
            course_interest: data.course_interest,
            message: data.message
        };
        
        console.log('📧 Sending email with parameters:', templateParams);
        console.log('🔧 EmailJS Config:', {
            service: EMAIL_CONFIG.EMAILJS.SERVICE_ID,
            template: EMAIL_CONFIG.EMAILJS.TEMPLATE_ID_CONTACT
        });
        
        // Send email
        const response = await emailjs.send(
            EMAIL_CONFIG.EMAILJS.SERVICE_ID,
            EMAIL_CONFIG.EMAILJS.TEMPLATE_ID_CONTACT,
            templateParams
        );
        
        console.log('✅ EMAIL SENT SUCCESSFULLY!', response);
        
        // Show success message
        showStatusMessage(`
            ✅ <strong>Message Sent Successfully!</strong><br>
            📧 Your inquiry has been delivered to Star Computer Center<br>
            📞 We will contact you within 24 hours<br>
            📬 Status: ${response.status} - ${response.text}
        `, true);
        
        // Reset form
        form.reset();
        console.log('📝 Form reset successfully');
        
    } catch (error) {
        console.error('❌ EMAIL SEND FAILED:', error);
        
        // Show error message
        let errorMsg = `❌ <strong>Failed to send message!</strong><br>`;
        
        if (error.status === 400) {
            errorMsg += `🚫 Configuration error. Please try again later.`;
        } else if (error.status === 401) {
            errorMsg += `🚫 Authentication failed. Please try again later.`;
        } else if (error.status === 402) {
            errorMsg += `🚫 Service temporarily unavailable. Please try again later.`;
        } else if (error.status === 404) {
            errorMsg += `🚫 Service not found. Please try again later.`;
        } else if (error.status === 429) {
            errorMsg += `🚫 Too many requests. Please wait a moment and try again.`;
        } else {
            errorMsg += `🚫 ${error.message || 'Unknown error occurred'}`;
        }
        
        errorMsg += `<br><br><strong>📞 Alternative Contact:</strong><br>`;
        errorMsg += `Phone: +91 84276 26365<br>`;
        errorMsg += `Email: starcomputergolewala@gmail.com`;
        
        showStatusMessage(errorMsg, false);
        
    } finally {
        // Reset button state
        if (submitBtn) {
            submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Send Message';
            if (submitSpinner) submitSpinner.classList.add('hidden');
        }
    }
}

function showStatusMessage(message, isSuccess = true) {
    const statusDiv = document.getElementById('form-status');
    if (!statusDiv) {
        console.warn('⚠️ Status div not found');
        return;
    }
    
    statusDiv.className = `p-4 rounded-lg text-center font-medium ${
        isSuccess 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
    }`;
    statusDiv.innerHTML = message;
    statusDiv.classList.remove('hidden');
    
    // Auto hide after 10 seconds for success messages
    if (isSuccess) {
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 10000);
    }
}

// Global functions for debugging
window.debugContactForm = function() {
    console.log('🔍 DEBUGGING CONTACT FORM:');
    console.log('EMAIL_CONFIG:', typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG : 'NOT FOUND');
    console.log('emailjs:', typeof emailjs !== 'undefined' ? 'LOADED' : 'NOT LOADED');
    
    const form = document.getElementById('contact-form');
    console.log('Contact form:', form ? 'FOUND' : 'NOT FOUND');
    
    if (form) {
        console.log('Form elements:', {
            inputs: form.querySelectorAll('input').length,
            textareas: form.querySelectorAll('textarea').length,
            selects: form.querySelectorAll('select').length,
            submitBtn: !!form.querySelector('#submit-btn')
        });
    }
};

console.log('🎯 Fixed Email Handler Loaded Successfully!');
console.log('💡 Debug function available: debugContactForm()');
