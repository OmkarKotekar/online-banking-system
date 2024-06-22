// pages/api/register.js
import { connectToDatabase } from '../../lib/db';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { account, name, password, email, contact } = req.body;

    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('account');
        const last_id = await collection.countDocuments();

        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: (last_id + 1),
            account: parseInt(account),
            name,
            password: hashedPassword, // Store hashed password instead of plain text
            email,
            contact,
            balance: 1000,
        };

        const result = await collection.insertOne(newUser);
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
