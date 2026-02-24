import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../features/auth/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { PhotoIcon } from '@heroicons/react/24/solid';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  console.log("user", user);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '', // Email is usually not editable in simple implementations or requires re-verification
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      username: Yup.string().min(3, 'Must be at least 3 characters').required('Username is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('username', values.username);
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      await dispatch(updateProfile(formData));
    },
  });

  const getImageUrl = (pathOrFile) => {
    if (!pathOrFile) return null;
    if (pathOrFile instanceof File || pathOrFile instanceof Blob) {
      return URL.createObjectURL(pathOrFile);
    }
    // If it's a data URL (from FileReader)
    if (typeof pathOrFile === 'string' && pathOrFile.startsWith('data:')) {
      return pathOrFile;
    }
    // If it's a string URL
    if (typeof pathOrFile === 'string') {
      if (pathOrFile.startsWith('http')) return pathOrFile;
      // Clean up path if it still has backslashes (legacy data)
      const cleanPath = pathOrFile.replace(/\\/g, '/').replace(/^public\//, '');
      const baseUrl = 'http://localhost:8000';
      return `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
    }
    return null;
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('avatar', file);
      // We can just set the file itself as preview, getImageUrl will handle it
      setAvatarPreview(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        My Profile
      </h2>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <form onSubmit={formik.handleSubmit} className="space-y-8">

          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div className="relative group">
              <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-md flex items-center justify-center">
                {avatarPreview ? (
                  <img src={getImageUrl(avatarPreview)} alt="Avatar Preview" className="h-full w-full object-cover" />
                ) : (
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-indigo-700 transition-colors">
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
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.fullName || 'User'}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">@{user?.username}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3.1 MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formik.values.email}
                disabled
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 shadow-sm sm:text-sm py-2 px-3 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
            <Button
              type="submit"
              isLoading={loading}
              variant="primary"
              className="px-8"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
