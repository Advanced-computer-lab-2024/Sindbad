const request = require("supertest"); // Library for testing HTTP requests
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app, server } = require("../app");
const Admin = require("../models/adminModel");

let mongoServer;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	// Start MongoDB Memory Server
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	// Connect mongoose to the in-memory MongoDB
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongoUri);
	}
});

// After each test, clear the database
afterEach(async () => {
	await Admin.deleteMany({});
});

// After all tests, close the connection and stop MongoDB server
afterAll(async () => {
	await mongoose.connection.close();
	await mongoServer.stop();
	await new Promise((resolve) => server.close(resolve)); // Close the Express server
});

describe("POST /admin", () => {
	it("should create a new admin", async () => {
		const res = await request(app).post("/admin").send({
			username: "testAdmin",
			password: "password123",
		});

		expect(res.status).toBe(201);

		// Verify if the admin was saved in the database
		const admin = await Admin.findOne({ username: "testAdmin" });
		expect(admin).not.toBeNull();
		expect(admin.username).toBe("testAdmin");
	});
});
