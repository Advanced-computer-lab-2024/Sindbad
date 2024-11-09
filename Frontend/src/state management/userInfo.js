import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "admin",
    id: "672537b565d46abdbd520858",
    // role: "tourist",
    // id: "672501d2d5a2d7588e2ce414",
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

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
});

export function useUser() {
  return useSelector(
    (state) => ({
      role: state.role,
      id: state.id,
    }),
    shallowEqual // prevents unnecessary rerenders
  );
}

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
