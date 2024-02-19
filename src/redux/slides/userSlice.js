import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    access_token: "",
    id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = "",
                email = "",
                access_token = "",
                address = "",
                phone = "",
                avatar = "",
                _id = "",
            } = action.payload;
            state.name = name || email;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.address = "";
            state.phone = "";
            state.avatar = "";
            state._id = "";
            state.access_token = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
