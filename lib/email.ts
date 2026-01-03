import nodemailer from 'nodemailer';
import EmailLog from './models/EmailLog';
import dbConnect from './dbConnect';

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email template styling
const emailStyles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: #D4AF37; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #fff; padding: 30px; border: 2px solid #D4AF37; border-top: none; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: #333; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
    .info-box { background: #f9f9f9; border-left: 4px solid #D4AF37; padding: 15px; margin: 15px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    h1 { margin: 0; font-size: 28px; }
    h2 { color: #8B4513; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #666; }
    .detail-value { color: #333; }
  </style>
`;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
}

/**
 * Send email with retry logic
 */
async function sendEmail(options: EmailOptions, orderId?: string, orderReference?: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME || 'Bullify Kennel'} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments || [],
    };

    await transporter.sendMail(mailOptions);

    // Log email if order info provided
    if (orderId && orderReference) {
      await logEmail({
        orderId,
        orderReference,
        recipient: options.to,
        subject: options.subject,
        status: 'sent',
      });
    }

    return true;
  } catch (error) {
    console.error('Email send error:', error);

    // Log failed email
    if (orderId && orderReference) {
      await logEmail({
        orderId,
        orderReference,
        recipient: options.to,
        subject: options.subject,
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    return false;
  }
}

/**
 * Log email to database
 */
async function logEmail(data: {
  orderId: string;
  orderReference: string;
  recipient: string;
  subject: string;
  status: 'sent' | 'failed';
  errorMessage?: string;
}) {
  try {
    await dbConnect();
    await EmailLog.create({
      orderId: data.orderId,
      orderReference: data.orderReference,
      recipient: data.recipient,
      recipientName: data.recipient.split('@')[0],
      subject: data.subject,
      template: data.subject.includes('Confirmation') ? 'order_confirmation' : 'general',
      status: data.status,
      errorMessage: data.errorMessage,
    });
  } catch (error) {
    console.error('Email log error:', error);
  }
}

/**
 * Send Order Confirmation Email to Customer
 */
export async function sendOrderConfirmationEmail(order: any): Promise<boolean> {
  const html = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>🐕 Order Confirmed!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Thank you for choosing Bullify Kennel</p>
      </div>
      <div class="content">
        <p>Dear ${order.customerName},</p>
        <p>We're thrilled to confirm your puppy reservation! Here are your order details:</p>
        
        <div class="info-box">
          <h2>Order Information</h2>
          <div class="detail-row">
            <span class="detail-label">Order Reference:</span>
            <span class="detail-value"><strong>${order.orderReference}</strong></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Order Date:</span>
            <span class="detail-value">${new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div class="info-box">
          <h2>Puppy Details</h2>
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${order.puppyDetails.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Breed:</span>
            <span class="detail-value">${order.puppyDetails.breed}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Age:</span>
            <span class="detail-value">${order.puppyDetails.age}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Gender:</span>
            <span class="detail-value">${order.puppyDetails.gender}</span>
          </div>
        </div>

        <div class="info-box">
          <h2>Payment Summary</h2>
          <div class="detail-row">
            <span class="detail-label">Puppy Price:</span>
            <span class="detail-value">$${order.puppyDetails.price.toLocaleString()}</span>
          </div>
          ${order.deliveryFee > 0 ? `
          <div class="detail-row">
            <span class="detail-label">Delivery Fee:</span>
            <span class="detail-value">$${order.deliveryFee.toLocaleString()}</span>
          </div>
          ` : ''}
          <div class="detail-row">
            <span class="detail-label"><strong>Total Amount:</strong></span>
            <span class="detail-value"><strong>$${order.totalAmount.toLocaleString()}</strong></span>
          </div>
        </div>

        <h2>Next Steps</h2>
        <ol>
          <li>You will receive payment details within 24 hours</li>
          <li>Pay the deposit of $${order.depositAmount.toLocaleString()} (${order.depositPercentage}%)</li>
          <li>We'll prepare your puppy</li>
          <li>Pay the balance before delivery/pickup</li>
        </ol>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track-order?ref=${order.orderReference}" class="button">
            Track Your Order
          </a>
        </div>

        <p><strong>Questions?</strong> Reply to this email or contact us on WhatsApp at ${process.env.WHATSAPP_NUMBER || '+234XXXXXXXXX'}</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Bullify Kennel. All rights reserved.</p>
        <p>Premium Dachshund Puppies</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: order.customerEmail,
    subject: `Order Confirmed - ${order.orderReference}`,
    html,
  }, order._id.toString(), order.orderReference);
}

/**
 * Send New Order Alert to Admin
 */
export async function sendNewOrderAlertEmail(order: any): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  const html = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>🐕 New Order Received!</h1>
      </div>
      <div class="content">
        <p><strong>A new puppy reservation has been placed.</strong></p>
        
        <div class="info-box">
          <h2>Customer Information</h2>
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${order.customerName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${order.customerEmail}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${order.customerPhone}</span>
          </div>
        </div>

        <div class="info-box">
          <h2>Order Details</h2>
          <div class="detail-row">
            <span class="detail-label">Reference:</span>
            <span class="detail-value"><strong>${order.orderReference}</strong></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Puppy:</span>
            <span class="detail-value">${order.puppyDetails.name} - ${order.puppyDetails.breed}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Total Amount:</span>
            <span class="detail-value"><strong>$${order.totalAmount.toLocaleString()}</strong></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Delivery:</span>
            <span class="detail-value">${order.deliveryMethod.replace('_', ' ')}</span>
          </div>
        </div>

        ${order.customerNotes ? `
        <div class="info-box">
          <h2>Customer Notes</h2>
          <p>${order.customerNotes}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders/${order._id}" class="button">
            View Order Details
          </a>
        </div>
      </div>
      <div class="footer">
        <p>Bullify Kennel Admin Notification</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: adminEmail!,
    subject: `🐕 New Order - ${order.orderReference}`,
    html,
  }, order._id.toString(), order.orderReference);
}

