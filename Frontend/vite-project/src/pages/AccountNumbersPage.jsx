import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Check } from 'lucide-react';

const AccountsManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingAccount, setAddingAccount] = useState(false);

  // Fetch all accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounts/all');
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
      } else {
        console.error('Failed to fetch accounts');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async () => {
    if (!newAccountNumber.trim()) return;

    try {
      setAddingAccount(true);
      const response = await fetch('/api/accounts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber: newAccountNumber.trim() }),
      });

      if (response.ok) {
        const newAccount = await response.json();
        setAccounts(prev => [...prev, newAccount]);
        setNewAccountNumber('');
        setShowAddForm(false);
      } else {
        console.error('Failed to add account');
      }
    } catch (error) {
      console.error('Error adding account:', error);
    } finally {
      setAddingAccount(false);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      const response = await fetch('/api/accounts/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });

      if (response.ok) {
        setAccounts(prev => prev.filter(account => account.id !== accountId));
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddAccount();
    } else if (e.key === 'Escape') {
      setShowAddForm(false);
      setNewAccountNumber('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Account Management</h1>
              <p className="text-gray-600 mt-2">Manage your account numbers</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              title="Add New Account"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Add Account Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Account</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewAccountNumber('');
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={newAccountNumber}
                onChange={(e) => setNewAccountNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter account number"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                autoFocus
              />
              <button
                onClick={handleAddAccount}
                disabled={!newAccountNumber.trim() || addingAccount}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                {addingAccount ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Check size={18} />
                )}
                OK
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Press Enter to add or Escape to cancel</p>
          </div>
        )}

        {/* Accounts List */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Accounts ({accounts.length})
          </h2>
          
          {accounts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No accounts found</p>
              <p className="text-gray-400 text-sm">Click the + button to add your first account</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {accounts.map((account, index) => (
                <div
                  key={account.id || index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {String(account.accountNumber || account.number || '').charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-lg font-medium text-gray-800">
                        {account.accountNumber || account.number || account}
                      </p>
                      <p className="text-sm text-gray-500">Account #{index + 1}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAccount(account.id || index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                    title="Delete Account"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsManager;