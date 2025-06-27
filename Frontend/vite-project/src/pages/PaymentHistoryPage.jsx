import React from 'react';
import { ArrowLeft, History } from 'lucide-react';

const PaymentHistoryPage = ({ transactions, setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-6">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-3 text-left font-semibold">Date</th>
                <th className="border px-4 py-3 text-left font-semibold">Account Number</th>
                <th className="border px-4 py-3 text-left font-semibold">To/From</th>
                <th className="border px-4 py-3 text-left font-semibold">Type</th>
                <th className="border px-4 py-3 text-left font-semibold">Amount</th>
                <th className="border px-4 py-3 text-left font-semibold">Reference</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{t.date}</td>
                  <td className="border px-4 py-3 font-mono text-sm">
                    {t.accountNumber === 'XXXXXXXXXXXXXXXX' ? 'Cash Account' : t.accountNumber}
                  </td>
                  <td className="border px-4 py-3">{t.toFrom}</td>
                  <td className="border px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      t.creditedDebited === 'credited'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t.creditedDebited}
                    </span>
                  </td>
                  <td className={`border px-4 py-3 font-semibold ${
                    t.creditedDebited === 'credited' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{t.amount}
                  </td>
                  <td className="border px-4 py-3 font-mono text-sm">{t.referenceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <History size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PaymentHistoryPage;
