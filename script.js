document.addEventListener("DOMContentLoaded", function () {
    const productsData = [
        { name: "Laptop", price: 1000 },
        { name: "Smartphone", price: 500 },
        { name: "Headphones", price: 100 },
        { name: "Smartwatch", price: 200 },
        { name: "Tablet", price: 300 }
    ];

    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart");
    const clearCartButton = document.getElementById("clearCart");

    // Load cart from sessionStorage
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Display products
    function renderProducts() {
        productsContainer.innerHTML = "";
        productsData.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <p>${product.name} - $${product.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Add to cart function
    window.addToCart = function (index) {
        const product = productsData[index];
        cart.push(product);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    // Render cart
    function renderCart() {
        cartContainer.innerHTML = "";
        cart.forEach((product, index) => {
            const li = document.createElement("li");
            li.textContent = `${product.name} - $${product.price}`;
            cartContainer.appendChild(li);
        });
    }

    // Clear cart function
    clearCartButton.addEventListener("click", function () {
        cart = [];
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });

    // Initial rendering
    renderProducts();
    renderCart();
});
