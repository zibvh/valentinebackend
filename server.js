const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TRUTH FORM
app.post("/send-truth", async (req, res) => {
  const { message } = req.body;

  try {
    await sendEmail("Truth Form 💌", message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// MESSAGE FORM
app.post("/send-message", async (req, res) => {
  const { message } = req.body;

  try {
    await sendEmail("Private Message 💕", message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: text
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
