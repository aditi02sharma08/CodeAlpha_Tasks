const express = require("express");

const app = express();
app.use(express.json());
const db = require("./database");

const PORT = 5000;

// Serve all frontend files
app.use(express.static(__dirname));

// Home Route
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Test API
app.get("/api/message", function (req, res) {
    res.send("API Route Working");
});

// Products Data


// Products API
app.get("/api/products", function (req, res) {


    db.all("SELECT * FROM products", function (err, rows) {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);

    });

});

app.post("/api/register", function (req, res) {

    const { name, email, password } = req.body;

    db.run(
        `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
        [name, email, password],
        function (err) {

            if (err) {

                if (err.message.includes("UNIQUE")) {
                    return res.status(400).json({
                        message: "Email already registered."
                    });
                }

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Registration successful!"
            });

        }
    );

});
app.get("/api/orders", function (req, res) {
    res.send("Orders GET route works");
});
console.log("Orders route registered");

app.post("/api/orders", function (req, res) {
    console.log("Orders API called");

    const {
        customer_name,
        user_email,
        phone,
        address,
        city,
        state,
        pincode,
        payment_method,
        total_amount
    } = req.body;

    const order_date = new Date().toISOString();

    db.run(
        `INSERT INTO orders
        (customer_name, user_email, phone, address, city, state, pincode, payment_method, total_amount, order_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            customer_name,
            user_email,
            phone,
            address,
            city,
            state,
            pincode,
            payment_method,
            total_amount,
            order_date
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Order saved successfully!",
                orderId: this.lastID
            });
        }
    );
});
app.get("/api/all-orders", function (req, res) {

    db.all("SELECT * FROM orders", function (err, rows) {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(rows);

    });

});
app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});