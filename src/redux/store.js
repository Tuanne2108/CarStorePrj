import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlice";
import productReducer from "./slides/productSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});
