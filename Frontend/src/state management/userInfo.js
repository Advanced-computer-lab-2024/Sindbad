import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: "advertiser",
        id: "66f823447b0fe45d3c6d3768",
        username: "moskitoAdvertiser"
    },
    reducers: {
        login(state, action) {
            state.type = action.payload.type
            state.id = action.payload.id
            state.username = action.payload.username
        },
        logout(state) {
            state.type = "guest"
            state.id = null
            state.username = null
        }
    }
});

export const { login, logout } = userSlice.actions

export const store = configureStore({
    reducer: userSlice.reducer
});

export function useUser() {
    return useSelector((state) => ({type: state.type, id: state.id, username: state.username}));
}

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));