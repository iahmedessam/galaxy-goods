import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { tokenReducer } from "./TokenSlice";
import { getproductsReducer } from "./getProducts";
import { productDetailsReducer } from "./productDetailsSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        counter: counterReducer,
        products: getproductsReducer,
        productDetails: productDetailsReducer
    }
});