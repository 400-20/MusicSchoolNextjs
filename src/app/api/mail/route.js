import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
  }

  // Create a transporter object using SMTP transport with SSL
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL port
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from environment variables
      pass: process.env.EMAIL_PASS, // Your Gmail app-specific password from environment variables
    },
  });

  // Email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'as77468@gmail.com',
    subject: 'This is the subject',
    text: `this message is sent by ${email}\n${message}` ,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
