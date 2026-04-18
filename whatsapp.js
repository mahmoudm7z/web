/**
 * WhatsApp Integration
 * Generates formatted messages and WhatsApp links for orders
 */

/**
 * Generate a formatted WhatsApp message for the order
 */
function generateWhatsAppMessage(cart, customerName, customerPhone, address, notes) {
    let message = '*🧇 X\'wafffle Order*\n\n';
    message += `*Customer Name:* ${customerName}\n`;
    message += `*Phone:* ${customerPhone}\n`;
    
    if (address && address.trim()) {
        message += `*Delivery Address:* ${address}\n`;
    }
    
    message += '\n*📋 Order Items:*\n';
    message += '─────────────────\n';

    // Add items to message
    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        subtotal += item.price * item.quantity;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × $${item.price} = $${itemTotal}\n`;
    });

    message += '─────────────────\n';

    // Calculate totals
    const tax = (subtotal * 0.10).toFixed(2);
    
    // Get discount from sessionStorage if it exists
    let discountAmount = 0;
    const savedDiscount = sessionStorage.getItem('foodhubDiscount');
    if (savedDiscount) {
        discountAmount = (subtotal * parseFloat(savedDiscount)).toFixed(2);
    }
    
    const total = (subtotal + parseFloat(tax) - parseFloat(discountAmount)).toFixed(2);

    message += `*Subtotal:* $${subtotal.toFixed(2)}\n`;
    message += `*Tax (10%):* $${tax}\n`;
    
    if (parseFloat(discountAmount) > 0) {
        message += `*Discount:* -$${discountAmount}\n`;
    }
    
    message += `\n*💰 Total: $${total}*\n`;

    if (notes && notes.trim()) {
        message += `\n*📝 Special Requests:* ${notes}\n`;
    }

    message += '\n✨ Thank you for ordering from X\'wafffle!\n';
    message += '📱 Payment on Delivery';

    return message;
}

/**
 * Get WhatsApp link with encoded message
 * Uses wa.me API for WhatsApp Web or WhatsApp Desktop
 */
function getWhatsAppLink(message) {
    // Restaurant's WhatsApp number (update this with your actual number)
    // Format: country code + number without + or spaces
    const restaurantPhone = '201141922647'; // +201141922647
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Return WhatsApp Web link
    return `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;
}

/**
 * Alternative function to get WhatsApp link for specific customer
 * (uncomment if you want customers to send to their own WhatsApp)
 */
function getWhatsAppLinkForCustomer(customerPhone, message) {
    // Remove any non-numeric characters from phone
    const cleanPhone = customerPhone.replace(/[^\d+]/g, '');
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Send order via WhatsApp API
 * Opens WhatsApp with pre-filled message
 */
function sendOrderViaWhatsApp(cart, customerName, customerPhone, address, notes) {
    try {
        const message = generateWhatsAppMessage(cart, customerName, customerPhone, address, notes);
        const whatsappLink = getWhatsAppLink(message);
        
        // Open WhatsApp in new window/tab
        window.open(whatsappLink, '_blank');
        
        // Optional: Track the order
        logOrderToSession(cart, customerName, customerPhone, address, notes);
        
        return true;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        showToast('❌ Failed to open WhatsApp');
        return false;
    }
}

/**
 * Log order information to session storage for record keeping
 */
function logOrderToSession(cart, customerName, customerPhone, address, notes) {
    const orderRecord = {
        timestamp: new Date().toISOString(),
        customer: {
            name: customerName,
            phone: customerPhone,
            address: address
        },
        items: cart,
        notes: notes,
        total: getCartTotal()
    };

    let orders = [];
    const savedOrders = sessionStorage.getItem('foodhubOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }

    orders.push(orderRecord);
    sessionStorage.setItem('foodhubOrders', JSON.stringify(orders));
    
    console.log('Order logged:', orderRecord);
}

/**
 * Get order history from session
 */
function getOrderHistory() {
    const orders = sessionStorage.getItem('foodhubOrders');
    return orders ? JSON.parse(orders) : [];
}

/**
 * Clear order history
 */
function clearOrderHistory() {
    sessionStorage.removeItem('foodhubOrders');
}
