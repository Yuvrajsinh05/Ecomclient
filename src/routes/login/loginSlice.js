import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'LoginState',
  initialState: {
    isLogin: false,
    userObj: {}
  },
  reducers: {
    logIn: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLogin = true
    },
    logOut: state => {
      state.isLogin = false
    },
    userState: (state, action) => {
      state.userObj = { ...state.userObj, ...action.payload.user };
    }
  }
})

// Action creators are generated for each case reducer function
export const { logIn, logOut, userState } = loginSlice.actions

export default loginSlice.reducer