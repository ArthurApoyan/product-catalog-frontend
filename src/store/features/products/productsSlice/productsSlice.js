import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
    pattern: "",
    bagQTY: 0
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, { payload }) => {
            state.category = payload;
        },
        setPattern: (state, { payload }) => {
            state.pattern = payload;
        },
        setBagQTY: (state, { payload }) => {
            state.bagQTY = payload;
        },
    },
});

export const {
    setCategory,
    setBagQTY,
    setPattern
} = productsSlice.actions;

export default productsSlice.reducer;