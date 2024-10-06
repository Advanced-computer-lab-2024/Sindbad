import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // type: "tourist",
        // id: "66f97308f74fa1c054a9b15c"
        // type: "tourGuide",
        // id: "66f8630f55f21e927d7455cc"
        type: "seller",
        id: "66f99b77497c76922f03104e"
        // type: "advertiser",
        // id: "66f823447b0fe45d3c6d3768"
        // type: "tourismGovernor",
        // id: "66fff189a0a316baace5a99b"
        // type: "admin",
        // id: "66ffd995f2226d9aa3157374"
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