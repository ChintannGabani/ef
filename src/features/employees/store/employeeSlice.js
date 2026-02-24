import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'}/employees`;

// Async thunks
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchMyDetails = createAsyncThunk(
    'employees/fetchMyDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/my-details`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, employeeData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async ({ id, employeeData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, employeeData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        items: [],
        myDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Employees
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch My Details
            .addCase(fetchMyDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.myDetails = action.payload;
            })
            .addCase(fetchMyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Employee
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update Employee
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete Employee
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
