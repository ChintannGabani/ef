import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import employeeReducer from '../features/employees/store/employeeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
    },
});

export default store;
