import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Adjust the path as needed
import { CartItem } from '../../../utils/types';


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [] as CartItem[],
  reducers: {
    addToWishlist: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<CartItem>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    removeProductFromWishlist: (state, action: PayloadAction<CartItem>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToWishlist, removeFromWishlist, removeProductFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selector
export const selectWishlist = (state: RootState) => state.wishList; // Adjust the path as needed
