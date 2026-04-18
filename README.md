# 🧇 X'wafffle - Cafe & Waffles

A fully-functional, modern cafe ordering website with WhatsApp integration. Built with HTML, CSS, and vanilla JavaScript (no backend required).

## ✨ Features

### Core Features
- **Homepage**: Professional restaurant branding with hero section and menu preview
- **Menu Page**: Full menu with categorized items (Burgers, Drinks, Desserts, Salads, Appetizers)
- **Product Cards**: Each item displays emoji, name, price, and add-to-cart button
- **Shopping Cart**: Add, remove, and update item quantities
- **Checkout Page**: Customer information collection and order summary

### 💳 Checkout Features
- Full order summary with all items, quantities, and prices
- Automatic total calculation including tax
- Customer input fields: name, phone number, optional address
- Special requests field for custom notes
- Coupon code support (SAVE10 for 10% off, SAVE20 for 20% off)

### 📲 WhatsApp Integration
- Generates formatted order message with:
  - List of items with quantities and prices
  - Order total with tax calculation
  - Customer details
  - Special requests/notes
- Direct redirect to WhatsApp Web/Desktop via `wa.me` link
- Message is pre-filled and ready to send

### 🎨 UI/UX
- **Modern Design**: Gradient backgrounds with warm food theme colors
- **Responsive**: Full mobile, tablet, and desktop support
- **Smooth Animations**: Hover effects, bounce animations, transitions
- **Toast Notifications**: Visual feedback for all user actions
- **Cart Icon Badge**: Shows item count in cart
- **Category Filters**: Easy filtering by food category

### ⚙️ Technical Features
- Clean, well-organized code structure
- localStorage for persistent cart data
- sessionStorage for order tracking
- No database required (frontend-only)
- Modern CSS Grid and Flexbox layouts
- Keyboard shortcuts support

## 📁 Project Structure

```
web kit/
├── index.html           # Homepage
├── menu.html            # Menu page with filters
├── cart.html            # Shopping cart
├── checkout.html        # Checkout & WhatsApp integration
├── css/
│   └── style.css        # All styles and responsive design
└── js/
    ├── app.js           # Main app utilities & toast notifications
    ├── cart.js          # Shopping cart management
    └── whatsapp.js      # WhatsApp message generation & links
```

## 🚀 Getting Started

### 1. Basic Setup (No Installation Required)
Simply open `index.html` in your web browser. No server or dependencies needed!

```bash
# On Windows, double-click index.html or:
start index.html

# On Mac:
open index.html

# Or use Live Server in VS Code for better development experience
```

### 2. Configure WhatsApp Number

Open `js/whatsapp.js` and find this line (around line 42):

```javascript
const restaurantPhone = '1234567890'; // Update this!
```

Replace `'1234567890'` with your restaurant's WhatsApp number:

**Format**: Country code + phone number (digits only, no + or spaces)

**Examples**:
- USA: `'14155552671'` (for +1 415-555-2671)
- UK: `'442071838750'` (for +44 207-183-8750)
- India: `'919987654321'` (for +91 998-765-4321)
- Egypt: `'201001234567'` (for +20 100-123-4567)

### 3. Test the Application

1. **Homepage**: Navigate through the hero section and menu preview
2. **Add Items**: Click "Add to Cart" to add items to your cart
3. **View Cart**: Click the cart icon (🛒) with item count
4. **Manage Cart**: Update quantities or remove items
5. **Apply Coupon**: Try codes "SAVE10" or "SAVE20"
6. **Checkout**: Fill in your details and click "Confirm Order & Pay on WhatsApp"
7. **WhatsApp Integration**: Message opens automatically with your formatted order

## 🎯 How It Works

### Cart Management
- Items are saved to browser's `localStorage` 
- Cart persists even after closing the browser
- Cart count updates across all pages automatically

### Menu Data
- Sample menu items are hardcoded in HTML
- To add more items, edit the `MENU_ITEMS` array in `menu.html`
- Each item needs: `id`, `name`, `price`, `category`, `emoji`, `description`

### Order Processing
1. Customer fills checkout form with name, phone, and address
2. JavaScript generates formatted WhatsApp message
3. Message includes item list, prices, totals, and customer info
4. `wa.me` link opens WhatsApp with pre-filled message
5. Customer can review and send the order
6. Cart is automatically cleared after checkout

### Coupon System
Available coupons in `cart.html`:
- `SAVE10`: 10% discount
- `SAVE20`: 20% discount

Edit the `COUPON_CODES` object to add more coupons.

