// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Fade-in Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .stat-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Parallax Effect for Hero Section
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ==========================================
// Dynamic Year in Footer
// ==========================================

const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        if (el.textContent.includes('©')) {
            el.textContent = el.textContent.replace(/\d{4}/, currentYear);
        }
    });
};

updateFooterYear();

// ==========================================
// Add Active State to Current Section
// ==========================================

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// Copy Email to Clipboard (Optional)
// ==========================================

const emailCard = document.querySelector('.contact-card[href^="mailto"]');

if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        const email = 'jorge@nakkoud.com.br';
        
        // Create temporary input to copy email
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification();
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
        
        document.body.removeChild(tempInput);
    });
}

// ==========================================
// Show Copy Notification
// ==========================================

function showCopyNotification() {
    const notification = document.createElement('div');
    notification.textContent = 'Email copiado para a área de transferência!';
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #d4af37, #f4d03f);
        color: #0d1117;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Performance Optimization
// ==========================================

// Lazy load images if added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Prevent Flash of Unstyled Content
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ==========================================
// Console Easter Egg
// ==========================================

console.log('%c👋 Olá, desenvolvedor!', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cGostou do que viu? Vamos trabalhar juntos!', 'color: #8b949e; font-size: 14px;');
console.log('%c📧 jorge@nakkoud.com.br', 'color: #d4af37; font-size: 14px;');