/**
 * Send Payment Details Email to Customer
 */
export async function sendPaymentDetailsEmail(order: any, paymentInstructions: string, attachments?: any[]): Promise<boolean> {
  const html = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>💳 Payment Details</h1>
        <p style="margin: 10px 0 0 0;">Order ${order.orderReference}</p>
      </div>
      <div class="content">
        <p>Dear ${order.customerName},</p>
        <p>Your order is confirmed! Here are the payment details:</p>
        
        <div class="info-box" style="background: #fff3cd; border-left-color: #D4AF37;">
          <h2 style="margin-top: 0;">Deposit Amount</h2>
          <p style="font-size: 32px; font-weight: bold; color: #8B4513; margin: 10px 0;">
            $${order.depositAmount.toLocaleString()}
          </p>
          <p style="margin: 0; color: #666;">(${order.depositPercentage}% of total amount)</p>
        </div>

        <div class="info-box">
          <h2>Payment Instructions</h2>
          ${paymentInstructions}
        </div>

        <div class="info-box">
          <h2>After Payment</h2>
          <ol>
            <li>Take a screenshot of your payment confirmation</li>
            <li>Reply to this email with the screenshot</li>
            <li>We'll confirm receipt within 24 hours</li>
          </ol>
        </div>

        <p><strong>Payment Deadline:</strong> Please complete payment within 48 hours to secure your puppy.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track-order?ref=${order.orderReference}" class="button">
            Track Your Order
          </a>
        </div>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Bullify Kennel</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: order.customerEmail,
    subject: `Payment Details - ${order.orderReference}`,
    html,
    attachments,
  }, order._id.toString(), order.orderReference);
}

/**
 * Send Deposit Received Confirmation
 */
export async function sendDepositReceivedEmail(order: any): Promise<boolean> {
  const html = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>✅ Deposit Received!</h1>
        <p style="margin: 10px 0 0 0;">Order ${order.orderReference}</p>
      </div>
      <div class="content">
        <p>Dear ${order.customerName},</p>
        <p><strong>Great news!</strong> We've received your deposit payment.</p>
        
        <div class="info-box" style="background: #d4edda; border-left-color: #28a745;">
          <h2 style="margin-top: 0; color: #155724;">Payment Confirmed</h2>
          <div class="detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value"><strong>$${order.depositAmount.toLocaleString()}</strong></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${new Date(order.depositPaidDate).toLocaleDateString()}</span>
          </div>
        </div>

        <h2>Next Steps</h2>
        <ul>
          <li>✓ Your puppy is now reserved</li>
          <li>✓ We're preparing ${order.puppyDetails.name} for you</li>
          <li>Balance of $${order.balanceAmount.toLocaleString()} due before delivery</li>
          ${order.estimatedDeliveryDate ? `<li>Estimated ready date: ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</li>` : ''}
        </ul>

        <p>We'll keep you updated on ${order.puppyDetails.name}'s progress!</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track-order?ref=${order.orderReference}" class="button">
            Track Your Order
          </a>
        </div>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Bullify Kennel</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: order.customerEmail,
    subject: `Deposit Received - ${order.orderReference}`,
    html,
  }, order._id.toString(), order.orderReference);
}

/**
 * Send Custom Email to Customer
 */
export async function sendCustomEmail(
  order: any,
  message: string,
  subject: string,
  attachments?: any[]
): Promise<boolean> {
  const html = `
    ${emailStyles}
    <div class="container">
      <div class="header">
        <h1>Bullify Kennel</h1>
        <p style="margin: 10px 0 0 0;">Order ${order.orderReference}</p>
      </div>
      <div class="content">
        <p>Dear ${order.customerName},</p>
        ${message}
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track-order?ref=${order.orderReference}" class="button">
            Track Your Order
          </a>
        </div>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Bullify Kennel</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: order.customerEmail,
    subject,
    html,
    attachments,
  }, order._id.toString(), order.orderReference);
}

export default {
  sendOrderConfirmationEmail,
  sendNewOrderAlertEmail,
  sendPaymentDetailsEmail,
  sendDepositReceivedEmail,
  sendCustomEmail,
};
