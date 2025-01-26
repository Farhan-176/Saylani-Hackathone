const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Transporter Setup (Use your SMTP settings or a service like Gmail)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your app-specific password
  },
});

// Random Password Generator
function generateRandomPassword() {
  return crypto.randomBytes(6).toString("hex"); // Generates a 12-character random password
}

// Signup API
app.post("/signup", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required!" });
  }

  // Generate random password
  const randomPassword = generateRandomPassword();

  try {
    // Send email
    await transporter.sendMail({
      from: "Saylani Microfinance <your-email@gmail.com>", // Sender address
      to: email, // User's email
      subject: "Welcome to Saylani Microfinance!",
      text: `Hello ${name},\n\nThank you for signing up! Your login password is: ${randomPassword}\n\nPlease log in to your account and change your password.\n\nBest regards,\nSaylani Microfinance Team`,
    });

    // Return success response
    res.status(200).json({
      message: "Signup successful! Password has been sent to your email.",
      password: randomPassword, // Optional: for testing only
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
