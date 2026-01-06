/**
 * North Shore Family Adventures - Email Article Widget
 * Embeddable form that allows visitors to request article links via email
 *
 * Usage:
 * <div id="nsfa-email-widget"></div>
 * <script src="https://yourdomain.com/email-widget.js"></script>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // API endpoint for sending emails
        apiUrl: window.NSFA_API_URL || 'http://localhost:3000/api/send-article-email',

        // Auto-detect article URL (current page) or set manually
        articleUrl: window.NSFA_ARTICLE_URL || window.location.href,

        // Article title (auto-detect from page title or set manually)
        articleTitle: window.NSFA_ARTICLE_TITLE || document.title,

        // Widget container ID
        containerId: window.NSFA_CONTAINER_ID || 'nsfa-email-widget',

        // Theme customization
        primaryColor: window.NSFA_PRIMARY_COLOR || '#667eea',
        secondaryColor: window.NSFA_SECONDARY_COLOR || '#764ba2'
    };

    // Widget HTML template
    const widgetTemplate = `
        <div class="nsfa-widget-container" id="nsfa-widget">
            <div class="nsfa-widget-header">
                <h3>📧 Get this article in your inbox</h3>
                <p>Enter your email and we'll send you a link to this article</p>
            </div>

            <form class="nsfa-widget-form" id="nsfa-email-form">
                <div class="nsfa-form-group">
                    <input
                        type="email"
                        id="nsfa-email-input"
                        placeholder="your@email.com"
                        required
                        aria-label="Email address"
                    />
                    <button type="submit" class="nsfa-submit-btn" id="nsfa-submit-btn">
                        Send Me the Link
                    </button>
                </div>
                <div class="nsfa-privacy-notice">
                    By submitting, you'll receive this article and join our email list for updates about family adventures in Milwaukee.
                </div>
            </form>

            <div class="nsfa-success-message" id="nsfa-success" style="display: none;">
                <div class="nsfa-success-icon">✅</div>
                <h4>Check your inbox!</h4>
                <p>We've sent the article link to your email. It should arrive in a few moments.</p>
            </div>

            <div class="nsfa-error-message" id="nsfa-error" style="display: none;">
                <div class="nsfa-error-icon">❌</div>
                <p id="nsfa-error-text">Something went wrong. Please try again.</p>
            </div>
        </div>
    `;

    // Widget CSS styles
    const widgetStyles = `
        .nsfa-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.secondaryColor} 100%);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            max-width: 600px;
            margin: 20px auto;
            color: white;
        }

        .nsfa-widget-header h3 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 700;
        }

        .nsfa-widget-header p {
            margin: 0 0 20px 0;
            font-size: 16px;
            opacity: 0.95;
        }

        .nsfa-widget-form {
            margin: 0;
        }

        .nsfa-form-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }

        #nsfa-email-input {
            flex: 1;
            min-width: 200px;
            padding: 14px 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            transition: all 0.3s ease;
        }

        #nsfa-email-input:focus {
            outline: none;
            border-color: white;
            background: white;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
        }

        .nsfa-submit-btn {
            padding: 14px 28px;
            background: white;
            color: ${CONFIG.primaryColor};
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .nsfa-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .nsfa-submit-btn:active {
            transform: translateY(0);
        }

        .nsfa-submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .nsfa-privacy-notice {
            font-size: 13px;
            opacity: 0.9;
            line-height: 1.4;
        }

        .nsfa-success-message,
        .nsfa-error-message {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
        }

        .nsfa-success-icon,
        .nsfa-error-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }

        .nsfa-success-message h4 {
            margin: 10px 0;
            font-size: 20px;
        }

        .nsfa-success-message p,
        .nsfa-error-message p {
            margin: 10px 0 0 0;
            opacity: 0.95;
        }

        .nsfa-loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: ${CONFIG.primaryColor};
            animation: nsfa-spin 1s ease-in-out infinite;
        }

        @keyframes nsfa-spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
            .nsfa-widget-container {
                padding: 20px;
            }

            .nsfa-form-group {
                flex-direction: column;
            }

            #nsfa-email-input,
            .nsfa-submit-btn {
                width: 100%;
            }
        }
    `;

    // Inject styles into the page
    function injectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = widgetStyles;
        document.head.appendChild(styleElement);
    }

    // Initialize the widget
    function initWidget() {
        const container = document.getElementById(CONFIG.containerId);
        if (!container) {
            console.error(`NSFA Email Widget: Container with ID "${CONFIG.containerId}" not found`);
            return;
        }

        // Inject styles
        injectStyles();

        // Insert widget HTML
        container.innerHTML = widgetTemplate;

        // Attach event listeners
        const form = document.getElementById('nsfa-email-form');
        form.addEventListener('submit', handleFormSubmit);
    }

    // Handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();

        const emailInput = document.getElementById('nsfa-email-input');
        const submitBtn = document.getElementById('nsfa-submit-btn');
        const form = document.getElementById('nsfa-email-form');
        const successMsg = document.getElementById('nsfa-success');
        const errorMsg = document.getElementById('nsfa-error');
        const errorText = document.getElementById('nsfa-error-text');

        const email = emailInput.value.trim();

        // Hide any previous messages
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        // Disable button and show loading
        submitBtn.disabled = true;
        const originalButtonText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="nsfa-loading"></span>';

        try {
            const response = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    articleUrl: CONFIG.articleUrl,
                    articleTitle: CONFIG.articleTitle
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Show success message
                form.style.display = 'none';
                successMsg.style.display = 'block';

                // Track conversion (if analytics available)
                if (window.gtag) {
                    gtag('event', 'email_signup', {
                        'event_category': 'engagement',
                        'event_label': CONFIG.articleUrl
                    });
                }
            } else {
                // Show error message
                errorText.textContent = data.error || 'Failed to send email. Please try again.';
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = originalButtonText;
            }
        } catch (error) {
            console.error('NSFA Email Widget Error:', error);
            errorText.textContent = 'Network error. Please check your connection and try again.';
            errorMsg.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = originalButtonText;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

})();
