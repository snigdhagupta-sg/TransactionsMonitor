import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const AddCashPage = ({ handleAddCash, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('en-GB'),
    creditedDebited: 'credited',
    amount: ''
  });

  const handleSubmitCash = () => {
    handleAddCash(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Cash Transaction</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="DD/MM/YY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                value={formData.creditedDebited}
                onChange={(e) => setFormData({ ...formData, creditedDebited: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="credited">Credited</option>
                <option value="debited">Debited</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                required
                min="1"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Transaction Details:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Account Number: XXXXXXXXXXXXXXXX (Cash Account)</li>
                <li>• To/From: Cash</li>
                <li>• Reference: Will be auto-generated</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleSubmitCash}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Add Cash Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCashPage;
