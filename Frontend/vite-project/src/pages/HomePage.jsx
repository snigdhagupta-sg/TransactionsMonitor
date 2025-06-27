import React from 'react';
import { LogIn, UserPlus, Plus, Upload, History, CreditCard, User, ListOrdered } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Payment Dashboard</h1>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-600">Welcome, {user.username}!</span>
                <button
                  onClick={() => {
                    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    setUser(null);
                    navigate("/");
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                  <LogIn size={16} /> Login
                </button>
                <button onClick={() => navigate('/signup')} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2">
                  <UserPlus size={16} /> Sign Up
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div onClick={() => navigate('/add-cash')} className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Plus size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Add Cash</h3>
                <p className="text-green-100">Add cash transactions</p>
              </div>

              <div onClick={() => navigate('/upload')} className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Upload size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Transactions</h3>
                <p className="text-blue-100">Upload transaction files</p>
              </div>

              <div onClick={() => navigate('/history')} className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <History size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment History</h3>
                <p className="text-purple-100">View all transactions</p>
              </div>

              <div onClick={() => navigate('/accountnumbers')} className="bg-gradient-to-r from-pink-400 to-pink-600 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <ListOrdered size={32} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">Account Numbers</h3>
                <p className="text-pink-100">Manage your accounts</p>
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
};

export default HomePage;
