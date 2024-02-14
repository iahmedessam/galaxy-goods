import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('products', async function () {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products');
    console.log(data.data);
    return data.data;
});

export const getProductsSlice = createSlice({
    name: 'getproducts',
    initialState: { products: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const getproductsReducer = getProductsSlice.reducer;

