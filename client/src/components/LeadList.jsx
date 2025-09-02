import React from 'react';

const LeadList = ({ leads, isLoading, error }) => {

    const StatusBadge = ({ status }) => {
        let colorClasses = 'bg-gray-200 text-gray-800';
        if (status === 'New') colorClasses = 'bg-blue-100 text-blue-800';
        if (status === 'Contacted') colorClasses = 'bg-yellow-100 text-yellow-800';
        if (status === 'Qualified') colorClasses = 'bg-green-100 text-green-800';
        if (status === 'Lost') colorClasses = 'bg-red-100 text-red-800';

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
                {status}
            </span>
        );
    };

    const SkeletonLoader = () => (
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
    );


    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Captured Leads</h2>
            <div className="space-y-4">
                {error && <div className="p-4 text-center text-red-700 bg-red-100 rounded-md">{error}</div>}
                
                {isLoading && (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonLoader key={index} />)
                )}

                {!isLoading && !error && leads.length === 0 && (
                    <div className="p-6 text-center text-gray-500 border-2 border-dashed rounded-lg">
                        No leads captured yet. Add one using the form!
                    </div>
                )}
                
                {!isLoading && !error && leads.map(lead => (
                    <div key={lead._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start">
                           <div>
                                <h3 className="font-bold text-lg text-gray-900">{lead.name}</h3>
                                <p className="text-sm text-gray-600">{lead.email}</p>
                                <p className="text-sm text-gray-600">{lead.phone}</p>
                           </div>
                           <StatusBadge status={lead.status} />
                        </div>
                        <p className="text-xs text-gray-400 mt-3">
                            Captured on: {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadList;