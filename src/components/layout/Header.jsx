import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import useTheme from '../../hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white lg:hidden">
          EMS
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-indigo-600" />
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <Link to="/profile" className="flex items-center space-x-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.fullName || 'User'} ({user?.role})
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                @{user?.username || 'username'}
              </p>
            </div>
            {user?.avatar ? (
              <img
                src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:8000${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`}
                alt="Avatar"
                className="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                {user?.fullName?.[0] || 'U'}
              </div>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
