const Tag = require("../models/Tag");
const mongoose = require("mongoose");

/**
 * Creates a new tag
 *
 * @param {Object} req - Request object containing tag details
 * @param {Object} res - Response object for sending the result
 * @returns {Object} - JSON object of the created tag or error message
 *
 * @throws {400} - If tag name already exists
 */

const createTag = async (req, res) => {
	try {
		const tag = await Tag.create(req.body);
		res.status(201).json(tag);
	} catch (error) {
		if (error.code === 11000) {
			// MongoDB duplicate key error
			return res.status(400).json({
				message: "Tag name already exists",
			});
		}
		return res.status(500).json({
			message: "Error creating tag",
			error: error.message,
		});
	}
};

/**
 * Retrieves a tag by its ID
 *
 * @param {Object} req - The request object containing the tag ID or name in params
 * @param {Object} res - The response object used to send the retrieved tag or an error message
 * @returns {Object} - A JSON object of the retrieved tag or an error message
 */

const getTagById = async (req, res) => {
	const { id } = req.params;

	try {
		let tag;

		if (mongoose.Types.ObjectId.isValid(id)) {
			tag = await Tag.findById(id);
		} else {
			tag = await Tag.findOne({ name: id });
		}

		if (!tag) {
			return res.status(404).json({ message: "Tag not found" });
		}
		res.status(200).json(tag);
	} catch (error) {
		return res.status(500).json({
			message: "Error getting tag",
			error: error.message,
		});
	}
};

/**
 * Deletes a tag by its ID
 *
 * @param {Object} req - Request object containing the tag ID
 * @param {Object} res - Response object for sending status and message
 */

const deleteTag = async (req, res) => {
	try {
		const deletedTag = await Tag.findByIdAndDelete(req.params.id);

		if (!deletedTag) {
			return res.status(404).json({ message: "Tag not found" });
		}

		res.status(200).json({ message: "Tag deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Error deleting tag",
			error: error.message,
		});
	}
};

/**
 * Updates a tag
 *
 * @param {Object} req - Request with tag ID in params and updated data in the body
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated tag or error message
 */

const updateTag = async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;

		const updatedTag = await Tag.findByIdAndUpdate(
			id,
			{ name },
			{ new: true, runValidators: true }
		);

		if (!updatedTag) {
			return res.status(404).json({ message: "Tag not found" });
		}

		res.status(200).json(updatedTag);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating tag", error: error.message });
	}
};

/**
 * Retrieves all tags
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object for sending the retrieved tags or an error message
 * @returns {Object} - A JSON array of all tags or an error message
 */
const getAllTags = async (req, res) => {
	try {
		const tags = await Tag.find(); // Retrieves all tags from the database
		res.status(200).json(tags); // Responds with the tags
	} catch (error) {
		return res.status(500).json({
			message: "Error getting tags",
			error: error.message,
		});
	}
};

module.exports = {
	createTag,
	getTagById,
	getAllTags,
	deleteTag,
	updateTag,
};
