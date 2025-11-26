import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B+', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', grade: 'A-', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', grade: 'B', status: 'Inactive' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', grade: 'A+', status: 'Active' },
]

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.push(action.payload)
        },
        removeStudent: (state, action) => {
            return state.filter(student => student.id !== action.payload)
        },
        updateStudent: (state, action) => {
            const index = state.findIndex(student => student.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
            }
        }
    }
})

export const { addStudent, removeStudent, updateStudent } = studentSlice.actions
export default studentSlice.reducer