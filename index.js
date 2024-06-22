import dotenv from "dotenv";
import express from "express";
import Apiroute from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for your API
app.use("/api", Apiroute);

// Simple route for testing
app.get('/', (req, res) => {
    res.send("Hey, this is me");
});

// Environment variable for port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
