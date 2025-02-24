// Define products
const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 9.99 },
    { id: 3, name: "Product 3", price: 12.99 },
    { id: 4, name: "Product 4", price: 8.99 },
    { id: 5, name: "Product 5", price: 15.99 }
];

// Function to add product to cart
function addProductToCart(productId) {
    const product = products.find((product) => product.id === productId);
    const cart = getCart();
    const existingProductIndex = cart.findIndex((cartProduct) => cartProduct.id === productId);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
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
            const productId = parseInt(button.getAttribute("data-product-id"));
            addProductToCart(productId);
        });
    });

    const clearCartButton = document.getElementById("clear-cart-btn");
    clearCartButton.addEventListener("click", clearCart);

    updateCartList();