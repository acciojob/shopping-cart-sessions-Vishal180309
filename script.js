// Function to add product to cart
function addProductToCart(productName, productPrice) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((cartProduct) => cartProduct.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    saveCart(cart);
    updateCartList();
}

// Function to get cart from session storage
function getCart() {
    const cart = window.sessionStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to session storage
function saveCart(cart) {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update cart list
function updateCartList() {
    const cartList = document.getElementById("cart-list");
    const cart = getCart();

    cartList.innerHTML = "";
    cart.forEach((cartProduct) => {
        const cartProductListItem = document.createElement("li");
        cartProductListItem.innerHTML = `${cartProduct.name} x ${cartProduct.quantity} = $${cartProduct.price * cartProduct.quantity}`;
        cartList.appendChild(cartProductListItem);
    });
}

// Function to clear cart
function clearCart() {
    saveCart([]);
    updateCartList();
}

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product-name");
            const productPrice = parseFloat(button.getAttribute("data-product-price"));
            addProductToCart(productName, productPrice);
        });
    });

    const clearCartButton = document.getElementById("clear-cart-btn");
    clearCartButton.addEventListener("click", clearCart);

    updateCartList();
});