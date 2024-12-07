import axios from "axios";
import { store } from "../state management/userInfo"; // Import your Redux store
import { refreshAccessToken } from "./AuthApiHandler"; // Import your userRefreshToken function
import { login, logout } from "../state management/userInfo"; // Import your login and logout actions

const baseURL = import.meta.env.VITE_BASE_URL;

// axios.defaults.withCredentials = true; // MOST IMPORTANT LINE IN THE WHOLE CODEBASE

// Function to get the user's access token from the Redux store
function getAccessToken() {
  const state = store.getState(); // Access the Redux state directly
  return state.user?.accessToken; // Adjust this based on your Redux state structure
}

// Create an Axios instance for regular API requests
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Axios request interceptor to add the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Prevent retrying refresh access token API
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error); // Don't retry on refresh token call
    }

    const oldAccessToken = getAccessToken();

    // Check if the error is due to an expired token (426) and hasn't been retried yet
    if (error.response?.status === 426 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Refresh the access token
        const { id, role, accessToken } = await refreshAccessToken();

        // Update the Redux store with the new token
        store.dispatch(login({ id, role, accessToken }));

        console.log("Access Token refreshed:", accessToken);

        // Update the Authorization header with the new token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, log out the user
        store.dispatch(logout());
        window.location.href = "/login"; // Redirect to the login page

        return Promise.reject(refreshError);
      }
    }

    // Reject all other errors
    // const resourceName = error.config.resourceName || "Resource";

    // Handle all errors with a response
    if (error.response) {
      return Promise.reject({
        error: true,
        message: error.response.data?.message || "An error occurred.",
        status: error.response.status,
      });
    }

    // Handle errors without a response (network issues)
    if (error.request) {
      return Promise.reject({
        error: true,
        message:
          "No response from server. Please check your connection and try again.",
      });
    }

    // Handle other unexpected errors
    return Promise.reject({
      error: true,
      message: "Request setup error. Please try again.",
    });
  }
);

export default axiosInstance;
