import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";

const userSlice = createSlice({
	name: "user",
	initialState: {
		// role: "admin",
		// id: "66ffd995f2226d9aa3157374",
		role: "tourist",
		id: "66f97308f74fa1c054a9b15c"
		// role: "tourGuide",
		// id: "66f8630f55f21e927d7455cc"
		// role: "seller",
		// id: "66f99b77497c76922f03104e"
		// role: "advertiser",
		// id: "66f9741bf74fa1c054a9b166"
		// role: "tourismGovernor",
		// id: "66fff189a0a316baace5a99b"
		// role: "admin",
		// id: "66ffd995f2226d9aa3157374"
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
