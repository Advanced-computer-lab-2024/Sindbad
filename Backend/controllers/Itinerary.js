const Itinerary = require("../models/Itinerary");
const mongoose = require("mongoose");
const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Sale = require("../models/Sale");
const nodemailer = require("nodemailer");
require("dotenv").config();


//Email prefrences
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL, // Your Gmail address
      pass: process.env.GMAILPASSWORD    // Your Gmail App Password
  }
});
/**
 * @route GET /itinerary/:id
 * @description Retrieve a specific itinerary by ID
 * @param {string} req.params.id - The ID of the itinerary to retrieve
 * @returns {Object} 200 - The itinerary object if found
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 500 - Error message if an error occurs
 */
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate(
      "activities"
    );
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting itinerary",
      error: error.message,
    });
  }
};

/**
 * @route POST /itinerary
 * @description Create a new itinerary
 * @param {Object} req.body - The itinerary data to create
 * @returns {Object} 201 - The created itinerary object
 * @returns {Object} 500 - Error message if an error occurs
 */
const createItinerary = async (req, res) => {
  try {
    const newItinerary = await Itinerary.create(req.body);
    res.status(201).json(newItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating itinerary",
      error: error.message,
    });
  }
};

/**
 * @route PUT /itinerary/:id
 * @description Update an existing itinerary by ID
 * @param {string} req.params.id - The ID of the itinerary to update
 * @param {Object} req.body - The data to update the itinerary with
 * @returns {Object} 200 - The updated itinerary object
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 500 - Error message if an error occurs
 */
const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const updatedData = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itineraryId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json(updatedItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating itinerary",
      error: error.message,
    });
  }
};

/**
 * @description Deletes an itinerary by its ID.
 * @route DELETE /itinerary/:id
 * @param {string} id - The ID of the itinerary to be deleted.
 * @returns {Object} - A success message if the itinerary is deleted, or an error message if the itinerary is not found or cannot be deleted.
 * @throws {404} - Itinerary not found if the ID does not exist.
 * @throws {400} - Cannot delete itinerary if it has been booked already.
 * @throws {500} - Error deleting itinerary if there is a server issue.
 */
const deleteItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.availableDatesTimes) {
      // Calculate the total headCount by summing up headCounts in availableDatesTimes
      const totalHeadCount = itinerary.availableDatesTimes.reduce(
        (sum, date) => sum + date.headCount,
        0
      );

      // Check if the total headCount is greater than 0
      if (totalHeadCount > 0) {
        return res.status(400).json({
          message: "Cannot delete itinerary because it has been booked already",
        });
      }
    }

    await Itinerary.findByIdAndDelete(itineraryId);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting itinerary",
      error: error.message,
    });
  }
};

/**
 * @description Retrieves all itineraries created by a specific creator.
 * @route GET /my-itineraries/:id
 * @param {string} id - The ID of the creator whose itineraries are to be fetched.
 * @returns {Array} - An array of itineraries created by the specified creator.
 * @throws {404} - No itineraries found for this creator.
 * @throws {500} - Error fetching itineraries if there is a server issue.
 */
const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      creatorId: req.params.creatorId,
    });

    if (itineraries.length === 0) {
      return res
        .status(404)
        .json({ message: "No itineraries found for this creator." });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};

/**
 * @description Searches, sorts, and filters itineraries based on various criteria using query parameters.
 * @route GET /itinerary
 * @param {Object} req - The request object containing search, sorting, and filtering parameters.
 * @param {Object} res - The response object containing matching itineraries or an error message.
 * @param {number} [req.query.rating]
 * @returns {Array} - An array of itineraries matching the criteria.
 * @throws {400} - If the search term is not provided (when search is used).
 * @throws {404} - If no itineraries are found matching the criteria.
 * @throws {500} - If there is an error during the retrieval process.
 */
