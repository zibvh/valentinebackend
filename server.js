const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to create transporter at runtime
function createTransporter() {
  // Check if environment variables exist
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not set - email functionality will not work");
    return null;
  }
  
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// TRUTH FORM
app.post("/send-truth", async (req, res) => {
  const { message } = req.body;
  
  const transporter = createTransporter();
  if (!transporter) {
    return res.status(500).json({ 
      success: false, 
      error: "Email service not configured" 
    });
  }
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Truth Form 💌",
      text: message
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// MESSAGE FORM
app.post("/send-message", async (req, res) => {
  const { message } = req.body;
  
  const transporter = createTransporter();
  if (!transporter) {
    return res.status(500).json({ 
      success: false, 
      error: "Email service not configured" 
    });
  }
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Private Message 💕",
      text: message
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint (useful for Railway)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Valentine backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));