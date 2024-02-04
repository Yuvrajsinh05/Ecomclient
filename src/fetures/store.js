// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "../routes/login/loginSlice";
// import likedProductsReducer from "../path-to-your-likedProducts-slice";
import likedProductsReducer from "./likedProductsSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    likedProducts: likedProductsReducer, // Add your likedProductsSlice reducer
    // Add other reducers as needed
  },
});

export default store;
