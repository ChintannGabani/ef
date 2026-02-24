import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { PhotoIcon } from '@heroicons/react/24/solid';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      avatar: null,
      role: 'employee',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      username: Yup.string().min(3, 'Must be at least 3 characters').required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
      avatar: Yup.mixed().required('Avatar is required'),
      role: Yup.string().oneOf(['admin', 'employee'], 'Invalid role').required('Role is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('avatar', values.avatar);
      formData.append('role', values.role);

      const resultAction = await dispatch(register(formData));
      if (register.fulfilled.match(resultAction)) {
        navigate('/login');
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Create Account
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group hover:border-indigo-500 transition-colors">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="h-full w-full object-cover" />
              ) : (
                <PhotoIcon className="h-10 w-10 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              )}
            </div>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              <input
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          {formik.touched.avatar && formik.errors.avatar && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.avatar}</div>
          )}
        </div>

        <Input
          id="fullName"
          label="Full Name"
          placeholder="John Doe"
          {...formik.getFieldProps('fullName')}
          error={formik.touched.fullName && formik.errors.fullName}
        />

        <Input
          id="username"
          label="Username"
          placeholder="johndoe"
          {...formik.getFieldProps('username')}
          error={formik.touched.username && formik.errors.username}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select
            id="role"
            {...formik.getFieldProps('role')}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.role}</div>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Already have an account? Sign in
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-lg shadow-md hover:shadow-lg transform transition-all active:scale-95"
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
