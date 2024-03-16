// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuth } from '../../requests/adminreq';
import { getApiCall } from '../../requests/requests';
// import  likeProductAsync  from '../../features/likedProductsSlice'; // Corrected import path
import { likeProductAsync } from '../../fetures/likedProductsSlice';

// Function to load user from local storage
const loadUserFromStorage = async (dispatch) => { // Pass dispatch as an argument
  const storedToken = localStorage.getItem('ecomtoken');
  if (storedToken) {
    try {
      // If token exists, attempt to fetch user data
      const fetchedUser = await getUserDetail();

      if(fetchedUser.error){
         dispatch(logout())
        localStorage.clear()
        return;
      }
      dispatch(likeProductAsync(false , fetchedUser?.Userdata?.savedProducts  , fetchedUser?.Userdata?._id ));
      return fetchedUser;
    } catch (error) {
      // Handle error if user data cannot be fetched
      console.error('Error fetching user data:', error);
      return null;
    }
  } else {
    return null;
  }
};

async function getUserDetail() {
  const UserData = await getApiCall(UserAuth.userDetials);
  return UserData;
}

// Thunk to fetch user data
export const fetchUserFromStorage = createAsyncThunk(
  'login/fetchUser',
  async (arg, { dispatch }) => { // Destructure dispatch from the second argument
    return await loadUserFromStorage(dispatch);
  }
);

// Initial state without user data
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Add isLoading flag to track whether data is being loaded
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('ecomtoken', action.payload.token);
    },
    // Action to handle logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem('ecomtoken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFromStorage.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    });
  },
});

// Export actions for dispatch
export const { loginSuccess, logout } = loginSlice.actions;

// Export the reducer
export default loginSlice.reducer;
