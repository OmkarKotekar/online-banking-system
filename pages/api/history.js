// pages/api/history.js
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { account } = req.body;

    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('transaction');
        const transactions = await collection.find({ accfrom: parseInt(account) }).toArray();

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
