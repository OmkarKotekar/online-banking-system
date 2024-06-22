import { connectToDatabase } from '../../lib/db';
import nodemailer from 'nodemailer';

let otpStore = {}; // Temporary in-memory storage for OTPs. Replace with a database in a production environment.

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, sent, otp } = req.body;
      const { db } = await connectToDatabase();
      const accountsCollection = db.collection('account'); // Assuming your collection is named 'accounts'

      const ifexist = await accountsCollection.findOne({ email: email });

      if (ifexist) {
        if (sent) {
          // Generate a random 6-digit OTP
          const genotp = Math.floor(1000 + Math.random() * 9000).toString();

          // Store the OTP temporarily (consider using a database for persistence)
          otpStore[email] = genotp;

          // Set a timeout to clear the OTP after a certain period (e.g., 10 minutes)
          setTimeout(() => delete otpStore[email], 10 * 60 * 1000);

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL, // Replace with your Gmail address
              pass: process.env.GMAIL_PASS, // Replace with your Gmail password
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for Login to Bank Website is: ${genotp}`,
          };

          await transporter.sendMail(mailOptions);

          console.log('Email sent with OTP');
          return res.status(200).json({ success: true, message: 'OTP sent to email' });
        } else if (otp) {
          // Verify OTP
          if (otpStore[email] && otpStore[email] === otp) {
            delete otpStore[email]; // Clear OTP after successful verification
            return res.status(200).json({ success: true, message: 'OTP verified successfully' });
          } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
          }
        } else {
          // No action needed
          return res.status(200).json({ success: true });
        }
      } else {
        console.log(req.body.email)
        console.log('Invalid Email');
        return res.status(400).json({ success: false, message: 'Email not found' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
