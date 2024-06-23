import React, { useState } from 'react';
import { useRouter } from 'next/router';

const History = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const displayData = async () => {
    try {
      const res = await fetch('/api/statement', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account: accountNumber }),
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const redirectToPreview = () => {
    router.push({
      pathname: '/preview',
      query: { accountNumber, transactions: JSON.stringify(transactions) }
    });
  };

  return (
    <div className="flex flex-col items-center mt-5 p-10">
      <h2 className="text-2xl font-semibold mb-5">Transaction History</h2>
      <div className="mb-4">
        <label htmlFor="accfrom" className="mr-2">Enter Account Number:</label>
        <input 
          className="border-2 border-gray-400 rounded-md p-2" 
          type="text" 
          name="accfrom" 
          id="accfrom" 
          value={accountNumber}
          onChange={handleChange}
        />
      </div>
      <div className="flex space-x-4 mb-5">
        <button 
          className="bg-[#001F66] text-white p-2 rounded-md hover:bg-[#001244]" 
          onClick={displayData}
        >
          Display
        </button>
        <button 
          className="bg-[#001F66] text-white p-2 rounded-md hover:bg-[#001244]" 
          onClick={redirectToPreview}
        >
          Download Bank Statement
        </button>
      </div>
      <div className="text-left w-full max-w-4xl">
        {transactions.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">From</th>
                <th className="border border-gray-200 px-4 py-2">To</th>
                <th className="border border-gray-200 px-4 py-2">Amount</th>
                <th className="border border-gray-200 px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">{transaction.accfrom}</td>
                  <td className="border border-gray-200 px-4 py-2">{transaction.accto}</td>
                  <td className="border border-gray-200 px-4 py-2">{transaction.amt}</td>
                  <td className="border border-gray-200 px-4 py-2">{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found for this account number.</p>
        )}
      </div>
    </div>
  );
};

export default History;
