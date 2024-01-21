def calculate_discount(cart, discounts):
    max_discount = 0
    discount_name = ""
    
    for discount, condition in discounts.items():
        if condition(cart):
            current_discount = condition(cart)
            if current_discount > max_discount:
                max_discount = current_discount
                discount_name = discount
    
    return discount_name, max_discount

def apply_discount(cart, discount_name, discount_amount):
    cart['discount_name'] = discount_name
    cart['discount_amount'] = discount_amount
    cart['total'] -= discount_amount

def calculate_shipping_fee(cart):
    num_packages = sum(cart['quantities'].values()) // 10
    cart['shipping_fee'] = num_packages * 5

def calculate_gift_wrap_fee(cart):
    cart['gift_wrap_fee'] = sum(cart['quantities'].values())

def display_receipt(cart):
    print("Product\t\tQuantity\tTotal")
    for product, quantity in cart['quantities'].items():
        print(f"{product}\t\t{quantity}\t\t${quantity * cart['prices'][product]}")
    
    print("\nSubtotal:\t\t\t$", cart['subtotal'])
    print(f"{cart['discount_name']} Discount:\t${cart['discount_amount']}")
    print("Shipping Fee:\t\t\t$", cart['shipping_fee'])
    print("Gift Wrap Fee:\t\t\t$", cart['gift_wrap_fee'])
    print("\nTotal:\t\t\t\t$", cart['total'])

def main():
    products = ['Product A', 'Product B', 'Product C']
    prices = {'Product A': 20, 'Product B': 40, 'Product C': 50}
    discounts = {
        "flat_10_discount": lambda cart: cart['subtotal'] > 200 and 10 or 0,
        "bulk_5_discount": lambda cart: any(qty > 10 for qty in cart['quantities'].values()) and 0.05 or 0,
        "bulk_10_discount": lambda cart: cart['total_quantity'] > 20 and 0.1 or 0,
        "tiered_50_discount": lambda cart: cart['total_quantity'] > 30 and any(qty > 15 for qty in cart['quantities'].values()) and 0.5 or 0
    }

    cart = {'quantities': {}, 'subtotal': 0, 'total_quantity': 0, 'total': 0, 'prices': prices}

    for product in products:
        quantity = int(input(f"Enter quantity of {product}: "))
        is_gift_wrapped = input(f"Is {product} wrapped as a gift? (yes/no): ").lower() == 'yes'
        
        cart['quantities'][product] = quantity
        cart['subtotal'] += quantity * prices[product]
        cart['total_quantity'] += quantity
        
        if is_gift_wrapped:
            cart['subtotal'] += quantity
            calculate_gift_wrap_fee(cart)

    discount_name, discount_amount = calculate_discount(cart, discounts)
    apply_discount(cart, discount_name, discount_amount)

    calculate_shipping_fee(cart)
    cart['total'] = cart['subtotal'] + cart['shipping_fee'] + cart['gift_wrap_fee']

    display_receipt(cart)

if __name__ == "__main__":
    main()
