import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../utils/types";

export const productData = createAsyncThunk<CartItem[]>(
  "product/fetchData",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data:CartItem[]  = await response.json();
    return data;
    
  }
);
interface ProductState {
  data: CartItem[];
}

const initialState: ProductState = {
  data: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: { },
 
  extraReducers: (builder) => {
    builder
      .addCase(productData.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.data = action.payload;
      })
    
  },
});
export default productSlice.reducer;

