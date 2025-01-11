// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('nav').style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        document.querySelector('nav').style.backgroundColor = '#fff';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init('b6ELdptbNp5zVw99M'); // Replace with your EmailJS public key
})();

// Form submission handler
document.getElementById('employerContactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        company_name: document.getElementById('company').value,
        phone_number: document.getElementById('phone').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'perfind.contact@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('service_ll34x11', 'template_z443npi', templateParams)
        .then(function() {
            // Show success message
            alert('Thank you! Your message has been sent successfully.');
            
            // Reset form
            document.getElementById('employerContactForm').reset();
        }, function(error) {
            // Show error message
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});

function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            // Use innerHTML instead of textContent to preserve HTML tags
            element.innerHTML = translations[language][key];
        }
    });
} 