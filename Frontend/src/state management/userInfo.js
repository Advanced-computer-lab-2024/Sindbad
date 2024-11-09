import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";

const userSlice = createSlice({
    name: "user",
    initialState: {
        // role: "admin",
        // id: "672537b565d46abdbd520858",
        role: "tourist",
        id: "672faf6be3120c5df6679670",
        // role: "tourGuide",
        // id: "6725031bd5a2d7588e2ce42a",
        // role: "seller",
        // id: "67252de1d5a2d7588e2ce7fe",
        // role: "advertiser",
        // id: "672505d8d5a2d7588e2ce4a2",
        // role: "tourismGovernor",
        // id: "67250766d5a2d7588e2ce4fe",
        // role: "guest",
        // id: null
    },
    reducers: {
        login(state, action) {
            state.role = action.payload.role;
            state.id = action.payload.id;
        },
        logout(state) {
            state.role = "guest";
            state.id = null;
        },
    },
});

const currencySlice = createSlice({
    name: "currency",
    initialState: "EUR",
    reducers: {
        setCurrency(state, action) {
            return action.payload;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const { setCurrency } = currencySlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        currency: currencySlice.reducer,
    },
});

export function useUser() {
    return useSelector(
        (state) => ({
            role: state.user?.role,
            id: state.user?.id,
        }),
        shallowEqual // prevents unnecessary rerenders
    );
}

export function useCurrency() {
    return useSelector((state) => state.currency, shallowEqual);
}

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
