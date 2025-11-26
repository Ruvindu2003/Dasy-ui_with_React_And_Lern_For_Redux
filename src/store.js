import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './UserReduser'

export const store = configureStore({
    reducer: {
        student: studentReducer
    }
})
