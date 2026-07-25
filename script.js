// Product List
let products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        image: "images/headphones.jpg",
          description: "High-quality wireless headphones with deep bass, Bluetooth connectivity, and long battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        image: "images/watch.jpg",
        description: "Stylish smartwatch with fitness tracking, heart rate monitoring, and smart notifications."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1499,
        image: "images/speaker.jpg",
        description: "Portable Bluetooth speaker with powerful sound, rich bass, and long-lasting battery."
    },
    {
        id: 4,
        name: "Laptop",
        price: 54999,
        image: "images/laptop.jpg",
        description: "Powerful laptop with a fast processor, Full HD display, and ample storage for work and study."
    },
    {
        id: 5,
        name: "Wireless Keyboard",
        price: 999,
        image: "images/keyboard.jpg",
        description: "Comfortable wireless keyboard with quiet keys, ergonomic design, and reliable connectivity."

    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 699,
        image: "images/mouse.jpg",
        description: "Smooth and responsive wireless mouse with ergonomic grip and long battery life."
    },
    {
        id: 7,
        name: "Smartphone",
        price: 24999,
        image: "images/mobile.jpg",
        description: "Feature-rich smartphone with a high-resolution camera, fast processor, and vibrant display."
    },
    {
        id: 8,
        name: "Camera",
        price: 39999,
        image: "images/camera.jpg",
        description: "Professional camera with high-resolution imaging, optical zoom, and advanced photography features."
    }
];

// Cart Counter
let cart = 0;
// Add to Cart Function
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.innerHTML = cartItems.length;
}

function addToCart(productId) {

    let selectedProduct = products.find(function(product) {
        return product.id === productId;
    });

    cartItems.push(selectedProduct);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    cart = cartItems.length;

    document.getElementById("cart-count").innerHTML = cart;

    alert(selectedProduct.name + " added to cart!");

}

// Search Product Function
function searchProduct() {

    let product = document.getElementById("search").value;

    if (product == "") {

        alert("Please enter a product name.");

    }
    else {

        alert("You searched for: " + product);

    }

}
let cartContainer = document.getElementById("cart-items");

if (cartContainer) {
    

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let emptyMessage = document.getElementById("empty-cart-message");
let checkoutButton = document.getElementById("checkout-btn");

if (cartItems.length === 0) {

    emptyMessage.innerHTML = "Your cart is empty.";

    checkoutButton.style.display = "none";

}
let total = 0;
    cartItems.forEach(function(product) {

        cartContainer.innerHTML += `
    <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <button onclick="removeFromCart(${product.id})">Remove</button>
    </div>
`;
total += product.price;
    });
    document.getElementById("total-price").innerHTML = total;

}
function removeFromCart(productId) {

    cartItems = cartItems.filter(function(product) {
        return product.id !== productId;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    location.reload();

}
function viewProduct(productId) {

    localStorage.setItem("selectedProduct", productId);

    window.location.href = "product-details.html";

}
let selectedProductId = localStorage.getItem("selectedProduct");

if (selectedProductId) {

    let selectedProduct = products.find(function(product) {
        return product.id == selectedProductId;
    });

    let productImage = document.getElementById("product-image");

    if (productImage) {

        document.getElementById("product-image").src = selectedProduct.image;

        document.getElementById("product-name").innerHTML = selectedProduct.name;

        document.getElementById("product-price").innerHTML = selectedProduct.price;
        document.getElementById("product-description").innerHTML = selectedProduct.description;
         document.getElementById("add-to-cart-btn").onclick = function () {
        addToCart(selectedProduct.id);
    };

}
}
let placeOrderButton = document.getElementById("place-order-btn");

if (placeOrderButton) {

    placeOrderButton.onclick = function () {
       let totalAmount = 0;

cartItems.forEach(function(item) {
    totalAmount += item.price;
});

fetch("/api/orders", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

    customer_name: document.getElementById("fullname").value,

    user_email: document.getElementById("email").value,

    phone: document.getElementById("phone").value,

    address: document.getElementById("address").value,

    city: document.getElementById("city").value,

    state: document.getElementById("state").value,

    pincode: document.getElementById("pincode").value,

    payment_method: document.querySelector('input[name="payment"]:checked')?.value || "",

    total_amount: totalAmount

})

})
.then(function(response) {

    return response.json();

})
.then(function(data) {

    alert(data.message);

    cartItems = [];

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    window.location.href = "order-success.html";

})
.catch(function(error) {

    console.log(error);

    alert("Something went wrong.");

});

    };

}
let registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.onsubmit = function (event) {

        event.preventDefault();

        let fullName = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if (
            fullName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all the fields.");
            return;
        }
if (password !== confirmPassword) {

    alert("Passwords do not match.");

    return;

}
        fetch("/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: fullName,
        email: email,
        password: password
    })
})
.then(function(response) {
    return response.json();
})
.then(function(data) {

    alert(data.message);

    if (data.message === "Registration successful!") {
        window.location.href = "login.html";
    }

})
.catch(function(error) {
    console.log(error);
    alert("Something went wrong.");
});

    };

}
let loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.onsubmit = function (event) {

        event.preventDefault();

        let loginEmail = document.getElementById("login-email").value;
        let loginPassword = document.getElementById("login-password").value;

        if (loginEmail === "" || loginPassword === "") {

            alert("Please fill in all the fields.");

            return;

        }

       fetch("/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
    })
})
.then(function(response) {
    return response.json();
})
.then(function(data) {

    alert(data.message);

    if (data.message === "Login successful!") {
        window.location.href = "index.html";
    }

})
.catch(function(error) {
    console.log(error);
    alert("Something went wrong.");
});

}

    };

let logoutLink = document.getElementById("logout-link");

if (logoutLink) {

    logoutLink.onclick = function (event) {

        event.preventDefault();


        alert("Logged out successfully!");

        window.location.href = "login.html";

    };

}
fetch("/api/products")
.then(function(response) {
    return response.json();
})
.then(function(data) {

    console.log("Products from backend:", data);

    let container = document.getElementById("products-container");

    if (!container) {
        return;
    }

    data.forEach(function(product) {

        container.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" width="200">

                <h3>${product.name}</h3>

                <p>Price: ₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

                <button onclick="viewProduct(${product.id})">
                    View Details
                </button>
            </div>
        `;

    });

})
.catch(function(error) {
    console.log("Error:", error);
});