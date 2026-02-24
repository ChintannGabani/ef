import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee, fetchEmployees } from '../store/employeeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
    UserIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    ChevronDownIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

const EmployeeForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: employees } = useSelector((state) => state.employees);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        joiningDate: '',
        status: 'active'
    });

    useEffect(() => {
        if (id) {
            const employee = employees.find(emp => emp._id === id);
            if (employee) {
                setFormData({
                    fullName: employee.fullName,
                    email: employee.email,
                    position: employee.position,
                    department: employee.department,
                    salary: employee.salary,
                    joiningDate: new Date(employee.joiningDate).toISOString().split('T')[0],
                    status: employee.status
                });
            } else {
                dispatch(fetchEmployees());
            }
        }
    }, [id, employees, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await dispatch(updateEmployee({ id, employeeData: formData }));
        } else {
            await dispatch(createEmployee(formData));
        }
        navigate('/employees');
    };

    const FormInput = ({ label, name, type, value, icon: Icon, placeholder, required = true }) => (
        <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 text-gray-400">
                    <Icon className="h-5 w-5" />
                </div>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    placeholder={placeholder}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                />
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <button
                onClick={() => navigate('/employees')}
                className="flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Directory
            </button>

            <div className="bg-white dark:bg-gray-800 shadow-2xl shadow-indigo-100/30 dark:shadow-none rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white relative h-40">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black tracking-tight">{id ? 'Update Employee' : 'Create New Employee'}</h2>
                        <p className="text-indigo-100 mt-2 font-medium opacity-90">
                            {id ? `Refining ${formData.fullName}'s profile details.` : 'Onboard a new member to the organization.'}
                        </p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                </div>

                <div className="px-8 py-10 -mt-8 bg-white dark:bg-gray-800 rounded-t-[2.5rem] relative z-20">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput
                                label="Full Name"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                icon={UserIcon}
                                placeholder="e.g. John Doe"
                            />
                            <FormInput
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                icon={EnvelopeIcon}
                                placeholder="john@company.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput
                                label="Department"
                                name="department"
                                type="text"
                                value={formData.department}
                                icon={BuildingOfficeIcon}
                                placeholder="e.g. Engineering"
                            />
                            <FormInput
                                label="Position / Role"
                                name="position"
                                type="text"
                                value={formData.position}
                                icon={BriefcaseIcon}
                                placeholder="e.g. Senior Backend Dev"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput
                                label="Annual Salary ($)"
                                name="salary"
                                type="number"
                                value={formData.salary}
                                icon={CurrencyDollarIcon}
                                placeholder="e.g. 85000"
                            />
                            <FormInput
                                label="Joining Date"
                                name="joiningDate"
                                type="date"
                                value={formData.joiningDate}
                                icon={CalendarDaysIcon}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Employment Status
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                                    <div className="h-5 w-5 border-2 border-current rounded-full"></div>
                                </div>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all appearance-none shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="on-leave">On Leave</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                                    <ChevronDownIcon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex items-center gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200/50 dark:shadow-none transform active:scale-[0.98] transition-all"
                            >
                                {id ? 'Save Changes' : 'Confirm Registration'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/employees')}
                                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
