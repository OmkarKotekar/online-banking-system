import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { account } = req.body;

  const { db } = await connectToDatabase();

  try {
    const collection = db.collection('account');
    const accountDetails = await collection.findOne({ account: parseInt(account) });

    if (!accountDetails) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    res.status(200).json({ success: true, details: accountDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
