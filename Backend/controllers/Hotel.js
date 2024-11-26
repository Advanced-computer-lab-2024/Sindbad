const Amadeus = require('amadeus');
const { Hotel } = require('../models/Hotel');
const clientId = process.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = process.env.VITE_AMADEUS_CLIENT_SECRET;

const amadeus = new Amadeus({
	clientId: clientId,
	clientSecret: clientSecret
});

const getHotelsByCity = async (req, res) => {
	const { cityCode, radius } = req.query;

	try {
		const response = await amadeus.referenceData.locations.hotels.byCity.get({
			cityCode: cityCode,
			radius: radius
		});
		res.json(response.data);
	} catch (error) {
		console.error("Error fetching hotels:", error);
		res.status(500).send("Error fetching hotels");
	}
};

const getHotelsByGeocode = async (req, res) => {
	const { latitude, longitude, radius } = req.query;

	try {
		const response = await amadeus.referenceData.locations.hotels.byGeocode.get({
			latitude: latitude,
			longitude: longitude,
			radius: radius
		});
		res.json(response.data);
	} catch (error) {
		console.error("Error fetching hotels:", error);
		res.status(500).send("Error fetching hotels");
	}
};

const getHotelOffers = async (req, res) => {
	const { hotelId } = req.params;

	try {
		const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelId,
    });
		res.json(response.data);
	} catch (error) {
		console.error("Error fetching hotel offers:", error);
		res.status(500).send("Error fetching hotel offers");
	}
};


const bookHotel = async (req, res) => {
	const { bookingData, id, travelerID } = req.body;

	bookingData.type = "hotel-order";
	let tidCounter = 1;
	bookingData.guests = bookingData.guests.map((guest) => {
		return {
			...guest,
			tid: tidCounter++,
		};
	});
	bookingData.travelAgent = {
		contact: {
			email: "farah.eltaher@sindbad.com",
		},
	};
	bookingData.roomAssociations = bookingData.guests.map((guest) => {
		return {
			guestReferences: [
				{
					guestReference: guest.tid.toString(),
				},
			],
			hotelOfferId: id,
		};
	});
	let request = {};
	request.data = bookingData;

	try {
		const response = await amadeus.booking.hotelOrders.post(
			JSON.stringify(request)
		);

        const hotelBookingResponse = response.result.data

        //   const flightData = {
        //     BookingNumber: flightDataResponse.id,
        //     FlightNumber: flightNumbers,
        //     Duration: durations,
        //     DepartureLocation: departureLocations,
        //     ArrivalLocation: arrivalLocations,
        //     DepartureDateTime: departureTimes,
        //     ArrivalDateTime: arrivalTimes,
        //     price: flightDataResponse.price.total,
        //     travelerID: travelerID,
        //   };

        console.log(response.result.data);

		res.json(response.result.data);
	} catch (error) {
		console.error("Error booking hotel:", error);
		res.status(500).send("Error booking hotel");
	}
};

module.exports = { getHotelsByCity, getHotelsByGeocode, bookHotel, getHotelOffers };
