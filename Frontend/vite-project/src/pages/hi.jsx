import React, { useState, useEffect } from 'react';
import { User, CreditCard, Upload, History, Plus, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Dummy data for testing
  const dummyTransactions = [
    {
      id: '1',
      date: '25/06/25',
      accountNumber: '9155987876541815',
      toFrom: 'SANCHIT ARORA',
      creditedDebited: 'debited',
      amount: 500,
      referenceNumber: '545969304417'
    },
    {
      id: '2',
      date: '24/06/25',
      accountNumber: 'XXXXXXXXXXXXXXXX',
      toFrom: 'Cash',
      creditedDebited: 'credited',
      amount: 1000,
      referenceNumber: 'cash'
    },
    {
      id: '3',
      date: '23/06/25',
      accountNumber: '9155987876541815',
      toFrom: 'RAHUL SHARMA',
      creditedDebited: 'credited',
      amount: 750,
      referenceNumber: '987654321123'
    }
  ];

  useEffect(() => {
    setTransactions(dummyTransactions);
  }, []);

  // Backend API calls (commented out for demo)
  /*
  Backend Routes needed:
  
  1. POST /api/auth/signup
     Controller: authController.signup
     Returns: { success: true, message: "User created successfully", userId: "uuid" }
  
  2. POST /api/auth/login  
     Controller: authController.login
     Returns: { success: true, user: { id: "uuid", username: "string" }, token: "jwt_token" }
  
  3. GET /api/transactions/:userId
     Controller: transactionController.getUserTransactions
     Returns: { success: true, transactions: [array of transaction objects] }
  
  4. POST /api/transactions/add
     Controller: transactionController.addTransaction
     Returns: { success: true, message: "Transaction added successfully" }
  */

  const handleLogin = async (username, password) => {
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    
    // Dummy login for demo
    setUser({ id: '123456791', username: username });
    setCurrentPage('home');
  };

  const handleSignup = async (username, password, confirmPassword) => {
    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password, confirmPassword })
    // });
    // const data = await response.json();
    
    // Dummy signup for demo
    setUser({ id: '123456791', username: username });
    setCurrentPage('home');
  };

  const handleAddCash = async (formData) => {
    // const response = await fetch('/api/transactions/add', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: user.id,
    //     accountNumber: 'XXXXXXXXXXXXXXXX',
    //     creditedDebited: formData.creditedDebited,
    //     amount: formData.amount,
    //     date: formData.date,
    //     referenceNumber: 'cash', // Backend will generate UUID
    //     toFrom: 'Cash'
    //   })
    // });
    
    // Dummy add for demo
    const newTransaction = {
      id: Date.now().toString(),
      date: formData.date,
      accountNumber: 'XXXXXXXXXXXXXXXX',
      toFrom: 'Cash',
      creditedDebited: formData.creditedDebited,
      amount: formData.amount,
      referenceNumber: 'cash'
    };
    setTransactions([newTransaction, ...transactions]);
    setCurrentPage('home');
  };

  const fetchTransactions = async () => {
    // const response = await fetch(`/api/transactions/${user.id}`);
    // const data = await response.json();
    // setTransactions(data.transactions);
    
    // Using dummy data for demo
    setTransactions(dummyTransactions);
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Payment Dashboard</h1>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-600">Welcome, {user.username}!</span>
                <button
                  onClick={() => setUser(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <LogIn size={16} />
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setCurrentPage('addCash')}
                className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
              >
                <Plus size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Add Cash</h3>
                <p className="text-green-100">Add cash transactions</p>
              </div>

              <div
                onClick={() => setCurrentPage('upload')}
                className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
              >
                <Upload size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Transactions</h3>
                <p className="text-blue-100">Upload transaction files</p>
              </div>

              <div
                onClick={() => {
                  fetchTransactions();
                  setCurrentPage('history');
                }}
                className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
              >
                <History size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment History</h3>
                <p className="text-purple-100">View all transactions</p>
              </div>

              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-xl text-white">
                <CreditCard size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Balance</h3>
                <p className="text-orange-100">Current balance info</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <User size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Welcome to Payment Manager</h2>
              <p className="text-gray-500 mb-6">Please login or signup to continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(formData.username, formData.password);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Login
            </button>
          </div>
          
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    );
  };

  const SignupPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

    const handleSubmitSignup = () => {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      handleSignup(formData.username, formData.password, formData.confirmPassword);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
            
            <button
              type="button"
              onClick={handleSubmitSignup}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
            >
              Sign Up
            </button>
          </div>
          
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    );
  };

  const AddCashPage = () => {
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
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Cash Transaction</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="DD/MM/YY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select
                  value={formData.creditedDebited}
                  onChange={(e) => setFormData({...formData, creditedDebited: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Add Cash Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentHistoryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Payment History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Account Number</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">To/From</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Reference</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">{transaction.date}</td>
                    <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                      {transaction.accountNumber === 'XXXXXXXXXXXXXXXX' ? 'Cash Account' : transaction.accountNumber}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">{transaction.toFrom}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.creditedDebited === 'credited'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.creditedDebited}
                      </span>
                    </td>
                    <td className={`border border-gray-200 px-4 py-3 font-semibold ${
                      transaction.creditedDebited === 'credited' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ₹{transaction.amount}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                      {transaction.referenceNumber}
                    </td>
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

  const UploadPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Upload Transactions</h2>
          
          <div className="text-center py-12">
            <Upload size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Transaction upload functionality</p>
            <p className="text-sm text-gray-500">Feature already implemented - no need to recreate</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
      {currentPage === 'addCash' && <AddCashPage />}
      {currentPage === 'history' && <PaymentHistoryPage />}
      {currentPage === 'upload' && <UploadPage />}
    </div>
  );
};

export default App;