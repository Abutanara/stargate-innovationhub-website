/**
 * Stargate Innovationhub - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            
            // Animate hamburger bars
            navToggle.classList.toggle('is-active', isOpen);
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle anchor links from external pages
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Note: Active nav links are set directly in HTML with the 'active' class
    // No dynamic JavaScript is needed for main navigation highlighting
    
    // Legal page navigation highlighting
    const legalNavLinks = document.querySelectorAll('.legal-nav__link');
    if (legalNavLinks.length > 0) {
        legalNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.includes(href)) {
                link.classList.add('active');
            }
        });
    }
    
    // Copy to clipboard functionality (for email links etc.)
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
});

// Utility function for external scripts
window.StargateHub = {
    scrollToElement: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Cookie Banner Logic
(function() {
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');
    
    if (!banner) return;
    
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsBtn = document.getElementById('cookie-settings');
    const modalCloseBtn = document.getElementById('cookie-modal-close');
    const saveSettingsBtn = document.getElementById('cookie-save-settings');
    const analyticsToggle = document.getElementById('analytics-cookies');
    const marketingToggle = document.getElementById('marketing-cookies');
    
    function showBanner() {
        setTimeout(() => banner.classList.add('visible'), 500);
    }
    
    function hideBanner() {
        banner.classList.remove('visible');
    }
    
    function showModal() {
        if (modal) {
            modal.classList.add('visible');
            // Initialize toggles from localStorage
            if (analyticsToggle) {
                analyticsToggle.checked = localStorage.getItem('cookieAnalytics') === 'true';
            }
            if (marketingToggle) {
                marketingToggle.checked = localStorage.getItem('cookieMarketing') === 'true';
            }
        }
    }
    
    function hideModal() {
        if (modal) {
            modal.classList.remove('visible');
        }
    }
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        showBanner();
    }
    
    // Accept all cookies
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieAnalytics', 'true');
            localStorage.setItem('cookieMarketing', 'true');
            hideBanner();
            // Initialize analytics after consent
            if (typeof updateAnalyticsConsent === 'function') {
                updateAnalyticsConsent();
            }
        });
    }
    
    // Reject all cookies (except necessary)
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('cookieAnalytics', 'false');
            localStorage.setItem('cookieMarketing', 'false');
            hideBanner();
            // Update analytics consent (will disable)
            if (typeof updateAnalyticsConsent === 'function') {
                updateAnalyticsConsent();
            }
        });
    }
    
    // Open settings modal
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            hideBanner();
            showModal();
        });
    }
    
    // Close modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', hideModal);
    }
    
    // Close modal on overlay click
    if (modal) {
        const overlay = modal.querySelector('.cookie-modal__overlay');
        if (overlay) {
            overlay.addEventListener('click', hideModal);
        }
    }
    
    // Save custom settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('cookieAnalytics', analyticsToggle ? analyticsToggle.checked.toString() : 'false');
            localStorage.setItem('cookieMarketing', marketingToggle ? marketingToggle.checked.toString() : 'false');
            hideModal();
            // Update analytics based on new preferences
            if (typeof updateAnalyticsConsent === 'function') {
                updateAnalyticsConsent();
            }
        });
    }
})();

