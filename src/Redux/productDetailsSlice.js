import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk('productDetails', async (productId) => {
    const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${productId}`);
    return data.data;
});

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        productDetails: null,
        images: [],
        imagesLength: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.productDetails = action.payload;
            state.images = action.payload.images;
            state.imagesLength = action.payload.images.length;
        });
    },
});

export const productDetailsReducer = productDetailsSlice.reducer;