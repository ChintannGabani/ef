import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // Backend supports email or username in "username" field, or specifically "email"
      // userLoginSchema allows email or username.
      // Let's send it as defined in slice.
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        navigate('/');
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Welcome Back
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
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

        <div className="flex items-center justify-between">
          <Link to="/register" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Don't have an account? Sign up
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-lg shadow-md hover:shadow-lg transform transition-all active:scale-95"
          isLoading={loading}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
