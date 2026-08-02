const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

// Environment Variables
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

// Home Page
app.get("/", (req, res) => {
    res.render("index", {
        success: null,
        error: null
    });
});

// Registration
app.post("/register", async (req, res) => {

    const { name, email, contact } = req.body;

    try {

        const response = await axios.post(
            `${BACKEND_URL}/register`,
            {
                name,
                email,
                contact
            }
        );

        res.render("index", {
            success: response.data.message,
            error: null
        });

    } catch (error) {

        console.error(error.message);

        res.render("index", {
            success: null,
            error: "Unable to register. Please try again."
        });

    }

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
    console.log(`Backend URL: ${BACKEND_URL}`);
});