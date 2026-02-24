import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfile } from '../../auth/authSlice';
import { profileSchema } from '../validation/validation';
import ProfileView from '../views/Profile.view';

const ProfileContainer = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            username: '',
            email: '',
        },
        validationSchema: profileSchema,
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
            setAvatarPreview(file);
        }
    };

    return (
        <ProfileView
            formik={formik}
            loading={loading}
            user={user}
            avatarPreview={avatarPreview}
            getImageUrl={getImageUrl}
            handleAvatarChange={handleAvatarChange}
        />
    );
};

export default ProfileContainer;
