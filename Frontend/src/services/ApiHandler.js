import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

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
    console.log(requestBody);
    try {
        const response = await axios.post(`${baseURL}/user/signup`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            console.log('User created successfully:', response.data);
            return response;
        } else {
            return {
                error: true,
                message: `Unexpected status code: ${response.status}`,
            };
        }
    } catch (error) {
        // Handle any errors, such as network issues or validation errors
        if (error.response) {
            // Server responded with a status other than 2xx
            return {
                error: true,
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            // Request was made but no response received
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            // Something else happened while setting up the request
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
}

export const getTourist = async (touristId) => {
    try {
        const response = await axios.get(`${baseURL}/tourist/getTourist/${touristId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            return {
                error: true,
                message: 'Tourist not found.',
                status: 404,
            };
        } else {
            return {
                error: true,
                message: `Unexpected status code: ${response.status}`,
            };
        }
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};

export const getTourGuide = async (tourGuideId) => {
    try {
        const response = await axios.get(`${baseURL}/tourGuide/getTourGuide/${tourGuideId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            return {
                error: true,
                message: 'Tour guide not found.',
                status: 404,
            };
        } else {
            return {
                error: true,
                message: `Unexpected status code: ${response.status}`,
            };
        }
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};