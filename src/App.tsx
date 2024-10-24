import React from 'react';
import { AlertCircle } from 'lucide-react';
import { DonationCard } from './components/DonationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useGoogleSheets } from './hooks/useGoogleSheets';

// Replace this with your Google Sheet ID
const SHEET_ID = '13x0k74NfqxndzChFlpc-08YacKLu-j2r7LPzKvh7uJs';

function App() {
  const { data, loading, error } = useGoogleSheets(SHEET_ID);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">Error loading data: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Donation Opportunities</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <DonationCard
                key={index}
                title={item.title}
                donateUrl={item.donateUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;