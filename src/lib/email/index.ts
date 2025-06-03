import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[]
  subject: string
  html?: string
  text?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to,
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email service error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function sendWelcomeEmail(email: string, name?: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Next.js Full-Stack App!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Welcome${name ? `, ${name}` : ''}!</h1>
        <p style="color: #666; font-size: 16px;">
          Thank you for signing up for our Next.js Full-Stack Application.
        </p>
        <p style="color: #666; font-size: 16px;">
          You can now access all features including:
        </p>
        <ul style="color: #666; font-size: 16px;">
          <li>Todo management with priorities and due dates</li>
          <li>Real-time synchronization across devices</li>
          <li>Secure authentication and data protection</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.AUTH_URL}/dashboard" 
             style="background-color: #007bff; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Get Started
          </a>
        </div>
        <p style="color: #999; font-size: 14px; text-align: center;">
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `,
    text: `
      Welcome${name ? `, ${name}` : ''}!
      
      Thank you for signing up for our Next.js Full-Stack Application.
      
      You can now access all features including:
      - Todo management with priorities and due dates
      - Real-time synchronization across devices
      - Secure authentication and data protection
      
      Get started: ${process.env.AUTH_URL}/dashboard
      
      If you didn't create this account, you can safely ignore this email.
    `,
  })
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.AUTH_URL}/reset-password?token=${resetToken}`
  
  return sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
        <p style="color: #666; font-size: 16px;">
          You requested to reset your password. Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 16px;">
          This link will expire in 1 hour for security reasons.
        </p>
        <p style="color: #999; font-size: 14px; text-align: center;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>
      </div>
    `,
    text: `
      Reset Your Password
      
      You requested to reset your password. Use the link below to set a new password:
      ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request this password reset, you can safely ignore this email.
    `,
  })
}