import React, { useState } from 'react';

const LeadForm = ({ onLeadAdded, apiUrl }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required.';
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid.';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
             newErrors.phone = 'Phone number must be 10 digits.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage(null);

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            
            setSubmitMessage({ type: 'success', text: 'Lead added successfully!' });
            setName('');
            setEmail('');
            setPhone('');
            setErrors({});
            onLeadAdded(); 
        } catch (error) {
            setSubmitMessage({ type: 'error', text: error.message || 'Failed to add lead.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Capture New Lead</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300'}`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300'}`}
                            placeholder="john.doe@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-300'}`}
                            placeholder="1234567890"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                </div>

                {submitMessage && (
                    <div className={`mt-4 p-3 rounded-md text-sm ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {submitMessage.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {submitting ? 'Submitting...' : 'Add Lead'}
                </button>
            </form>
        </div>
    );
};

export default LeadForm;