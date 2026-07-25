const sqlite3 = require("sqlite3").verbose();

// Create or connect to the database
const db = new sqlite3.Database("ecommerce.db", function (err) {

    if (err) {
        console.log("Error connecting to database:", err.message);
    }
    else {
        console.log("Connected to SQLite database.");
    }

});

module.exports = db;
db.run(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
)
`, function (err) {

    if (err) {
        console.log("Error creating products table:", err.message);
    }
    else {
        console.log("Products table is ready.");
    }

});
const products = [
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
        description: "Portable Bluetooth speaker with powerful sound and long battery life."
    },
    {
        id: 4,
        name: "Laptop",
        price: 54999,
        image: "images/laptop.jpg",
        description: "Powerful laptop suitable for coding, office work, and entertainment."
    },
    {
        id: 5,
        name: "Wireless Keyboard",
        price: 999,
        image: "images/keyboard.jpg",
        description: "Compact wireless keyboard with comfortable typing experience."
    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 699,
        image: "images/mouse.jpg",
        description: "Ergonomic wireless mouse with smooth tracking."
    },
    {
        id: 7,
        name: "Smartphone",
        price: 24999,
        image: "images/mobile.jpg",
        description: "Feature-rich smartphone with a high-resolution display and excellent camera."
    },
    {
        id: 8,
        name: "Camera",
        price: 39999,
        image: "images/camera.jpg",
        description: "High-quality digital camera for photography and videography."
    }
];
db.serialize(function () {

    products.forEach(function (product) {

        db.run(
            `INSERT OR IGNORE INTO products
            (id, name, price, image, description)
            VALUES (?, ?, ?, ?, ?)`,
            [
                product.id,
                product.name,
                product.price,
                product.image,
                product.description
            ],
            function (err) {

                if (err) {
                    console.log("Error inserting product:", err.message);
                }

            }
        );

    });

});
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`, function(err) {

    if (err) {
        console.log("Error creating users table:", err.message);
    } else {
        console.log("Users table is ready.");
    }

});
db.run(`
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    total_amount REAL NOT NULL,
    order_date TEXT NOT NULL
)
`, function (err) {

    if (err) {
        console.log("Error creating orders table:", err.message);
    }
    else {
        console.log("Orders table is ready.");
    }

});
