// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to load user from local storage
const loadUserFromStorage = () => {
  const storedToken = localStorage.getItem('ecomtoken');
  return storedToken ? decodeToken(storedToken) : null;
};

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Initial state with user data from local storage
const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('ecomtoken', action.payload.token);
    },
    // Action to handle logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('ecomtoken');
    },
  },
});

// Export actions for dispatch
export const { loginSuccess, logout } = loginSlice.actions;

// Export the reducer
export default loginSlice.reducer;
