const Amadeus = require("amadeus");
const Hotel  = require("../models/Hotel");
const Sale = require("../models/Sale");
const clientId = process.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = process.env.VITE_AMADEUS_CLIENT_SECRET;

const amadeus = new Amadeus({
  clientId: clientId,
  clientSecret: clientSecret,
});

const getHotelsByCity = async (req, res) => {
  const { cityCode, radius } = req.query;

  try {
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode,
      radius: radius,
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
    const response = await amadeus.referenceData.locations.hotels.byGeocode.get(
      {
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      }
    );
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
  console.log(req.body);
  const { bookingValues, bookingId, travelerId } = req.body;

  bookingValues.type = "hotel-order";
  let tidCounter = 1;
  bookingValues.guests = bookingValues.guests.map((guest) => {
    return {
      ...guest,
      tid: tidCounter++,
    };
  });
  bookingValues.travelAgent = {
    contact: {
      email: "farah.eltaher@sindbad.com",
    },
  };
  bookingValues.roomAssociations = bookingValues.guests.map((guest) => {
    return {
      guestReferences: [
        {
          guestReference: guest.tid.toString(),
        },
      ],
      hotelOfferId: bookingId,
    };
  });
  let request = {};
  request.data = bookingValues;

  try {
    const response = await amadeus.booking.hotelOrders.post(
      JSON.stringify(request)
    );

    const hotelBookingResponse = response.result.data;

    console.log(travelerId);

    const flightData = {
      bookingId: hotelBookingResponse.id,
      travelerId: travelerId,
      bookingStatus: hotelBookingResponse.hotelBookings[0].bookingStatus,
      checkInDate: hotelBookingResponse.hotelBookings[0].hotelOffer.checkInDate,
      checkOutDate:
        hotelBookingResponse.hotelBookings[0].hotelOffer.checkOutDate,
      price:
        hotelBookingResponse.hotelBookings[0].hotelOffer.price.sellingTotal,
      hotelName: hotelBookingResponse.hotelBookings[0].hotel.name,
    };

    const hotel = await Hotel.create(flightData);
    await Sale.create({
      type: "Hotel",
      itemId: hotel._id,
      buyerId: travelerId,
      totalPrice: hotel.price,
    });

    res.json(response.result.data);
  } catch (error) {
    console.error("Error booking hotel:", error);
    res.status(500).send("Error booking hotel");
  }
};

module.exports = {
  getHotelsByCity,
  getHotelsByGeocode,
  bookHotel,
  getHotelOffers,
};
