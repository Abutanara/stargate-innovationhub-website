/**
 * Stargate Innovationhub - Analytics Integration
 * DSGVO-compliant: Only loads tracking scripts after user consent
 */

// Configuration
const ANALYTICS_CONFIG = {
    // Google Analytics 4 (GA4) Measurement ID
    googleAnalyticsId: 'G-29128NPRYZ',
};

/**
 * Check if user has consented to analytics cookies
 */
function hasAnalyticsConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const analyticsCookies = localStorage.getItem('cookieAnalytics');
    
    // Check if user accepted all cookies or specifically analytics
    if (consent === 'accepted') {
        return true;
    }
    
    if (consent === 'custom' && analyticsCookies === 'true') {
        return true;
    }
    
    return false;
}

/**
 * Check if user has consented to marketing cookies
 */
function hasMarketingConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const marketingCookies = localStorage.getItem('cookieMarketing');
    
    if (consent === 'accepted') {
        return true;
    }
    
    if (consent === 'custom' && marketingCookies === 'true') {
        return true;
    }
    
    return false;
}

/**
 * Initialize Google Analytics 4 (GA4)
 */
function initGoogleAnalytics() {
    if (!ANALYTICS_CONFIG.googleAnalyticsId) {
        console.warn('⚠️ Google Analytics ID not configured');
        return;
    }

    // Check if gtag is already loaded (avoid duplicate loading)
    if (window.gtag && window.dataLayer) {
        return;
    }

    // Initialize dataLayer first
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
    script.onload = function() {
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
            'anonymize_ip': true, // IP anonymization for GDPR compliance
            'cookie_flags': 'SameSite=None;Secure'
        });
    };
    document.head.appendChild(script);
}

/**
 * Track page view
 */
function trackPageView() {
    if (hasAnalyticsConsent() && window.gtag) {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
}

/**
 * Track custom events (e.g., button clicks, downloads)
 */
function trackEvent(eventName, eventParams = {}) {
    if (hasAnalyticsConsent() && window.gtag) {
        gtag('event', eventName, eventParams);
    }
}

/**
 * Track app store button clicks
 */
function trackAppStoreClick(store, appName) {
    trackEvent('app_store_click', {
        store: store, // 'ios' or 'android'
        app_name: appName
    });
}

/**
 * Initialize all analytics tools based on consent
 */
function initAnalytics() {
    // Only initialize if user has given consent
    if (hasAnalyticsConsent()) {
        initGoogleAnalytics();
        // Track initial page view with a small delay to ensure gtag is loaded
        setTimeout(() => {
            trackPageView();
        }, 500);
    }
}

/**
 * Re-initialize analytics when consent changes
 * Call this function when user updates cookie preferences
 */
function updateAnalyticsConsent() {
    // Remove existing scripts (if any)
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager"]');
    existingScripts.forEach(script => script.remove());

    // Clear dataLayer
    if (window.dataLayer) {
        window.dataLayer = [];
    }
    window.gtag = undefined;

    // Re-initialize based on new consent
    setTimeout(() => {
        initAnalytics();
    }, 100);
}

// Make functions globally available
window.initAnalytics = initAnalytics;
window.updateAnalyticsConsent = updateAnalyticsConsent;
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackAppStoreClick = trackAppStoreClick;
window.hasAnalyticsConsent = hasAnalyticsConsent;
window.hasMarketingConsent = hasMarketingConsent;

// Auto-initialize on page load if consent already given
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}
