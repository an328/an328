// Function to calculate discount based on rules
function calculateDiscount(cart, discounts) {
    let discountAmount = 0;

    // Check for "flat_10_discount"
    if (cart.total > 200) {
        discountAmount = Math.min(discountAmount + 10, cart.total);
    }

    // Check for "bulk_5_discount"
    for (const product of cart.products) {
        if (product.quantity > 10) {
            discountAmount = Math.min(discountAmount + (0.05 * product.total), cart.total);
        }
    }

    // Check for "bulk_10_discount"
    if (cart.totalQuantity > 20) {
        discountAmount = Math.min(discountAmount + (0.1 * cart.total), cart.total);
    }

    // Check for "tiered_50_discount"
    if (cart.totalQuantity > 30) {
        for (const product of cart.products) {
            if (product.quantity > 15) {
                discountAmount += 0.5 * product.total;
            }
        }
    }

    return discountAmount;
}

// Function to calculate fees
function calculateFees(cart) {
    const giftWrapFee = cart.totalQuantity * 1;
    const shippingFee = Math.ceil(cart.totalQuantity / 10) * 5;
    return { giftWrapFee, shippingFee };
}

// Function to display the receipt
function displayReceipt(cart, discountName, discountAmount, fees) {
    console.log("Product Details:");
    for (const product of cart.products) {
        console.log(`${product.name} - Quantity: ${product.quantity} - Total: $${product.total}`);
    }

    console.log("\nSubtotal: $" + cart.total.toFixed(2));
    console.log(`Discount Applied (${discountName}): -$${discountAmount.toFixed(2)}`);
    console.log(`Shipping Fee: $${fees.shippingFee.toFixed(2)}`);
    console.log(`Gift Wrap Fee: $${fees.giftWrapFee.toFixed(2)}`);
    console.log("\nTotal: $" + (cart.total - discountAmount + fees.shippingFee + fees.giftWrapFee).toFixed(2));
}

// Main program
const products = [
    { name: "Product A", price: 20 },
    { name: "Product B", price: 40 },
    { name: "Product C", price: 50 }
];

const cart = { products: [], total: 0, totalQuantity: 0 };

// Get user input for quantity and gift wrap
for (const product of products) {
    const quantity = parseInt(prompt(`Enter quantity for ${product.name}:`), 10);
    const isGiftWrap = prompt(`Is ${product.name} wrapped as a gift? (yes/no)`).toLowerCase() === 'yes';

    const totalAmount = quantity * product.price;
    const giftWrapFee = isGiftWrap ? quantity * 1 : 0;

    cart.products.push({ name: product.name, quantity, total: totalAmount + giftWrapFee });
    cart.total += totalAmount;
    cart.totalQuantity += quantity;
}

const discountName = "tiered_50_discount"; // You can change this to test different discount scenarios
const discountAmount = calculateDiscount(cart, discountName);
const fees = calculateFees(cart);

displayReceipt(cart, discountName, discountAmount, fees);

