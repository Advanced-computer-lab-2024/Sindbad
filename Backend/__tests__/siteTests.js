const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../app");
const { startServer, stopServer, clearDatabase } = require("../jest.setup");
const Site = require("../models/siteModel");
const Tag = require("../models/tagModel"); // Assuming you have a Tag model

let tagId;
let creatorId;

const baseSiteData = {
	name: "Test Site",
	description: "This is a test site.",
	imageUris: ["http://example.com/image1.jpg"],
	location: {
		address: "123 Test St",
		coordinates: {
			lat: 40.7128,
			lng: -74.006,
		},
	},
	openingHours: {
		monday: { start: 420, end: 1020 },
	},
	ticketPrices: { adult: 20, child: 15 },
	tags: [], // Will assign tagId later
	creatorId: "", // Will assign creatorId later
};

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
	const tag = new Tag({ name: "Test Tag" });
	const savedTag = await tag.save();
	tagId = savedTag._id; // Ensure tagId is correctly assigned
	"Saved Tag ID", tagId;
	creatorId = new mongoose.Types.ObjectId();

	baseSiteData.tags = [tagId];
	baseSiteData.creatorId = creatorId;
});

// After each test, clear the database
afterEach(async () => {
	await Site.deleteMany({});
});

// After all tests, close the connection and stop MongoDB server
afterAll(async () => {
	await Tag.deleteMany({});
	await stopServer();
});

describe("Site CRUD Operations", () => {
	it("should create a new site", async () => {
		const res = await request(app).post("/site").send(baseSiteData);

		expect(res.status).toBe(201);
		const site = await Site.findOne({ name: "Test Site" });
		expect(site).not.toBeNull();
		expect(site.name).toBe("Test Site");
	});

	it("should retrieve all sites", async () => {
		await request(app).post("/site").send(baseSiteData);

		const res = await request(app).get("/site");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Site");
	});

	it("should populate tags when retrieving all sites", async () => {
		"tagId", tagId; // Check if tagId is valid here
		const site = new Site(baseSiteData);
		await site.save();
		const res = await request(app).get("/site");
		"Response Body", res.body; // Log the response body to see the actual data

		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Site");
		expect(res.body[0].tags[0].name).toBe("Test Tag");
	});

	it("should retrieve sites with a partially matching site name", async () => {
		siteData1 = JSON.parse(JSON.stringify(baseSiteData));
		siteData1.name = "Test Mosque";

		siteData2 = JSON.parse(JSON.stringify(baseSiteData));
		siteData2.name = "Cathedral";

		const site1 = new Site(siteData1);
		const site2 = new Site(siteData2);

		await site1.save();
		await site2.save();

		const res = await request(app).get("/site?siteName=mos");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Mosque");
	});

	it("should retrieve sites with a partially matching tag name", async () => {
		siteData1 = JSON.parse(JSON.stringify(baseSiteData));
		siteData1.name = "Test Mosque";

		const site1 = new Site(siteData1);

		await site1.save();

		const res1 = await request(app).get("/site");
		res1.body;

		const res = await request(app).get("/site?tagName=tes");
		res.body;
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Mosque");
	});

	it("should retrieve sites with both matching site name and tag name", async () => {
		siteData1 = JSON.parse(JSON.stringify(baseSiteData));
		siteData1.name = "Test Mosque";

		const site1 = new Site(siteData1);

		await site1.save();

		const res = await request(app).get("/site?siteName=mos&tagName=tes");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Test Mosque");
	});

	it("should retrieve a site by ID", async () => {
		const site = new Site(baseSiteData);
		await site.save();

		const res = await request(app).get(`/site/${site._id}`);
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("Test Site");
	});

	it("should update a site by ID", async () => {
		const site = new Site(baseSiteData);
		await site.save();

		const res = await request(app)
			.put(`/site/${site._id}`)
			.send({ name: "Updated Site" });

		expect(res.status).toBe(200);
		const updatedSite = await Site.findById(site._id);
		expect(updatedSite.name).toBe("Updated Site");
	});

	it("should delete a site by ID", async () => {
		const site = new Site(baseSiteData);
		await site.save();

		const res = await request(app).delete(`/site/${site._id}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Site deleted successfully!");

		const deletedSite = await Site.findById(site._id);
		expect(deletedSite).toBeNull();
	});

	it("should retrieve all sites created by a user", async () => {
		siteData1 = JSON.parse(JSON.stringify(baseSiteData));
		siteData1.name = "Test Site 1";

		siteData2 = JSON.parse(JSON.stringify(baseSiteData));
		siteData2.name = "Test Site 2";

		const site1 = new Site(siteData1);
		await site1.save();

		const site2 = new Site(siteData2);
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
		failSiteData = { ...baseSiteData };
		delete failSiteData.name;

		const res = await request(app).post("/site").send(failSiteData);

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Please add a name for your site/);
	});

	// Test for creating a site with a duplicate name
	it("should not create a site with a duplicate name", async () => {
		await request(app).post("/site").send(baseSiteData);

		const res = await request(app).post("/site").send(baseSiteData);

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/duplicate key error/);
	});

	it("should return an empty array for non-matching site name", async () => {
		const site = new Site(baseSiteData);

		await site.save();

		const res = await request(app).get("/site?siteName=nonexistent");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(0);
	});

	it("should return an empty array for non-matching tag name", async () => {
		const site = new Site(baseSiteData);

		await site.save();

		const res = await request(app).get("/site?tagName=nonexistent");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(0);
	});

	it("should not return site if site name matches but tag name does not match", async () => {
		const site = new Site(baseSiteData);

		await site.save();

		const res = await request(app).get(
			"/site?siteName=mos&tagName=nonexistent"
		);
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(0);
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
		failSiteData = { ...baseSiteData };
		failSiteData.openingHours.monday = { start: 1020, end: 420 }; // Invalid opening hours
		const res = await request(app).post("/site").send(failSiteData);

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/Closing time/);
	});

	// Test for creating a site with negative ticket prices
	it("should not create a site with negative ticket prices", async () => {
		failSiteData = { ...baseSiteData };
		failSiteData.ticketPrices = { adult: -20, child: 15 }; // Invalid ticket prices
		const res = await request(app).post("/site").send(failSiteData);

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/ticket prices must be non-negative/);
	});

	// Test for retrieving all sites created by a user that does not exist
	it("should return 500 when getting sites for a non-existing user", async () => {
		const res = await request(app).get(
			"/site/my-sites/66f6fd42af6f9d152eae4e7a"
		);
		//Expect empty array
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(0);
	});
});
