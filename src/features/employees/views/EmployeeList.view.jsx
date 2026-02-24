import React from 'react';

const EmployeeListView = ({
    employees,
    myDetails,
    loading,
    searchQuery,
    setSearchQuery,
    handleDelete,
    navigate,
    userRole
}) => {
    // Role-specific view for Employee
    if (userRole === 'employee') {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">View your personal and employment details.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : myDetails ? (
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="bg-indigo-600 h-32 w-full"></div>
                        <div className="px-8 pb-8">
                            <div className="relative -mt-16 mb-6 flex justify-between items-end">
                                <div className="h-32 w-32 rounded-2xl bg-white dark:bg-gray-700 p-1 shadow-lg ring-4 ring-white dark:ring-gray-800">
                                    <div className="h-full w-full rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                                        {myDetails.fullName[0]}
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${myDetails.status === 'active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {myDetails.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{myDetails.fullName}</h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{myDetails.position}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <span className="w-24 font-semibold">Email:</span>
                                            <span>{myDetails.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <span className="w-24 font-semibold">Department:</span>
                                            <span>{myDetails.department}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl space-y-4 border border-gray-100 dark:border-gray-600">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Financial Info</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Annual Salary</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">${myDetails.salary.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Joined Date</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {new Date(myDetails.joiningDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                        <p className="text-gray-500 dark:text-gray-400">Your employee record could not be found. Please contact an admin.</p>
                    </div>
                )}
            </div>
        );
    }

    // Role-specific view for Admin
    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Management</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage staff details and system roles.</p>
                </div>
                <button
                    onClick={() => navigate('/employees/add')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none font-bold transform active:scale-95 transition-all"
                >
                    + Add New Employee
                </button>
            </div>

            <div className="mb-6 relative group">
                <input
                    type="text"
                    placeholder="Search by name, email or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all text-sm"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Employee</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Position</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Salary</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-12 text-gray-500 dark:text-gray-400 animate-pulse">Loading dataset...</td></tr>
                            ) : employees.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">No results found for your search.</td></tr>
                            ) : employees.map((emp) => (
                                <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mr-3 group-hover:scale-110 transition-transform">
                                                {emp.fullName[0]}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{emp.fullName}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">{emp.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{emp.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                        ${emp.salary.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-lg ${emp.status === 'active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : emp.status === 'on-leave'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {emp.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => navigate(`/employees/edit/${emp._id}`)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 font-bold transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp._id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-bold transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeListView;
