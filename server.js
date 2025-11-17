import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import generatePDF from './generate-pdf.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// POST endpoint
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;
  try {
    const pdfPath = generatePDF(name);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"GlowBeauty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Free Guide is Here!',
      text: `Hi ${name}, your guide is attached.`,
      attachments: [{ filename: 'guide.pdf', path: pdfPath }]
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
