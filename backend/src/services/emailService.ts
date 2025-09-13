import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  template: string;
  data: any;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const templates = {
  emailVerification: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verify Your Email - MindSpace</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to MindSpace!</h1>
            <p>Your mental wellness journey starts here</p>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>Thank you for joining MindSpace! To complete your registration and start your wellness journey, please verify your email address.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${data.verificationLink}" class="button">Verify Email Address</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${data.verificationLink}</p>
            <p>This link will expire in 24 hours for security reasons.</p>
            <p>If you didn't create an account with MindSpace, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 MindSpace. All rights reserved.</p>
            <p>This email was sent to ${data.to}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to MindSpace!
      
      Hi ${data.name},
      
      Thank you for joining MindSpace! To complete your registration and start your wellness journey, please verify your email address.
      
      Click this link to verify your email: ${data.verificationLink}
      
      This link will expire in 24 hours for security reasons.
      
      If you didn't create an account with MindSpace, please ignore this email.
      
      © 2024 MindSpace. All rights reserved.
    `
  }),

  passwordReset: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password - MindSpace</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
            <p>MindSpace Account Security</p>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>We received a request to reset your password for your MindSpace account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${data.resetLink}" class="button">Reset Password</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #e74c3c;">${data.resetLink}</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>© 2024 MindSpace. All rights reserved.</p>
            <p>This email was sent to ${data.to}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Password Reset Request - MindSpace
      
      Hi ${data.name},
      
      We received a request to reset your password for your MindSpace account.
      
      Click this link to reset your password: ${data.resetLink}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      
      © 2024 MindSpace. All rights reserved.
    `
  }),

  welcome: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to MindSpace!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .feature { margin: 20px 0; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #667eea; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to MindSpace!</h1>
            <p>Your mental wellness journey starts now</p>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>Welcome to MindSpace! We're excited to have you join our community of people committed to mental wellness.</p>
            
            <h3>Here's what you can do on MindSpace:</h3>
            
            <div class="feature">
              <h4>📊 Track Your Mood</h4>
              <p>Log your daily mood and emotions to identify patterns and triggers.</p>
            </div>
            
            <div class="feature">
              <h4>🧘 Guided Activities</h4>
              <p>Access meditation, breathing exercises, and mindfulness practices.</p>
            </div>
            
            <div class="feature">
              <h4>👥 Community Support</h4>
              <p>Connect with others on similar wellness journeys in our supportive community.</p>
            </div>
            
            <div class="feature">
              <h4>📚 Learning Resources</h4>
              <p>Access educational content and tools to support your mental health.</p>
            </div>
            
            <a href="${process.env.CLIENT_URL}/dashboard" class="button">Start Your Journey</a>
            
            <p>If you have any questions or need support, don't hesitate to reach out to our team.</p>
          </div>
          <div class="footer">
            <p>© 2024 MindSpace. All rights reserved.</p>
            <p>This email was sent to ${data.to}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to MindSpace!
      
      Hi ${data.name},
      
      Welcome to MindSpace! We're excited to have you join our community of people committed to mental wellness.
      
      Here's what you can do on MindSpace:
      
      📊 Track Your Mood - Log your daily mood and emotions to identify patterns and triggers.
      🧘 Guided Activities - Access meditation, breathing exercises, and mindfulness practices.
      👥 Community Support - Connect with others on similar wellness journeys in our supportive community.
      📚 Learning Resources - Access educational content and tools to support your mental health.
      
      Start your journey: ${process.env.CLIENT_URL}/dashboard
      
      If you have any questions or need support, don't hesitate to reach out to our team.
      
      © 2024 MindSpace. All rights reserved.
    `
  })
};

// Send email function
export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    const transporter = createTransporter();
    const template = templates[emailData.template as keyof typeof templates];
    
    if (!template) {
      throw new Error(`Email template '${emailData.template}' not found`);
    }

    const emailContent = template(emailData.data);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${emailData.to}`);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send bulk emails
export const sendBulkEmail = async (emails: EmailData[]): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    for (const emailData of emails) {
      const template = templates[emailData.template as keyof typeof templates];
      
      if (!template) {
        console.error(`Email template '${emailData.template}' not found for ${emailData.to}`);
        continue;
      }

      const emailContent = template(emailData.data);

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: emailData.to,
        subject: emailData.subject,
        html: emailContent.html,
        text: emailContent.text
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${emailData.to}`);
    }
  } catch (error) {
    console.error('Bulk email sending error:', error);
    throw error;
  }
};


