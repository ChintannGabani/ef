import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Dashboard from '../pages/Dashboard';
import EmployeeListContainer from '../features/employees/containers/EmployeeList.container';
import EmployeeForm from '../features/employees/components/EmployeeForm';
import ProfileContainer from '../features/profile/containers/Profile.container';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />

        {/* Employee Routes */}
        <Route path="/employees" element={<EmployeeListContainer />} />
        <Route path="/employees/add" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />

        {/* Profile Route */}
        <Route path="/profile" element={<ProfileContainer />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
