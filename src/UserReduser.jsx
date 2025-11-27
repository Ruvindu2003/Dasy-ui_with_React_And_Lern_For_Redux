import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from './api'

// Async thunks for API calls
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        const response = await api.get("/student/getAll");
        return response.data;
    }
);

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id) => {
        const response = await api.get(`/student/${id}`);
        return response.data;
    }
);

export const addUserAsync = createAsyncThunk(
    "users/addUser",
    async (user) => {
        const response = await api.post("/student/Add-Student", user);
        return response.data;
    }
);

export const removeUserAsync = createAsyncThunk(
    "users/removeUser",
    async (id) => {
        const response = await api.delete(`/Student-Delete/${id}`);
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    "users/updateUser",
    async (user) => {
        const response = await api.put(`/student/update-Student`, user);
        return response.data;
    }
);

// Initial state with sample users
const initialUserState = {
    users: [
        { id: 1, name: 'John Doe', address: '123 Main St, New York, NY 10001', age: '28', gender: 'MALE' },
        { id: 2, name: 'Jane Smith', address: '456 Oak Ave, Los Angeles, CA 90001', age: '32', gender: 'FEMALE' },
        { id: 3, name: 'Alex Johnson', address: '789 Pine Rd, Chicago, IL 60601', age: '25', gender: 'OTHER' },
        { id: 4, name: 'Sarah Williams', address: '321 Elm St, Houston, TX 77001', age: '29', gender: 'FEMALE' },
        { id: 5, name: 'Michael Brown', address: '654 Maple Dr, Phoenix, AZ 85001', age: '35', gender: 'MALE' },
        { id: 6, name: 'Emily Davis', address: '987 Cedar Ln, Philadelphia, PA 19101', age: '27', gender: 'FEMALE' },
    ],
    user: null,
    loading: false,
    error: null
};

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // Fetch User by ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // Add User
            .addCase(addUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // Remove User
            .addCase(removeUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(u => u.id !== action.payload.id);
            })
            .addCase(removeUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // Update User
            .addCase(updateUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
});

// Student slice for backward compatibility
const studentInitialState = {
    students: [
        { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B+', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', grade: 'A-', status: 'Active' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', grade: 'B', status: 'Inactive' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', grade: 'A+', status: 'Active' },
    ],
    student: null,
    loading: false,
    error: null
};

const studentSlice = createSlice({
    name: 'student',
    initialState: studentInitialState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload);
        },
        removeStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
        },
        updateStudent: (state, action) => {
            const index = state.students.findIndex(student => student.id === action.payload.id);
            if (index !== -1) {
                state.students[index] = action.payload;
            }
        }
    }
});

// Export user actions and reducer
export const { addUser, removeUser, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Export student actions and reducer for backward compatibility
export const { addStudent, removeStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
