const Amadeus = require('amadeus');

// Initialize the Amadeus client
const amadeus = new Amadeus({
    clientId: '2bLRz6HydYL38wFK5zLvp87oKL9wXFd4',
    clientSecret: 'RS6NV3AdNBplILej'
  });


//searches for a certain flight
//test: originLocationCode: 'JFK', destinationLocationCode: 'LAX', departureDate: '2024-12-01',adults: '1'
const searchFlights = async (req, res) => {
    const { origin, destination, date, adults } = req.body;
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: adults
        });
        res.json(response.data);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

//confirms that the price of that flight didnt change
const confirmFlightPrice = async (req, res) => {
    try {
        // Extract flight offer data from the request body
        const flightOfferData = req.body.data;
    
        // Make sure flightOffer data is provided
        if (!flightOfferData) {
          return res.status(400).json({ error: "Flight offer data is required" });
        }
    
        // Call the Flight Offers Pricing API with the provided flight offer data
        const response = await amadeus.shopping.flightOffers.pricing.post(
          JSON.stringify({ data: flightOfferData })
        );
    
        // Send the pricing confirmation response to the client
        res.status(200).json(response.data);
      } catch (error) {
        // Log error details for debugging
        console.error("Error confirming flight pricing:", error);
    
        // Respond with an appropriate error message and status code
        res.status(500).json({ error: "Failed to confirm flight pricing" });
      }
};



module.exports = {
    searchFlights,
    confirmFlightPrice,
};