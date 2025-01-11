// Add at the beginning of script.js
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page is loaded
    const loader = document.querySelector('.loader-wrapper');
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 150);
});

// Update the language switcher to show loader
function changeLanguage(lang) {
    // Show loader
    const loader = document.querySelector('.loader-wrapper');
    loader.style.display = 'flex';
    loader.classList.remove('fade-out');

    // Small delay to ensure loader is visible
    setTimeout(() => {
        // Existing language change logic
        document.querySelectorAll('.lang-link').forEach(link => {
            link.classList.remove('current');
            if ((lang === 'hi' && link.textContent.includes('हिन्दी')) ||
                (lang === 'en' && link.textContent.includes('English'))) {
                link.classList.add('current');
            }
        });

        // Update translations
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (translations[lang][key].includes('<')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Store language preference
        localStorage.setItem('preferred-language', lang);

        // Hide loader
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 100);
}

// Add page transition for navigation
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && 
        link.href.includes('html') && 
        !link.target && 
        !link.getAttribute('href').startsWith('#') && 
        !link.getAttribute('href').startsWith('tel:') && 
        !link.getAttribute('href').startsWith('mailto:')) {
        
        e.preventDefault();
        const loader = document.querySelector('.loader-wrapper');
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
        
        setTimeout(() => {
            window.location = link.href;
        }, 150);
    }
});

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