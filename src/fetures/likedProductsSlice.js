import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CustomerCart } from "../requests/adminreq";

// Action creator using Redux Thunk
export const likeProductAsync = (productId, InitialSavedIds ,CustomerId) => async (dispatch) => {
  try {
    if (productId) {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": localStorage.ecomtoken,
      };

      const response = await axios.post(CustomerCart.savedProducts, {
        productId,
        userId: CustomerId,
      } ,{headers});

      dispatch(likeProduct({ "savedProduct": response.data.savedProducts }));
    } else {
      dispatch(likeProduct({ "savedProduct": InitialSavedIds }))
    }

  } catch (error) {
    console.error("Error liking product:", error);
    // Handle errors or dispatch another action to handle the error
  }
};

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: {
    likedProducts: [], // You can initialize this with data from the server if needed
  },
  reducers: {
    // Synchronous action to handle liking a product
    likeProduct: (state, action) => {
      const { savedProduct } = action.payload;
      state.likedProducts = [...savedProduct];
    },
  },
});

// Export actions for dispatch
export const { likeProduct } = likedProductsSlice.actions;

// Export the asynchronous action creator
// Export { likeProductAsync };

// Export the reducer
export default likedProductsSlice.reducer;
