const Amadeus = require('amadeus');
const Flight = require('../models/Flight');
const Sale = require('../models/Sale');
require('dotenv').config();

// Initialize the Amadeus client
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});


//searches for a certain flight
//test: originLocationCode: 'JFK', destinationLocationCode: 'LAX', departureDate: '2024-12-01',adults: '1'
const searchFlights = async (req, res) => {
    const { origin, destination, date, adults } = req.query;

    console.log(req.query);
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

const bookFlight = async (req, res) => {
  
  //1-Book the flight
  const flightOffer = req.body.data.flightOffers[0];

  const {dateOfBirth,firstName,lastName,gender, email, countryCallingCode,phoneNumber,
    birthPlace,passportIssuanceLocation,passportIssuanceDate,passportNumber,passportExpiryDate,passportIssuanceCountry,
    nationality} = req.body.travelers;

  const travelerDetails =
    {
        id: '1',
        dateOfBirth: dateOfBirth,
        name: { firstName: firstName, lastName: lastName},
        gender: gender,
        contact: {
            emailAddress: email,
            phones: [{ deviceType: 'MOBILE', countryCallingCode: countryCallingCode, number: phoneNumber }]
        },
        documents: [
            {
                documentType: 'PASSPORT',
                birthPlace: birthPlace,
                issuanceLocation: passportIssuanceLocation,
                issuanceDate: passportIssuanceDate,
                number: passportNumber,
                expiryDate: passportExpiryDate,
                issuanceCountry: passportIssuanceCountry,
                validityCountry: passportIssuanceCountry,
                nationality: nationality,
                holder: true
            }
        ]
    };
  
  
  let responseBooked;
  try {
      responseBooked= await amadeus.booking.flightOrders.post(
          JSON.stringify({
              data: {
                  type: 'flight-order',
                  flightOffers: [flightOffer],
                  travelers: [travelerDetails]  // Wrap travelerDetails in an array
              }
          })
      );
      //res.status(200).json(responseBooked.data);
  } catch (err) {
      console.error(err.response); // Log the full error response for debugging
      res.status(500).json({ error: "Failed to book flight" });
  }

  //2- save the booking information
  const travelerID = req.body.travelerID;
  const temp = responseBooked.data;
  const flightDataResponseArray = temp.flightOffers;
  const flightDataResponse = temp.flightOffers[0];


  // Concatenate carrierCode and number
  const flightNumbers = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary => 
      itinerary.segments.map(segment => `${segment.carrierCode}${segment.number}`)
    )
  );

  const durations = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary =>
        itinerary.segments.map(segment => {
            const departureTime = new Date(segment.departure.at);
            const arrivalTime = new Date(segment.arrival.at);

            // Calculate duration in milliseconds and convert to hours
            const durationHours = (arrivalTime - departureTime) / (1000 * 60 * 60);
            return durationHours;
        })
    )
  );

  // Extract the departure time
  const departureTimes = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary =>
      itinerary.segments.map(segment =>segment.departure.at  )
    )
  );

  // Extract the departure time
  const arrivalTimes = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary =>
        itinerary.segments.map(segment =>segment.arrival.at )
    )
  );

  // Extract the departure time
  const departureLocations = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary =>
        itinerary.segments.map(segment =>segment.departure.iataCode  )
    )
  );

  // Extract the departure time
  const arrivalLocations = flightDataResponseArray.flatMap(offer => 
    offer.itineraries.flatMap(itinerary =>
        itinerary.segments.map(segment =>segment.arrival.iataCode )
    )
  );
  const flightData = {
    BookingNumber:flightDataResponse.id,
    FlightNumber:flightNumbers,
    Duration:durations,
    DepartureLocation:departureLocations,
    ArrivalLocation:arrivalLocations,
    DepartureDateTime:departureTimes,
    ArrivalDateTime:arrivalTimes,
    price:flightDataResponse.price.total,
    travelerID : travelerID,
  };

  try {
    const flight = await Flight.create(flightData);
    await Sale.create({
      type: "Flight",
      itemId: flight._id,
      buyerId: travelerID,
      totalPrice: flight.price,
    });
    return res.status(200).json(flight);
  } catch (err) {
    console.error("Error saving flight data:", err);
    return res.status(500).json({ error: "Failed to save flight data" });
  }
};


module.exports = {
    searchFlights,
    confirmFlightPrice,
    bookFlight,
};