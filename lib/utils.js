import nodemailer from 'nodemailer';
import dbConnect from './db';

/**
 * Generate a random 6-digit OTP
 */
export function otpGenerator() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP to the user's email
 * @param {String} email - User's email address
 * @param {String} otp - OTP to be sent
 */
export async function sendOtpEmail(email, otp) {
    try {
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
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent with OTP');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

/**
 * Verify OTP provided by the user
 * @param {String} email - User's email address
 * @param {String} otp - OTP provided by the user
 * @returns {Boolean} - True if OTP is valid, false otherwise
 */
export async function verifyOtp(email, otp) {
    await dbConnect();
    try {
        
        const user = await User.findOne({ email });
        
        if (!user) {
            throw new Error('User not found');
        }

        if (user.otp === otp) {
            // Clear OTP after successful verification
            user.otp = '';
            await user.save();
            return true;
        } else {
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('Failed to verify OTP');
    }
}
