import * as Yup from 'yup';

export const profileSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    username: Yup.string().min(3, 'Must be at least 3 characters').required('Username is required'),
});
