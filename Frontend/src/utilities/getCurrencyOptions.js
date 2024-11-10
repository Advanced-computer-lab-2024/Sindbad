// fetchCurrencyOptions.js
import { Convert } from "easy-currencies";

export async function getCurrencyOptions() {
    try {
        // Fetch the conversion rates using "USD" as the base currency
        const convert = await Convert().from("USD").fetch();

        // Extract currency codes (keys of the `rates` object) and return as an array
        return Object.keys(convert.rates);
    } catch (error) {
        console.error("Error fetching currency options:", error);
        return []; // Return an empty array on error
    }
}
