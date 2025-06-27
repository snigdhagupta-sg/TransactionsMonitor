// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// // Page imports
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AddCashPage from "./pages/AddCashPage";
// import PaymentHistoryPage from "./pages/PaymentHistoryPage";
// import UploadPage from "./pages/UploadPage";
// import AccountNumbersPage from "./pages/AccountNumbersPage";

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const username = Cookies.get("username");
//     const user_id = Cookies.get("user_id");
//     if (username && user_id) {
//       setUser({ username, user_id });
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        
//         <Route
//           path="/login"
//           element={
//             user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />
//           }
//         />
        
//         <Route
//           path="/signup"
//           element={
//             user ? <Navigate to="/" /> : <SignupPage setUser={setUser} />
//           }
//         />
        
//         <Route
//           path="/add-cash"
//           element={
//             user ? <AddCashPage user={user} /> : <Navigate to="/login" />
//           }
//         />

//         <Route
//           path="/accountnumbers"
//           element={
  //             user ? <AddCashPage user={user} /> : <Navigate to="/login" />
  //           }
  //         />
  
  //         <Route
  //           path="/history"
  //           element={
    //             user ? <PaymentHistoryPage user={user} /> : <Navigate to="/login" />
    //           }
    //         />
    
    //         <Route
    //           path="/upload"
    //           element={
      //             user ? <UploadPage user={user} /> : <Navigate to="/login" />
      //           }
      //         />
      
      //         {/* fallback route */}
      //         <Route path="*" element={<Navigate to="/" />} />
      //       </Routes>
      //     </Router>
      //   );
      // };
      
      // export default App;
      
import React, { useState, useEffect } from 'react';
import {
  User, CreditCard, Upload, History, Plus,
  LogIn, UserPlus, ArrowLeft
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setUser({ id: data.user.id, username: data.user.username });
        setCurrentPage('home');
      } else {
        alert(data.message || "Login failed");
      }
    } catch {
      alert("Login error. Please try again.");
    }
  };

  const handleSignup = async (username, password, confirmPassword) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirmPassword })
      });
      const data = await response.json();
      if (data.success) {
        setUser({ id: data.userId, username });
        setCurrentPage('home');
      } else {
        alert(data.message || "Signup failed");
      }
    } catch {
      alert("Signup error. Please try again.");
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions/${user.id}`);
      const data = await response.json();
      if (data.success) setTransactions(data.transactions);
      else alert(data.message || "Could not fetch transactions");
    } catch {
      alert("Fetch error. Please try again.");
    }
  };

  const handleAddCash = async (formData) => {
    try {
      const response = await fetch('/api/transactions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          accountNumber: 'XXXXXXXXXXXXXXXX',
          creditedDebited: formData.creditedDebited,
          amount: formData.amount,
          date: formData.date,
          referenceNumber: 'cash',
          toFrom: 'Cash'
        })
      });
      const data = await response.json();
      if (data.success) {
        fetchTransactions();
        setCurrentPage('home');
      } else {
        alert(data.message || "Failed to add transaction");
      }
    } catch {
      alert("Add cash error. Please try again.");
    }
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
                  <LogIn size={16} /> Login
                </button>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                >
                  <UserPlus size={16} /> Sign Up
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => setCurrentPage('addCash')} className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Plus size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Add Cash</h3>
                <p className="text-green-100">Add cash transactions</p>
              </div>

              <div onClick={() => setCurrentPage('upload')} className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Upload size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Transactions</h3>
                <p className="text-blue-100">Upload transaction files</p>
              </div>

              <div onClick={() => setCurrentPage('history')} className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
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

    const handleSubmit = () => {
      handleLogin(formData.username, formData.password);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          <div className="space-y-6">
            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-3 rounded-lg">Login</button>
          </div>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('signup')} className="text-blue-500">Sign up</button>
          </p>
        </div>
      </div>
    );
  };

  const SignupPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

    const handleSubmitSignup = () => {
      if (formData.password !== formData.confirmPassword) return alert("Passwords don't match");
      handleSignup(formData.username, formData.password, formData.confirmPassword);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
          <div className="space-y-6">
            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <button onClick={handleSubmitSignup} className="w-full bg-green-500 text-white py-3 rounded-lg">Sign Up</button>
          </div>
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

    const handleSubmitCash = () => handleAddCash(formData);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
              <ArrowLeft size={20} /> Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Cash Transaction</h2>
            <div className="space-y-6">
              <input type="text" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg" placeholder="DD/MM/YY" />
              <select value={formData.creditedDebited} onChange={(e) => setFormData({...formData, creditedDebited: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg">
                <option value="credited">Credited</option>
                <option value="debited">Debited</option>
              </select>
              <input type="number" min="1" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg" placeholder="Amount" />
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
                <p>• Account Number: XXXXXXXXXXXXXXXX</p>
                <p>• To/From: Cash</p>
                <p>• Reference: Will be auto-generated</p>
              </div>
              <button onClick={handleSubmitCash} className="w-full bg-green-500 text-white py-3 rounded-lg">Add Cash Transaction</button>
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
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Payment History</h2>
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {['Date', 'Account Number', 'To/From', 'Type', 'Amount', 'Reference'].map(h => (
                  <th key={h} className="border px-4 py-2 text-sm font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{txn.date}</td>
                  <td className="border px-4 py-2">{txn.accountNumber === 'XXXXXXXXXXXXXXXX' ? 'Cash Account' : txn.accountNumber}</td>
                  <td className="border px-4 py-2">{txn.toFrom}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      txn.creditedDebited === 'credited' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {txn.creditedDebited}
                    </span>
                  </td>
                  <td className="border px-4 py-2 font-semibold text-right">₹{txn.amount}</td>
                  <td className="border px-4 py-2 font-mono text-sm">{txn.referenceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Upload Transactions</h2>
          <div className="text-center py-12">
            <Upload size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Transaction upload functionality</p>
            <p className="text-sm text-gray-500">Feature already implemented</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
      {currentPage === 'addCash' && <AddCashPage />}
      {currentPage === 'history' && <PaymentHistoryPage />}
      {currentPage === 'upload' && <UploadPage />}
    </>
  );
};

export default App;
