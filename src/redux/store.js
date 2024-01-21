import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './slides/userSlice'


export const store = configureStore({
  reducer: {
    user: userReducer
  },
})