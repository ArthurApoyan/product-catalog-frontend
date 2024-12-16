import { configureStore } from '@reduxjs/toolkit'
import { authApi } from "../store/features/auth/authAPI/authAPI.js";
import { productsApi } from "../store/features/products/productsAPI/productsAPI.js";
import toastSlice from "../store/features/toast/toastSlice.js";
import productsSlice from "../store/features/products/productsSlice/productsSlice.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        toast: toastSlice,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, productsApi.middleware]),
})