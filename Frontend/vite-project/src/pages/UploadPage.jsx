import React from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

const UploadPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
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

export default UploadPage;