const getAllItineraries = async (req, res) => {
  try {
    const {
      searchTerm,
      budget = {},
      date = {},
      tag,
      rating = {},
      language,
      sortBy = "availableDatesTimes", // Default sorting by available dates times
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Create filter object based on provided criteria
    const filter = {
      // Uncomment if needed to filter for upcoming available date times
      availableDatesTimes: { $elemMatch: { dateTime: { $gte: new Date() } } },
      // Default filter for inappropriate itineraries and active itineraries
      isInappropriate: false,
      isActive: true,
    };

    // Budget filter
    if (budget.min || budget.max) {
      filter.$or = [
        {
          price: {
            ...(budget.min && { $gte: +budget.min }),
            ...(budget.max && { $lte: +budget.max }),
          },
        },
        {
          "price.min": {
            ...(budget.min && { $gte: +budget.min }),
            ...(budget.max && { $lte: +budget.max }),
          },
        },
      ];
    }

    // Date filter
    if (date.start || date.end) {
      filter.availableDatesTimes = {
        $elemMatch: {
          ...(date.start && { dateTime: { $gte: new Date(date.start) } }),
          ...(date.end && {
            dateTime: {
              $lte: new Date(new Date(date.end).setHours(23, 59, 59, 999)), // End of the day
            },
          }),
        },
      };
    }

    // Tag filter
    if (tag) {
      // Ensure that the tag is in ObjectId format
      const tagObjectId = new mongoose.Types.ObjectId(tag._id); // Convert to ObjectId if tag is a string

      filter.activities = {
        $elemMatch: { tags: tagObjectId },
      }; // Use $elemMatch to find itineraries with activities containing the tag
    }

    // Rating filter
    if (rating.min || rating.max) {
      filter.averageRating = {
        ...(rating.min && { $gte: +rating.min }),
        ...(rating.max && { $lte: +rating.max }),
      };
    }

    // Language filter
    if (language) {
      filter.languages = {
        $regex: new RegExp(language, "i"), // 'i' for case insensitive
      }; // Check if the itinerary supports this language with a case-insensitive regex
    }

    // Search term filter
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // Case-insensitive
      filter.$or = [{ name: regex }, { description: regex }];
    }

    // Sorting and pagination
    const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    const skip = (page - 1) * limit;

    // console.log("filter:", filter);
    // console.log("sortOptions:", sortOptions);

    // Fetch itineraries with aggregation
    const itineraries = await Itinerary.aggregate([
      {
        $lookup: {
          from: "activities", // The name of the collection to join
          localField: "activities", // The field from the itineraries collection
          foreignField: "_id", // The field from the activities collection
          as: "activities", // The name of the new array field to add to the itineraries documents
        },
      },
      {
        $match: filter, // Apply your filtering here
      },
      {
        $sort: sortOptions, // Sort the results
      },
      // {
      // 	$skip: skip, // Pagination
      // },
      // {
      // 	$limit: +limit, // Limit the number of results
      // },
    ]);

    if (itineraries.length === 0) {
      return res.status(204).send(); // 204 No Content for no results
    }

    // Respond with itineraries
    res.status(200).json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching itineraries.",
      error: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    // Validate input
    if (!userId || !comment) {
      return res
        .status(400)
        .json({ message: "User ID and comment are required." });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasBookedItinerary = tourist.bookedEvents.itineraries.some(
      (itinerary) => itinerary.itineraryId.toString() === id
    );

    if (!hasBookedItinerary) {
      return res.status(403).json({
        message: "Only users who have booked this Itinerary can rate it.",
      });
    }
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(405).json({ message: "Itinerary not found" });
    }

    // Add the comment to the itinerary's comments array
    itinerary.comments.push({ userId, comment });
    await itinerary.save();

    res.status(200).json({ message: "Comment added successfully", itinerary });
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
      error: error.message,
    });
  }
};

/**
 * @route POST /itinerary/:id/rate
 * @description Add a rating to an itinerary
 * @param {string} req.params.id - The ID of the itinerary to rate
 * @param {Object} req.body - Contains the rating value (1-5)
 * @returns {Object} 200 - The updated itinerary object
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 400 - Invalid rating value
 * @returns {Object} 500 - Error message if an error occurs
 */
const addRating = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const { userId, rating } = req.body;

    if (!userId || !rating) {
      return res
        .status(401)
        .json({ message: "userId and rating must be included " });
    }

    // Validate rating value
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid rating value. Must be between 1 and 5." });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasBookedItinerary = tourist.bookedEvents.itineraries.some(
      (itinerary) => itinerary.itineraryId.toString() === itineraryId
    );

    if (!hasBookedItinerary) {
      return res.status(403).json({
        message: "Only users who have booked this Itinerary can rate it.",
      });
    }

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (!(itinerary.rating instanceof Map)) {
      itinerary.rating = new Map(Object.entries(itinerary.rating));
    }

    // Check if the user has already rated this activity
    if (itinerary.userRatings.includes(userId)) {
      return res
        .status(403)
        .json({ message: "User has already rated this itinerary." });
    }

    // Add the rating and update average rating
    const currentCount = itinerary.rating.get(rating.toString()) || 0;
    itinerary.rating.set(rating.toString(), currentCount + 1);

    // Add the userId to the userRatings array
    itinerary.userRatings.push(userId);

    itinerary.averageRating = calculateAverageRating(itinerary.rating);
    await itinerary.save();

    res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error adding rating to itinerary",
      error: error.message,
    });
  }
};

