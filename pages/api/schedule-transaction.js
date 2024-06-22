// pages/api/schedule-transaction.js
import { connectToDatabase } from '../../lib/db';
import schedule from 'node-schedule';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { senderAccount, receiverAccount, amount, scheduledTime } = req.body;

    if (!senderAccount || !receiverAccount || !amount || !scheduledTime) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    const { db } = await connectToDatabase();

    const scheduledDate = new Date(scheduledTime);

    schedule.scheduleJob(scheduledDate, async () => {
        try {
            const collection = db.collection('account');

            const sender = await collection.findOne({ account: parseInt(senderAccount) });
            const receiver = await collection.findOne({ account: parseInt(receiverAccount) });

            if (!sender || !receiver) {
                console.error('Sender or receiver account not found');
                return;
            }

            if (sender.balance < amount) {
                console.error('Insufficient balance');
                return;
            }

            await collection.updateOne(
                { account: parseInt(senderAccount) },
                { $inc: { balance: -amount } }
            );

            await collection.updateOne(
                { account: parseInt(receiverAccount) },
                { $inc: { balance: amount } }
            );

            const transactionCollection = db.collection('transaction');
            await transactionCollection.insertMany([
                { accfrom: parseInt(senderAccount), accto: parseInt(receiverAccount), amt: -amount, balance: sender.balance - amount },
                { accfrom: parseInt(senderAccount), accto: parseInt(receiverAccount), amt: amount, balance: receiver.balance + amount },
            ]);

            console.log('Scheduled transfer executed successfully');
        } catch (error) {
            console.error('Error executing scheduled transfer:', error);
        }
    });

    res.status(200).json({ message: 'Transaction scheduled successfully' });
}
