import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toastOpen: false,
    toastMessage: 'Successfully',
    toastType: 'success',
    toastTitleShow: true
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, { payload }) => {
            state.toastOpen = true;
            state.toastMessage = payload.message;
            state.toastType = payload.type;
            state.toastTitleShow = payload.showTitle
        },
        clearToast: state => {
            state.toastOpen = false;
        },
    },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;