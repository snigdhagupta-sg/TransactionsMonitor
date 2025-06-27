import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const LoginPage = ({ handleLogin, setCurrentPage }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.username, formData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder="Enter your username" className="w-full px-4 py-3 border rounded-lg" />
          <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Enter your password" className="w-full px-4 py-3 border rounded-lg" />
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">Login</button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('signup')} className="text-blue-500 hover:text-blue-600 font-medium">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
