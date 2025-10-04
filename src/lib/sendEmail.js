import nodemailer from 'nodemailer';
import {
  emailHost,
  emailPort,
  emailAddress,
  emailPass,
  emailFrom
} from '../core/config/config.js';

const sendEmail = async ({ to, subject, templateData }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: false,
      auth: {
        user: emailAddress,
        pass: emailPass
      }
    });
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template - 100X Mindset</title>
            <style>
                body { background-color: #ffffff ; color: #1a1a1a; font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; }
                .header { padding: 20px; background: linear-gradient(90deg, #ff00ff, #00ffff); }
                .header img { max-width: 150px; }
                .content { padding: 20px; background-color: #ffffff; border-radius: 10px; margin-top: 20px; }
                .footer { padding: 10px; font-size: 12px; color: #ccc; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://via.placeholder.com/150" alt="100X Mindset Logo" style="display:none;">
                    <h1>100X Mindset</h1>
                </div>
                <div class="content">
                    <h2>Contact Form Submission</h2>
                    <p>Dear ${templateData.name},</p>
                    <p>Thank you for reaching out! Here is your verification code:</p>
                    <p><strong>${templateData.otp}</strong></p>
                    <p>Please use this code to verify your submission. If you have any questions, feel free to reply to this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2025, 100X Mindset. All rights reserved.</p>
                    <p>Follow us: <a href="https://www.facebook.com/share/1G1ZGUv69B/">Facebook</a> | <a href="https://www.instagram.com/100xmindset_official">Instagram</a> | <a href="https://www.youtube.com/@100xmindset_official">YouTube</a> | <a href="https://x.com/100xmindset">Twitter</a> | <a href="https://wa.me/971509771249">WhatsApp</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
      from: emailFrom,
      to,
      subject,
      html: template
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
