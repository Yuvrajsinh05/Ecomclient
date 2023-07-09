import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../routes/login/loginSlice'
export default configureStore({
    reducer: {
        LoginState: loginSlice
    }
})