import axiosInstance from "./axiosInstance";

export const userLogin = async (params) => {
  // console.log("params: ", params);
  const { username, password } = params;

  // console.log("Request body inside userLogin method:", { username, password });

  try {
    const response = await axiosInstance.post(
      `/auth/`,
      {
        username,
        password,
      },
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get(`/auth/refresh`);
    // console.log("Refresh response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during refresh:", error);
    throw error; // Re-throw the error to handle it appropriately in the calling function
  }
};
