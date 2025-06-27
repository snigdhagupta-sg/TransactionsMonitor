import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const SignupPage = ({ handleSignup, setCurrentPage }) => {
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
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
        <div className="space-y-6">
          <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder="Choose a username" className="w-full px-4 py-3 border rounded-lg" />
          <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Create a password" className="w-full px-4 py-3 border rounded-lg" />
          <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="Confirm password" className="w-full px-4 py-3 border rounded-lg" />
          <button type="button" onClick={handleSubmitSignup} className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">Sign Up</button>
        </div>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <button onClick={() => setCurrentPage('login')} className="text-green-500 hover:text-green-600 font-medium">Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