const calculateAverageRating = (ratings) => {
  let totalRating = 0;
  let totalVotes = 0;

  // Use the entries of the Map and a for...of loop
  for (const [rating, count] of ratings.entries()) {
    totalRating += parseInt(rating) * count; // Multiply rating by the number of votes
    totalVotes += count; // Sum the number of votes
  }

  return totalVotes > 0 ? totalRating / totalVotes : 0; // Return average or 0 if no votes
};

function getHeadCountForDate(itinerary, targetDate) {
  // Convert targetDate to a Date object if it isn't one already
  const targetDateObj = new Date(targetDate);

  // Find the object in availableDatesTimes that matches the target date
  const dateEntry = itinerary.availableDatesTimes.find(
    (entry) => entry.dateTime.getTime() === targetDateObj.getTime()
  );

  // Check if a matching date was found and return the headCount
  if (dateEntry) {
    return dateEntry.headCount;
  } else {
    console.log("Date not found in available dates");
    return null; // Or handle the case where the date isn't found
  }
}

function setHeadCountForDate(itinerary, targetDate, newHeadCount) {
  const targetDateObj = new Date(targetDate);

  // Find the index of the object in availableDatesTimes that matches the target date
  const dateIndex = itinerary.availableDatesTimes.findIndex(
    (entry) => entry.dateTime.getTime() === targetDateObj.getTime()
  );

  // Check if a matching date was found
  if (dateIndex !== -1) {
    // Update the headCount for the matching date
    itinerary.availableDatesTimes[dateIndex].headCount = newHeadCount;
    console.log("Head count updated successfully");
    return itinerary;
  } else {
    console.log("Date not found in available dates");
    return null;
  }
}

/**
 * Books an itinerary for a tourist.
 *
 * @async
 * @function bookItinerary
 * @param {Object} req - Request object containing booking details.
 * @param {Object} res - Response object for sending results or errors.
 *
 * @throws {Error} If a server error occurs.
 */

