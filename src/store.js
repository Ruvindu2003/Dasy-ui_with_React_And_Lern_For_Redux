import { configureStore } from '@reduxjs/toolkit'
import studentReducer, { userReducer } from './UserReduser'

export const store = configureStore({
    reducer: {
        student: studentReducer,
        user: userReducer
    }
})
