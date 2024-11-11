const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

const getAccessToken = async () => {
	const tokenEndpoint = "/amadeus/v1/security/oauth2/token";
	const params = new URLSearchParams();
	params.append("grant_type", "client_credentials");
	params.append("client_id", clientId);
	params.append("client_secret", clientSecret);

	try {
		const response = await axios.post(tokenEndpoint, params, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data.access_token;
	} catch (error) {
		console.error("Error fetching access token:", error);
		throw error;
	}
};

export const getFlights = async (details) => {
    const accessToken = await getAccessToken();

    try {
        const response = await axios.get(
            `${baseURL}/flight/findFlight?origin=${details.origin}&destination=${details.destination}&date=${details.date}&adults=${details.adults}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching flight offers:", error);
        throw error;
    }
};

export const confirmFlightPrice = async (data) => {
    const accessToken = await getAccessToken();

    try {
        const response = await axios.put(
            `${baseURL}/flight/confirmFlight`,
            { data },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error confirming flight price:", error);
        throw error;
    }
};

export const bookFlight = async (data) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.put(
      `${baseURL}/flight/bookFlight`,
       data ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error booking flight:", error);
    throw error;
  }
};