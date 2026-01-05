/**
 * ForeverTold Landing Page - Main JavaScript
 * Mobile menu, smooth scrolling, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initFAQAccessibility();
    initNewsletterForm();
});

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isOpen);
        menu.classList.toggle('is-open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    
    // Close menu when clicking a link
    menu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('is-open');
            document.body.style.overflow = '';
            toggle.focus();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('is-open') && 
            !menu.contains(e.target) && 
            !toggle.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without scrolling
            history.pushState(null, null, href);
        });
    });
}

/**
 * Scroll-triggered Animations (Intersection Observer)
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .chapter-card, .testimonial, .faq__item'
    );
    
    if (!animatedElements.length) return;
    
    // Add initial hidden state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    // Observe all elements
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Add shadow when scrolled
                if (currentScroll > 10) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                } else {
                    header.style.boxShadow = 'none';
                }
                
                // Hide/show on scroll direction (optional - uncomment if desired)
                // if (currentScroll > lastScroll && currentScroll > 100) {
                //     header.style.transform = 'translateY(-100%)';
                // } else {
                //     header.style.transform = 'translateY(0)';
                // }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * FAQ Accessibility Enhancements
 */
function initFAQAccessibility() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        // Add keyboard support
        summary.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.open = !item.open;
            }
        });
        
        // Animate open/close
        item.addEventListener('toggle', () => {
            const answer = item.querySelector('.faq__answer');
            if (item.open) {
                answer.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
}

/**
 * Newsletter Form Handling
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter__form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        if (!email) return;
        
        // Disable form while submitting
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            form.innerHTML = `
                <div class="newsletter__success" style="text-align: center; padding: var(--space-lg);">
                    <span style="font-size: 2rem; display: block; margin-bottom: var(--space-sm);">✉️</span>
                    <p style="font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--space-xs);">
                        Vielen Dank!
                    </p>
                    <p style="color: var(--color-text-secondary);">
                        Du erhältst bald Post von uns.
                    </p>
                </div>
            `;
        } catch (error) {
            // Show error
            submitBtn.disabled = false;
            submitBtn.textContent = 'Erneut versuchen';
            emailInput.style.borderColor = 'var(--color-error)';
        }
    });
}

/**
 * Lazy Load Images (for additional performance)
 */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Add CSS animation keyframe
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/**
 * Track Page Performance (optional - for analytics)
 */
if (typeof window.performance !== 'undefined') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

