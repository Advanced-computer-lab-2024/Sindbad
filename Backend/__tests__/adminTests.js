const request = require("supertest"); // Library for testing HTTP requests
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { startServer, stopServer, clearDatabase } = require("../jest.setup");
const { app } = require("../app");
const Admin = require("../models/adminModel");

let mongoServer;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
});

// After each test, clear the database
afterEach(async () => {
	await Admin.deleteMany({});
});

// After all tests, close the connection and stop MongoDB server
afterAll(async () => {
	await stopServer();
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
