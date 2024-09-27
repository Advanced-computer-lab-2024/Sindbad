const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../app");
const { startServer, stopServer, clearDatabase } = require("../jest.setup");
const Site = require("../models/siteModel");
const Tag = require("../models/tagModel"); // Assuming you have a Tag model

let mongoServer;
let tagId;
let creatorId;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
	const tag = new Tag({ name: "Test Tag" });
	await tag.save();
	tagId = tag._id;
	creatorId = new mongoose.Types.ObjectId();
});

// After each test, clear the database
afterEach(async () => {
	await Site.deleteMany({});
	await Tag.deleteMany({});
});

// After all tests, close the connection and stop MongoDB server
afterAll(async () => {
	await stopServer();
});

// TODO: Add tag creation from Salma's code
describe("Site CRUD Operations", () => {

	it("should create a new site", async () => {
		const res = await request(app)
			.post("/site")
			.send({
				name: "Test Site",
				description: "This is a test site.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		expect(res.status).toBe(201);
		const site = await Site.findOne({ name: "Test Site" });
		expect(site).not.toBeNull();
		expect(site.name).toBe("Test Site");
	});

	it("should retrieve all sites", async () => {
		await request(app)
			.post("/site")
			.send({
				name: "Test Site",
				description: "This is a test site.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		const res = await request(app).get("/site");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Site");
	});

	it("should retrieve a site by ID", async () => {
		const site = new Site({
			name: "Test Site",
			description: "This is a test site.",
			imageUris: ["http://example.com/image1.jpg"],
			location: "Test Location",
			openingHours: {
				monday: { start: 420, end: 1020 },
			},
			ticketPrices: [10, 15],
			tags:[tagId],
			creatorId: creatorId
		});
		await site.save();

		const res = await request(app).get(`/site/${site._id}`);
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("Test Site");
	});

	it("should update a site by ID", async () => {
		const site = new Site({
			name: "Test Site",
			description: "This is a test site.",
			imageUris: ["http://example.com/image1.jpg"],
			location: "Test Location",
			openingHours: {
				monday: { start: 420, end: 1020 },
			},
			ticketPrices: [10, 15],
			tags:[tagId],
			creatorId: creatorId
		});
		await site.save();

		const res = await request(app)
			.put(`/site/${site._id}`)
			.send({ name: "Updated Site" });

		expect(res.status).toBe(200);
		const updatedSite = await Site.findById(site._id);
		expect(updatedSite.name).toBe("Updated Site");
	});

	it("should delete a site by ID", async () => {
		const site = new Site({
			name: "Test Site",
			description: "This is a test site.",
			imageUris: ["http://example.com/image1.jpg"],
			location: "Test Location",
			openingHours: {
				monday: { start: 420, end: 1020 },
			},
			ticketPrices: [10, 15],
			tags:[tagId],
			creatorId: creatorId
		});
		await site.save();

		const res = await request(app).delete(`/site/${site._id}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Site deleted successfully!");

		const deletedSite = await Site.findById(site._id);
		expect(deletedSite).toBeNull();
	});

	it("should retrieve all sites created by a user", async () => {
		const site1 = new Site({
			name: "Test Site 1",
			description: "This is a test site.",
			imageUris: ["http://example.com/image1.jpg"],
			location: "Test Location",
			openingHours: {
				monday: { start: 420, end: 1020 },
			},
			ticketPrices: [10, 15],
			tags:[tagId],
			creatorId: creatorId
		});
		await site1.save();

		const site2 = new Site({
			name: "Test Site 2",
			description: "This is another test site.",
			imageUris: ["http://example.com/image2.jpg"],
			location: "Test Location",
			openingHours: {
				monday: { start: 420, end: 1020 },
			},
			ticketPrices: [10, 15],
			tags:[tagId],
			creatorId: creatorId
		});
		await site2.save();

		const res = await request(app).get(`/site/my-sites/${creatorId}`);
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(2);
		expect(res.body[0].name).toBe("Test Site 1");
		expect(res.body[1].name).toBe("Test Site 2");
	});
});

describe("Site CRUD Operations - Failing Tests", () => {
	// Test for creating a site without a name
	it("should not create a site without a name", async () => {
		const res = await request(app)
			.post("/site")
			.send({
				description: "This is a test site.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Please add a name for your site/);
	});

	// Test for creating a site with a duplicate name
	it("should not create a site with a duplicate name", async () => {

		console.log("tagId", tagId);

		await request(app)
			.post("/site")
			.send({
				name: "Test Site",
				description: "This is a test site.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		const res = await request(app)
			.post("/site")
			.send({
				name: "Test Site", // Same name as before
				description: "This is a duplicate test site.",
				imageUris: ["http://example.com/image2.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/duplicate key error/);
	});

	// Test for retrieving a site that does not exist
	it("should return 404 for a site that does not exist", async () => {
		const res = await request(app).get("/site/66f6fd42af6f9d152eae4e7a");
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Site not found");
	});

	// Test for updating a site that does not exist
	it("should return 404 when updating a non-existing site", async () => {
		const res = await request(app)
			.put("/site/66f6fd42af6f9d152eae4e7a")
			.send({ name: "Updated Site" });
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Site not found");
	});

	// Test for deleting a site that does not exist
	it("should return 404 when deleting a non-existing site", async () => {
		const res = await request(app).delete("/site/66f6fd42af6f9d152eae4e7a");
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Site not found");
	});

	// Test for creating a site with invalid opening hours (end time before start time)
	it("should not create a site with invalid opening hours", async () => {
		const res = await request(app)
			.post("/site")
			.send({
				name: "Invalid Hours Site",
				description: "This site has invalid opening hours.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 1020, end: 420 }, // Invalid opening hours
				},
				ticketPrices: [10, 15],
				tags:[tagId],
				creatorId: creatorId
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Closing time/);
	});

	// Test for creating a site with negative ticket prices
	it("should not create a site with negative ticket prices", async () => {
		const res = await request(app)
			.post("/site")
			.send({
				name: "Negative Price Site",
				description: "This site has negative ticket prices.",
				imageUris: ["http://example.com/image1.jpg"],
				location: "Test Location",
				openingHours: {
					monday: { start: 420, end: 1020 },
				},
				ticketPrices: [-10, 15], // Invalid ticket prices
				tags:[tagId],
				creatorId: creatorId
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Ticket prices must be non-negative/);
	});

	// Test for retrieving all sites created by a user that does not exist
	it("should return 500 when getting sites for a non-existing user", async () => {
		const res = await request(app).get("/site/my-sites/66f6fd42af6f9d152eae4e7a");
		//Expect empty array
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(0);
	});
});

