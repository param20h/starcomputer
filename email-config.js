/**
 * Email Configuration for Star Computer Center
 * Using EmailJS ONLY - No other APIs or services
 */

const EMAIL_CONFIG = {
    // EmailJS Configuration (ONLY service used)
    EMAILJS: {
        SERVICE_ID: 'service_t5b42qd',        // ✅ Your Gmail service ID
        TEMPLATE_ID_CONTACT: 'template_bnikeho',     // ✅ Your contact form template
        TEMPLATE_ID_NEWSLETTER: 'template_newsletter', // Newsletter template (if needed)
        PUBLIC_KEY: 'a_P5RxvAZq130yGsX'         // ✅ Your public key
    },
    
    // Your business email where messages will be sent
    RECIPIENT_EMAIL: 'starcomputergolewala@gmail.com'
};

/**
 * EMAILJS SETUP STATUS: ✅ CONFIGURED
 * 
 * This configuration uses ONLY EmailJS service:
 * - Service: Gmail (service_t5b42qd)
 * - Template: Contact Form (template_bnikeho)
 * - Public Key: a_P5RxvAZq130yGsX
 * - Recipient: starcomputergolewala@gmail.com
 * 
 * NO OTHER APIs OR SERVICES ARE USED!
 */

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}
