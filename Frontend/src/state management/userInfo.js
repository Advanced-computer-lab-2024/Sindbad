import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: "tourGuide",
        id: "66f8630f55f21e927d7455cc"
    },
    reducers: {
        login(state, action) {
            state.type = action.payload.type
            state.id = action.payload.id
        },
        logout(state) {
            state.type = "guest"
            state.id = null
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