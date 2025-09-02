import React, { useState, useEffect } from 'react';
import LeadForm from './components/LeadForm.jsx';
import LeadList from './components/LeadList.jsx';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5001/api/leads';

  // Function to fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leads. Please make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads on initial component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Lead Management System</h1>
          <p className="text-gray-600 mt-2">A simple tool to capture and view customer leads.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <LeadForm onLeadAdded={fetchLeads} apiUrl={API_URL} />
          </div>
          <div className="lg:col-span-3">
            <LeadList leads={leads} isLoading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;