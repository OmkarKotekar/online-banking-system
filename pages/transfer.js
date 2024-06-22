import { useState } from 'react';

export default function Transfer() {
    const [accFrom, setAccFrom] = useState('');
    const [accTo, setAccTo] = useState('');
    const [amount, setAmount] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const handleTransfer = async () => {
        try {
            const response = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderAccount: accFrom,
                    receiverAccount: accTo,
                    amount: parseFloat(amount), // Ensure amount is parsed as float
                }),
            });

            if (response.ok) {
                // Handle success
                alert('Transfer successful');
            } else {
                // Handle error
                alert('Transfer failed');
            }
        } catch (error) {
            console.error('Error during transfer:', error);
            alert('An error occurred during transfer');
        }
    };

    const handleScheduledTransfer = async () => {
        alert('Scheduled Transfer functionality not implemented');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Thakur Bank Transfer Portal</h1>
                <div className="space-y-4">
                    <label htmlFor="txtAccFrom" className="block font-medium">Account From:</label>
                    <input type="text" id="txtAccFrom" value={accFrom} onChange={(e) => setAccFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />

                    <label htmlFor="txtAccTo" className="block font-medium">Account To:</label>
                    <input type="text" id="txtAccTo" value={accTo} onChange={(e) => setAccTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />

                    <label htmlFor="txtAmount" className="block font-medium">Amount:</label>
                    <input type="number" id="txtAmount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />

                    <label htmlFor="scheduledTime" className="block font-medium">Scheduled Time:</label>
                    <input type="datetime-local" id="scheduledTime" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />

                    <div className="flex justify-between">
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none" onClick={handleTransfer}>Transfer</button>
                        <button className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none" onClick={handleScheduledTransfer}>Scheduled Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
