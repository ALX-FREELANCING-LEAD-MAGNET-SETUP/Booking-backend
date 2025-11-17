// generate-pdf.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function generatePDF(name) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const filePath = path.join(__dirname, 'public', 'guide.pdf'); // fixed filename

  doc.pipe(fs.createWriteStream(filePath));

  // Header / Branding
  doc.fillColor('#ff6b6b').fontSize(26).text('GlowBeauty Studios Lead Magnet', { align: 'center' });
  doc.moveDown(1);

  // Personalized greeting
  doc.fillColor('#333').fontSize(16).text(`Hello ${name},`);
  doc.fontSize(12).text('Thank you for signing up! This guide will help you streamline your appointment system and increase bookings.', { lineGap: 6 });
  doc.moveDown(1);

  // Checklist
  doc.fontSize(16).fillColor('#ff6b6b').text('Checklist for Improving Bookings', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#333').list([
    'Set up an online booking system.',
    'Ensure mobile responsiveness.',
    'Send automated confirmation emails.',
    'Track appointments in a simple dashboard.',
    'Follow up with clients after appointments.'
  ], { bulletRadius: 2 });

  // Tips
  doc.moveDown(1);
  doc.fontSize(16).fillColor('#ff6b6b').text('Tips for Enhancing User Experience', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#333').list([
    'Keep the booking process simple.',
    'Show available time slots clearly.',
    'Include clear instructions and contact info.',
    'Use engaging visuals for services.',
    'Offer incentives for online bookings.'
  ]);

  // Case Study
  doc.moveDown(1);
  doc.fontSize(16).fillColor('#ff6b6b').text('Example Case Study: GlowBeauty Studios', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#333').text('GlowBeauty Studios implemented a modern booking system that improved efficiency and increased customer satisfaction. Apply these tips to achieve similar results.', { lineGap: 6 });

  // Closing
  doc.moveDown(1);
  doc.fontSize(12).fillColor('#333').text('Thank you for downloading! Your success is our goal.', { align: 'center' });

  doc.end();

  return filePath;
}
