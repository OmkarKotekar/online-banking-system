// pages/api/login.js
import { connectToDatabase } from '../../lib/db';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with your actual secret key
const expiresIn = '1h'; // Adjust expiresIn as per your requirements

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('account');
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Compare hashed password with input password using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = sign({ email: user.email }, secretKey, { expiresIn });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
