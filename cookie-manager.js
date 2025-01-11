class CookieManager {
    constructor() {
        this.cookieConsent = null;
        this.cookieModal = null;
        this.init();
    }

    init() {
        // Create and append cookie consent banner
        this.createCookieConsent();
        
        // Create and append cookie modal
        this.createCookieModal();
        
        // Check if user has already made a choice
        const cookieConsent = this.getCookie('cookieConsent');
        if (!cookieConsent) {
            this.showCookieConsent();
        }

        // Add event listener for cookie settings button
        const cookieSettingsBtn = document.getElementById('cookieSettings');
        if (cookieSettingsBtn) {
            cookieSettingsBtn.addEventListener('click', () => {
                this.showCookieModal();
            });
        }
    }

    createCookieConsent() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-text">
                <p data-translate="cookie_consent_text">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            </div>
            <div class="cookie-buttons">
                <button class="cookie-btn accept-cookies" data-translate="accept_cookies">Accept</button>
                <button class="cookie-btn reject-cookies" data-translate="reject_cookies">Reject</button>
            </div>
        `;

        document.body.appendChild(banner);
        this.cookieConsent = banner;

        // Add event listeners
        banner.querySelector('.accept-cookies').addEventListener('click', () => {
            this.acceptCookies();
        });

        banner.querySelector('.reject-cookies').addEventListener('click', () => {
            this.rejectCookies();
        });
    }

    createCookieModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2 data-translate="cookie_settings_title">Cookie Settings</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="cookie-preferences">
                    <div class="cookie-preference">
                        <label>
                            <input type="checkbox" name="necessary" checked disabled>
                            <span data-translate="necessary_cookies">Necessary Cookies</span>
                        </label>
                        <p data-translate="necessary_cookies_desc">Essential for website functionality.</p>
                    </div>
                    <div class="cookie-preference">
                        <label>
                            <input type="checkbox" name="analytics">
                            <span data-translate="analytics_cookies">Analytics Cookies</span>
                        </label>
                        <p data-translate="analytics_cookies_desc">Help us improve our website.</p>
                    </div>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn accept-cookies" data-translate="save_preferences">Save Preferences</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.cookieModal = modal;

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hideCookieModal();
        });

        modal.querySelector('.accept-cookies').addEventListener('click', () => {
            this.savePreferences();
        });
    }

    showCookieConsent() {
        this.cookieConsent.classList.add('show');
    }

    hideCookieConsent() {
        this.cookieConsent.classList.remove('show');
    }

    showCookieModal() {
        this.cookieModal.classList.add('show');
    }

    hideCookieModal() {
        this.cookieModal.classList.remove('show');
    }

    acceptCookies() {
        this.setCookie('cookieConsent', 'accepted', 365);
        this.setCookie('analyticsCookies', 'true', 365);
        this.hideCookieConsent();
    }

    rejectCookies() {
        this.setCookie('cookieConsent', 'rejected', 365);
        this.setCookie('analyticsCookies', 'false', 365);
        this.hideCookieConsent();
    }

    savePreferences() {
        const analytics = this.cookieModal.querySelector('input[name="analytics"]').checked;
        this.setCookie('cookieConsent', 'custom', 365);
        this.setCookie('analyticsCookies', analytics.toString(), 365);
        this.hideCookieModal();
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
} 