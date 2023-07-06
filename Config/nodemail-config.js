import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

  // ----------mail transporter----------------
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NodeMailer_Mail,
      pass: process.env.NodeMailer_Pass,
    },
  });
