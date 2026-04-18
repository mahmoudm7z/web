/**
 * Main App JavaScript
 * Toast notifications, utility functions, and general app logic
 */

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    // Determine toast type based on message
    if (message.includes('✅') || message.includes('added')) {
        toast.classList.add('success');
    } else if (message.includes('❌') || message.includes('error') || message.includes('Error')) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('success', 'error');
    }

    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show', 'success', 'error');
    }, 3000);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

/**
 * Format phone number (basic)
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+1${cleaned}`;
    }
    return phone;
}

/**
 * Validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (basic)
 */
function isValidPhone(phone) {
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length >= 10;
}

/**
 * Scroll to element smoothly
 */
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Debounce function for performance
 */
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

/**
 * Get user's current time and determine greeting
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 18) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
}

/**
 * Track page view (for analytics)
 */
function trackPageView(pageName) {
    console.log(`Page View: ${pageName}`);
    // Could be extended with actual analytics service
}

/**
 * Initialize app features
 */
function initializeApp() {
    // Track current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    trackPageView(currentPage);

    // Update cart count on every page
    updateCartCount();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            smoothScroll(target);
        });
    });

    console.log('X\'wafffle App Initialized ✅');
}

/**
 * Check if user is on mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Print order receipt
 */
function printReceipt(cart, customerName, customerPhone) {
    let receiptContent = 'X\'WAFFFLE ORDER RECEIPT\n';
    receiptContent += '=====================\n\n';
    receiptContent += `Customer: ${customerName}\n`;
    receiptContent += `Phone: ${customerPhone}\n`;
    receiptContent += `Date: ${new Date().toLocaleString()}\n\n`;
    receiptContent += 'ITEMS:\n';
    receiptContent += '-----\n';

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        receiptContent += `${index + 1}. ${item.name}\n`;
        receiptContent += `   ${item.quantity}x $${item.price} = $${itemTotal.toFixed(2)}\n`;
    });

    const tax = total * 0.10;
    receiptContent += '-----\n';
    receiptContent += `Subtotal: $${total.toFixed(2)}\n`;
    receiptContent += `Tax: $${tax.toFixed(2)}\n`;
    receiptContent += `Total: $${(total + tax).toFixed(2)}\n\n`;
    receiptContent += 'Thank you for your order!';

    console.log(receiptContent);
}

/**
 * Keyboard shortcuts
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + M to go to menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            window.location.href = 'menu.html';
        }
        // Ctrl/Cmd + C to go to cart
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            window.location.href = 'cart.html';
        }
        // Ctrl/Cmd + H to go home
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });
}

/**
 * Theme switcher (for future dark mode)
 */
let darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('foodhubDarkMode', darkMode);
}

function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem('foodhubDarkMode');
    if (savedDarkMode === 'true') {
        darkMode = true;
        document.body.classList.add('dark-mode');
    }
}

/**
 * Initialize all app features on load
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeKeyboardShortcuts();
    initializeDarkMode();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        formatCurrency,
        formatPhoneNumber,
        isValidEmail,
        isValidPhone,
        smoothScroll,
        debounce,
        getGreeting,
        trackPageView,
        isMobileDevice,
        printReceipt,
        toggleDarkMode,
        initializeDarkMode
    };
}
