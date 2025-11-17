import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import generatePDF from "./generate-pdf.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint
app.post("/submit", async (req, res) => {
  const { name, email } = req.body;

  try {
    const pdfStream = generatePDF(name);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"GlowBeauty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Free GlowBeauty Guide",
      text: `Hi ${name}, here is your downloadable guide.`,
      attachments: [
        {
          filename: "guide.pdf",
          content: pdfStream
        }
      ]
    });

    res.status(200).json({ message: "Email sent successfully" });

  } catch (err) {
    console.error("Email Send Error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
