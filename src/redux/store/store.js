import { configureStore } from '@reduxjs/toolkit'
import  studentReducer  from '../slice/studentSlice'
export const store = configureStore({
  reducer: {
    student : studentReducer
  },
})