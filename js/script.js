// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Demo Application Carousel
const demoScreens = [
    {
        image: 'img/Asystent_ss.png',
        title: 'Asystent żywieniowy',
        description: 'Inteligentny dobór przepisów na podstawie dostępnych składników i preferencji użytkownika.'
    },
    {
        image: 'img/Logowanie_ss.png',
        title: 'Logowanie',
        description: 'Bezpieczny system logowania z możliwością utworzenia spersonalizowanego profilu użytkownika.'
    },
    {
        image: 'img/Paragony_ss.png',
        title: 'Skaner paragonów',
        description: 'Automatyczne rozpoznawanie produktów z paragonów i dodawanie ich do wirtualnej spiżarni.'
    },
    {
        image: 'img/Produkty_ss.png',
        title: 'Zarządzanie produktami',
        description: 'Przeglądanie i edycja produktów w spiżarni z możliwością śledzenia dat ważności.'
    },
    {
        image: 'img/Profil_ss.png',
        title: 'Profil użytkownika',
        description: 'Personalizacja preferencji żywieniowych, alergii i celów zdrowotnych.'
    },
    {
        image: 'img/Przepisy_ss.png',
        title: 'Przepisy',
        description: 'Przeglądanie dopasowanych przepisów z możliwością rozpoczęcia gotowania krok po kroku.'
    }
];

let currentDemoIndex = 0;

// Initialize demo
function initDemo() {
    updateDemoScreen(0);
    
    // Add click listeners to demo buttons
    document.querySelectorAll('.demo-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentDemoIndex = index;
            updateDemoScreen(index);
            updateDemoButtons(index);
        });
    });
}

function updateDemoScreen(index) {
    const demoImage = document.getElementById('demo-image');
    const demoTitle = document.getElementById('demo-title');
    const demoDescription = document.getElementById('demo-description');
    
    if (demoScreens[index]) {
        demoImage.src = demoScreens[index].image;
        demoImage.alt = demoScreens[index].title;
        demoTitle.textContent = demoScreens[index].title;
        demoDescription.textContent = demoScreens[index].description;
    }
}

function updateDemoButtons(activeIndex) {
    document.querySelectorAll('.demo-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === activeIndex);
    });
}

// Auto-rotate demo screens
function startDemoAutoRotate() {
    setInterval(() => {
        currentDemoIndex = (currentDemoIndex + 1) % demoScreens.length;
        updateDemoScreen(currentDemoIndex);
        updateDemoButtons(currentDemoIndex);
    }, 5000); // Change every 5 seconds
}

// Presentation Slideshow
let currentSlide = 1;
const totalSlides = 21;

function initPresentation() {
    // Create slide indicators
    const indicatorsContainer = document.querySelector('.slide-indicators');
    for (let i = 1; i <= totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 1) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    // Update slide counter
    updateSlideCounter();
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    } else if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    
    updateSlide();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    updateSlide();
}

function updateSlide() {
    const slideImage = document.getElementById('current-slide');
    slideImage.src = `Prezentacja/${currentSlide}.svg`;
    slideImage.alt = `Slajd ${currentSlide} prezentacji`;
    
    updateSlideCounter();
    updateSlideIndicators();
}

function updateSlideCounter() {
    document.getElementById('current-slide-num').textContent = currentSlide;
    document.getElementById('total-slides').textContent = totalSlides;
}

function updateSlideIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index + 1 === currentSlide);
    });
}

// Keyboard navigation for presentation
document.addEventListener('keydown', (e) => {
    if (isElementInViewport(document.querySelector('.presentation'))) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Home') {
            goToSlide(1);
        } else if (e.key === 'End') {
            goToSlide(totalSlides);
        }
    }
});

// Auto-play presentation (optional)
let presentationAutoPlay = false;
let autoPlayInterval;

function toggleAutoPlay() {
    if (presentationAutoPlay) {
        clearInterval(autoPlayInterval);
        presentationAutoPlay = false;
    } else {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, 3000);
        presentationAutoPlay = true;
    }
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .feature-card, .arch-card, .resource-card, .data-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-mascot');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You could replace with a placeholder image here
            this.style.opacity = '0.5';
            this.alt = 'Obraz niedostępny';
        });
    });
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary success message
        showNotification('Skopiowano do schowka!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce((e) => {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDemo();
    initPresentation();
    initScrollAnimations();
    initParallax();
    initLazyLoading();
    handleImageErrors();
    
    // Start demo auto-rotation after a delay
    setTimeout(startDemoAutoRotate, 3000);
    
    // Log successful initialization
    console.log('Ragatouille website initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments if needed
}, 250));

// Global functions for inline event handlers
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.toggleAutoPlay = toggleAutoPlay;