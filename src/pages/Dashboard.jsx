import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../features/employees/store/employeeSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: employees, myDetails, loading } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(fetchEmployees());
    } else {
      // Employees might not need all employee data, but maybe some stats? 
      // For now, let's just fetch their own details to show on dashboard.
      dispatch(fetchEmployees()); // Still fetch to show some context or stats if allowed
    }
  }, [dispatch, user]);

  const stats = user?.role === 'admin' ? [
    { label: 'Total Workforce', value: employees.length, color: 'bg-indigo-500', icon: '👥' },
    { label: 'Active Staff', value: employees.filter(e => e.status === 'active').length, color: 'bg-emerald-500', icon: '✅' },
    { label: 'On Leave', value: employees.filter(e => e.status === 'on-leave').length, color: 'bg-amber-500', icon: '🏝️' },
    { label: 'Inactive', value: employees.filter(e => e.status === 'inactive').length, color: 'bg-rose-500', icon: '⚠️' },
  ] : [
    { label: 'My Status', value: employees.find(e => e.email === user?.email)?.status || 'N/A', color: 'bg-indigo-500', icon: '👤' },
    { label: 'My Department', value: employees.find(e => e.email === user?.email)?.department || 'N/A', color: 'bg-emerald-500', icon: '🏢' },
    { label: 'Joined', value: employees.find(e => e.email === user?.email) ? new Date(employees.find(e => e.email === user?.email).joiningDate).toLocaleDateString() : 'N/A', color: 'bg-amber-500', icon: '📅' },
    { label: 'Salary Grade', value: employees.find(e => e.email === user?.email) ? 'Level 1' : 'N/A', color: 'bg-rose-500', icon: '📈' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Welcome back, <span className="font-bold text-indigo-600 dark:text-indigo-400">{user?.fullName}</span>.
          {user?.role === 'admin' ? " Here's your organizational overview." : " Here's your personal summary."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-2xl`}>
                {stat.icon}
              </div>
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white mt-2 capitalize">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.role === 'admin' ? "Recent Hires" : "Department Colleagues"}
            </h3>
            <Link to="/employees" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Position</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {employees.slice(0, 5).map(emp => (
                  <tr key={emp._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-5">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 mr-3">
                          {emp.fullName[0]}
                        </div>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{emp.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">{emp.position}</td>
                    <td className="px-4 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${emp.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-lg font-bold mb-2">Announcement</h4>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Our monthly town hall is scheduled for next Friday at 10 AM. Don't miss the upcoming feature roadmap!
            </p>
            <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow">
              Read More
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/profile" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <span className="mr-3">📁</span>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">My Documents</span>
              </Link>
              <Link to="/employees" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <span className="mr-3">🏢</span>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Company Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
