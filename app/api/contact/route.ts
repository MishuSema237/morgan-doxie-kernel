import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, inquiryType, message, agreeToTerms } = body;

        if (!name || !email || !subject || !message || !agreeToTerms) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a transporter using existing env vars
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Send to admin
            replyTo: email,
            subject: `New Contact Inquiry: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">New Contact Inquiry from Bullify Kennel Website</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 5px solid #D4AF37;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            This email was sent from the contact form on Bullify Kennel.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