const bookItinerary = async (req, res) => {
  try {
    const { date, adultTicketCount, childTicketCount, itineraryId, userId } =
      req.body;
    let itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.isInappropriate) {
      return res.status(400).json({
        message:
          "This itinerary cannot be booked as it has been flagged as inappropriate.",
      });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyBooked = tourist.bookedEvents.itineraries.some(
      (booking) =>
        booking.itineraryId.toString() === itineraryId.toString() &&
        new Date(booking.dateBooked).toString() === new Date(date).toString()
    );

    if (alreadyBooked) {
      return res.status(400).json({
        message:
          "You have already booked this itinerary for the selected date.",
      });
    }

    if (!itinerary.isBookingOpen) {
      return res.status(400).json({ message: "Bookings are currently closed" });
    }

    if (adultTicketCount == 0 && childTicketCount == 0)
      return res.status(400).json({ message: "Please select ticket count" });

    let priceCharged;
    if (typeof itinerary.price === "number") {
      priceCharged = itinerary.price * (adultTicketCount + childTicketCount);
    } else {
      const { min, max } = itinerary.price;
      priceCharged = min * (adultTicketCount + childTicketCount);
    }

    if (tourist.wallet < priceCharged) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    headcount = getHeadCountForDate(itinerary, date);
    itinerary = setHeadCountForDate(
      itinerary,
      date,
      headcount + adultTicketCount + childTicketCount
    );

    await itinerary.save();

    // Create a record in the Sale document
    await Sale.create({
      type: "Itinerary",
      itemId: itineraryId,
      quantity: adultTicketCount + childTicketCount,
      buyerId: userId,
      totalPrice: priceCharged,
    });

    tourist.wallet -= priceCharged;

    tourist.bookedEvents.itineraries.push({
      itineraryId: itineraryId,
      ticketsBooked: childTicketCount + adultTicketCount,
      dateBooked: new Date(date),
    });
    await tourist.save();

    let loyaltyPoints = tourist.loyaltyPoints;
    switch (tourist.level) {
      case 1:
        loyaltyPoints += priceCharged * 0.5;
        break;
      case 2:
        loyaltyPoints += priceCharged;
        break;
      case 3:
        loyaltyPoints += priceCharged * 1.5;
        break;
    }
    tourist.loyaltyPoints = loyaltyPoints;
    await tourist.save();

    let level = tourist.level;
    if (loyaltyPoints > 100000 && loyaltyPoints <= 500000) level = 2;
    if (loyaltyPoints > 500000) level = 3;
    tourist.level = level;
    await tourist.save();

    res.status(200).json({
      message: "Itinerary booked successfully",
      itinerary,
      priceCharged,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error booking itinerary",
      error: err.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { date, itineraryId, userId } = req.body;
    let itinerary = await Itinerary.findById(itineraryId);
    const currentDate = new Date();
    const datePlus48Hours = new Date(
      currentDate.getTime() + 48 * 60 * 60 * 1000
    );

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (new Date(date) <= datePlus48Hours) {
      return res.status(400).json({
        message:
          "You cannot cancel the itinerary as it is too close or already passed.",
      });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const itineraryInArray = tourist.bookedEvents.itineraries.find(
      (itinerary) => itinerary.itineraryId.toString() === itineraryId.toString()
    );
    console.log(itineraryInArray);

    if (!itineraryInArray)
      return res
        .status(400)
        .json({ message: "Itinerary not booked and can't be cancelled" });

    let priceCharged;
    if (typeof itinerary.price === "number") {
      priceCharged = itinerary.price * itineraryInArray.ticketsBooked;
    } else {
      const { min, max } = itinerary.price;
      priceCharged = min * itineraryInArray.ticketsBooked;
    }

    headcount = getHeadCountForDate(itinerary, date);
    itinerary = setHeadCountForDate(
      itinerary,
      date,
      headcount - itineraryInArray.ticketsBooked
    );

    await itinerary.save();

    tourist.wallet += priceCharged;

    // Create a record in the Sale document with a negative totalPrice
    await Sale.create({
      itineraryId: itineraryId,
      buyerId: userId,
      totalPrice: -priceCharged,
    });

    let loyaltyPoints = tourist.loyaltyPoints;
    switch (tourist.level) {
      case 1:
        loyaltyPoints -= priceCharged * 0.5;
        break;
      case 2:
        loyaltyPoints -= priceCharged;
        break;
      case 3:
        loyaltyPoints -= priceCharged * 1.5;
        break;
    }
    tourist.loyaltyPoints = loyaltyPoints;

    let level = tourist.level;
    if (loyaltyPoints <= 100000) level = 1;
    if (loyaltyPoints > 100000 && loyaltyPoints <= 500000) level = 2;
    if (loyaltyPoints > 500000) level = 3;
    tourist.level = level;

    tourist.bookedEvents.itineraries = tourist.bookedEvents.itineraries.filter(
      (itinerary) => {
        return (
          itinerary.itineraryId.toString() !== itineraryId.toString() ||
          new Date(itinerary.dateBooked).toString() !==
            new Date(date).toString()
        );
      }
    );

    await tourist.save();
    res.status(200).json({ message: "Itinerary cancelled successfully" });
  } catch (error) {
    // console.error("Error canceling activity:", error);
    res.status(500).json({
      message: "Error canceling activity",
      error: error.message,
    });
  }
};

const setIsInappropriate = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const { isInappropriate } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Find the tour guide associated with the itinerary
    const tourguide = await TourGuide.findById(itinerary.creatorId);
    if (!tourguide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    itinerary.isInappropriate = isInappropriate;
    await itinerary.save();
    if(isInappropriate){
      // Create a new notification
      const notification = {
        title: "Itinerary Flagged",
        Body: `Your itinerary "${itinerary.name}" has been flagged as inappropriate.`,
        isSeen: false,
      };
      tourguide.Notifications.push(notification);
      await tourguide.save();

      //send an email
      const mailOptions = {
        from: process.env.GMAIL,
        to: tourguide.email,
        subject: 'Itinerary Flagged',
        text: 'Your Itinerary '+ itinerary.name+ ' has been flagged as inappropriate.'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send(`Email sent: ${info.response}`);
      });
    }


    return res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error flagging itinerary as inappropriate",
      error: error.message,
    });
  }
};

module.exports = {
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getMyItineraries,
  bookItinerary,
  cancelBooking,
  addRating,
  addComment,
  setIsInappropriate,
};