## 📱 Customization Guide

### Change Colors
Edit the CSS variables at the top of `css/style.css`:

```css
:root {
    --primary-color: #ff6b6b;      /* Red/Primary */
    --secondary-color: #4ecdc4;    /* Teal */
    --accent-color: #ffe66d;       /* Yellow */
    /* ... more variables ... */
}
```

### Add Menu Items
In `menu.html`, find the `MENU_ITEMS` array and add new items:

```javascript
{
    id: 18,
    name: 'Item Name',
    price: 9.99,
    category: 'category-name',
    emoji: '🍔',
    description: 'Item description'
}
```

### Change Restaurant Info
- **Name**: Replace "FoodHub" in navigation across all HTML files
- **Logo emoji**: Change the 🍔 icon in navbar `.logo-icon`
- **Contact info**: Add in footer section or create a contact page

### Change Tax Rate
In `cart.html` and `checkout.html`, change this line:
```javascript
const tax = subtotal * 0.10;  // 10% - change 0.10 to your rate
```

## 🌐 Deploy to Web

### Using GitHub Pages (Free)
1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Your site is live at `username.github.io/repo-name`

### Using Netlify (Free)
1. Drag and drop your project folder to [netlify.com](https://netlify.com)
2. Your site goes live instantly
3. Get a custom domain

### Using Vercel (Free)
1. Connect your GitHub repository to [vercel.com](https://vercel.com)
2. Deploy with one click
3. Automatic deployments on updates

## ⌨️ Keyboard Shortcuts

- <kbd>Ctrl</kbd> + <kbd>M</kbd> (or <kbd>Cmd</kbd> + <kbd>M</kbd>): Go to Menu
- <kbd>Ctrl</kbd> + <kbd>C</kbd> (or <kbd>Cmd</kbd> + <kbd>C</kbd>): Go to Cart
- <kbd>Ctrl</kbd> + <kbd>H</kbd> (or <kbd>Cmd</kbd> + <kbd>H</kbd>): Go to Home

## 🔒 Data Privacy

- **No server/backend**: All data stays in user's browser
- **localStorage**: Cart data persists locally on device
- **sessionStorage**: Order history stored in current browser session only
- **WhatsApp**: Messages sent directly via WhatsApp (never stored on our servers)

## 📊 Browser Support

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- IE 11: ⚠️ Partial support (CSS Grid not supported)

## 🐛 Troubleshooting

### WhatsApp Link Not Opening
- Check if WhatsApp is installed on device
- Verify phone number format in `whatsapp.js`
- Try opening `https://wa.me/1234567890?text=test` directly in browser

### Cart Not Persisting
- Check if browser localStorage is enabled
- Clear browser cache and try again
- Try a different browser

### Items Not Showing
- Check browser console for JavaScript errors
- Verify HTML file path in browser address bar
- Try refreshing the page (Ctrl+R or Cmd+R)

### Mobile Zoom Issues
- Most issues are automatically handled by responsive CSS
- Try `Ctrl+0` (Cmd+0 on Mac) to reset zoom level

## 💡 Future Enhancements

- **Payment Integration**: Stripe, PayPal, or Square
- **Order Tracking**: Real-time order status updates
- **Admin Dashboard**: Manage menu items and orders
- **Email Notifications**: Send order confirmation emails
- **Push Notifications**: Notify when order is ready
- **Dark Mode**: Complete dark theme
- **Multiple Languages**: Internationalization support
- **Reviews & Ratings**: Customer feedback system

## 📞 WhatsApp API Notes

This system uses the `wa.me` link format:
- Works on mobile devices with WhatsApp installed
- Works on desktop with WhatsApp Web or Desktop app
- Message is pre-filled but customer must press "Send"
- No API key or authentication required
- Free and officially supported by WhatsApp

## 📄 License

This project is open-source and free to use for personal and commercial purposes.

## 🎉 Tips for Best Results

1. **Use High-Quality Emojis**: Modern browsers support all emoji types
2. **Test on Mobile**: Use phone to test WhatsApp integration
3. **Optimize Images**: Add real food images instead of emojis for production
4. **Add Terms & Conditions**: Important for real restaurant
5. **Set Operating Hours**: Display hours and accept orders accordingly
6. **Add Delivery Fee**: Implement in your pricing logic
7. **Customer Support**: Link to customer service contact info

---

**Built with ❤️ for restaurant owners and food businesses**

Questions or suggestions? This is a frontend-only application, so feel free to modify and customize it to your needs!
