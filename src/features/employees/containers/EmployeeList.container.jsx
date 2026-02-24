import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, fetchMyDetails, deleteEmployee } from '../store/employeeSlice';
import { useNavigate } from 'react-router-dom';
import EmployeeListView from '../views/EmployeeList.view';

const EmployeeListContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: employees, myDetails, loading } = useSelector((state) => state.employees);
    const { user } = useSelector((state) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(fetchEmployees());
        } else {
            dispatch(fetchMyDetails());
        }
    }, [dispatch, user]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            dispatch(deleteEmployee(id));
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <EmployeeListView
            employees={filteredEmployees}
            myDetails={myDetails}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleDelete={handleDelete}
            navigate={navigate}
            userRole={user?.role}
        />
    );
};

export default EmployeeListContainer;
