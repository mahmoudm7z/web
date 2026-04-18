/**
 * Shopping Cart Management
 * Handles all cart operations using localStorage
 */

const STORAGE_KEY = 'foodhubCart';
const DISCOUNT_KEY = 'foodhubDiscount';

/**
 * Get the current cart from localStorage
 */
function getCart() {
    const cart = localStorage.getItem(STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Add item to cart
 */
function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
}

/**
 * Remove item from cart
 */
function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    updateCartCount();
}

/**
 * Update item quantity
 */
function updateItemQuantity(itemId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === itemId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
            updateCartCount();
        }
    }
}

/**
 * Clear entire cart
 */
function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    updateCartCount();
}

/**
 * Get total cart items count
 */
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get total cart price
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Update cart count display on all pages
 */
function updateCartCount() {
    const count = getCartCount();
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = count;
        if (count > 0) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
