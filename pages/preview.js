import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Preview = ({ transactions, accountNumber }) => {
  const [accountDetails, setAccountDetails] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await fetch('/api/details', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account: accountNumber }),
        });
        const data = await res.json();
        if (data.success) {
          setAccountDetails(data.details);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, [accountNumber]);

  const printTable = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center mt-5 p-10">
      <h2 className="text-2xl font-semibold mb-5">Thakur Bank</h2>
      {accountDetails ? (
        <div className="text-left w-full max-w-4xl">
          <table className="table-auto w-full border-collapse border border-gray-200 mb-5">
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Account Number</td>
                <td className="border border-gray-200 px-4 py-2">{accountNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Name</td>
                <td className="border border-gray-200 px-4 py-2">{accountDetails.name}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Email</td>
                <td className="border border-gray-200 px-4 py-2">{accountDetails.email}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Contact</td>
                <td className="border border-gray-200 px-4 py-2">{accountDetails.contact}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Balance</td>
                <td className="border border-gray-200 px-4 py-2">{accountDetails.balance}</td>
              </tr>
            </tbody>
          </table>
      </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="text-left w-full max-w-4xl">
        {transactions.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 mb-5">
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
      
      <div className="flex space-x-4 mt-5">
        <button
          className="bg-[#001F66] text-white p-2 rounded-md hover:bg-[#001244] no-print"
          onClick={printTable}
        >
          Download Bank Statement
        </button>
      </div>
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

Preview.getInitialProps = async ({ query }) => {
  const { accountNumber, transactions } = query;
  return { accountNumber, transactions: JSON.parse(transactions) };
};

export default Preview;
