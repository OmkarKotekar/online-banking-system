import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { senderAccount, receiverAccount, amount } = req.body;

    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('account');

        const parsedSenderAccount = parseInt(senderAccount);
        const parsedReceiverAccount = parseInt(receiverAccount);
        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedSenderAccount) || isNaN(parsedReceiverAccount) || isNaN(parsedAmount)) {
            return res.status(400).json({ error: 'Invalid account number or amount' });
        }

        const sender = await collection.findOne({ account: parsedSenderAccount });
        const receiver = await collection.findOne({ account: parsedReceiverAccount });

        if (!sender || !receiver) {
            return res.status(404).json({ error: 'Sender or receiver account not found' });
        }

        if (sender.balance < parsedAmount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        await collection.updateOne(
            { account: parsedSenderAccount },
            { $inc: { balance: -parsedAmount } }
        );

        await collection.updateOne(
            { account: parsedReceiverAccount },
            { $inc: { balance: parsedAmount } }
        );

        const transactionCollection = db.collection('transaction');
        await transactionCollection.insertMany([
            {acc: parsedSenderAccount, accfrom: parsedSenderAccount, accto: parsedReceiverAccount, amt: -parsedAmount, balance: sender.balance - parsedAmount },
            {acc:parsedReceiverAccount, accfrom: parsedSenderAccount, accto: parsedReceiverAccount, amt: parsedAmount, balance: receiver.balance + parsedAmount },
        ]);

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
