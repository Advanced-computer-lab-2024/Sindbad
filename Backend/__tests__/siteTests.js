const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../app");
const { startServer, stopServer, clearDatabase } = require("../jest.setup");
const Site = require("../models/siteModel");
const Tag = require("../models/tagModel"); // Assuming you have a Tag model

let mongoServer;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
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

// Test Data
const testTag = async () => {
	const tag = new Tag({ name: "Test Tag" }); // Adjust according to your Tag model
	return await tag.save();
};

// TODO: Add tag creation from Salma's code
describe("Site CRUD Operations", () => {
	let tagId;

	beforeAll(async () => {
		const tag = await testTag();
		tagId = tag._id;
	});

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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
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
			tags: ["66f6fdde74045c90c09ad387"],
			creatorId: "66f6fd42af6f9d152eae4e7a",
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
			tags: ["66f6fdde74045c90c09ad387"],
			creatorId: "66f6fd42af6f9d152eae4e7a",
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
			tags: ["66f6fdde74045c90c09ad387"],
			creatorId: "66f6fd42af6f9d152eae4e7a",
		});
		await site.save();

		const res = await request(app).delete(`/site/${site._id}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Site deleted successfully!");

		const deletedSite = await Site.findById(site._id);
		expect(deletedSite).toBeNull();
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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Please add a name for your site/);
	});

	// Test for creating a site with a duplicate name
	it("should not create a site with a duplicate name", async () => {
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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
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
				tags: ["66f6fdde74045c90c09ad387"],
				creatorId: "66f6fd42af6f9d152eae4e7a",
			});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Closing time/);
	});
});

