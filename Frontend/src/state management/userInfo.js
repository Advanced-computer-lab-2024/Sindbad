import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";

const userSlice = createSlice({
	name: "user",
	initialState: {
		role: "admin",
		id: "672537b565d46abdbd520858",
		// role: "tourist",
		// id: "672501d2d5a2d7588e2ce414"
		// role: "tourGuide",
		// id: "67250380d5a2d7588e2ce436"
		// role: "seller",
		// id: "67252df2d5a2d7588e2ce806"
		// role: "advertiser",
		// id: "672505e8d5a2d7588e2ce4aa"
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
