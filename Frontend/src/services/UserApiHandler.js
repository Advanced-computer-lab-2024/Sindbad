import axiosInstance from "./axiosInstance";

export const userSignUp = async (finalValues, registerType) => {
    const { password, ...rest } = finalValues; // Exclude 'password' from finalValues

    // Adjust the data format based on the role
    let requestBody = {};
    if (registerType === "Tourist") {
        requestBody = {
            ...rest,
            passwordHash: password, // hash the password if required
            role: "tourist",
        };
    } else {
        requestBody = {
            ...rest,
            passwordHash: finalValues.password, // hash the password if required
            role: registerType.toLowerCase(),
        };
    }

    try {
        const response = await axiosInstance.post(
            `/user/signup`,
            requestBody,
        );

        return response.data;
    } catch (error) {
        return error;
    }
}

export const getUserRole = async (userId) => {
    try {
        const response = await axiosInstance.get(
            `/user/get-user-role/${userId}`,
            {
				resourceName: 'User',
			}
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getPendingUsers = async () => {
    try {
        const response = await axiosInstance.get(`/user/getPendingUsers`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateUserAcceptance = async (id, role, isAccepted) => {
    try {
        const response = await axiosInstance.post(
            `/user/changeAcceptance/${id}`,
            { role, isAccepted },
        );
        return response.data;
    } catch (error) {
        return error;
    }
}