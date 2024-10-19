const request = require("supertest"); // Library for testing HTTP requests
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { startServer, stopServer, clearDatabase } = require("../jest.setup");
const { app } = require("../app");

const Tourist = require("../models/tourist");

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
});

// After each test, clear the database
afterEach(async () => {
	await Tourist.deleteMany({});
});

// After all tests, close the connection and stop MongoDB server
afterAll(async () => {
	await stopServer();
});

//test getting tourist based in id
describe("GET /tourist", () => {
	test("getTouristById retrieves a tourist by ID", async () => {
		// Verify if the admin was saved in the database
		const tourist = await Tourist.findOne({ username: "idk" });
		expect(tourist).not.toBeNull();
		expect(tourist.username).toBe("testAdmin");
	});

	test("getTouristById returns 404 for non-existent tourist", async () => {
		Tourist.findById.mockResolvedValueOnce(null);

		const req = { params: { id: 2 } };
		const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

		await getTouristById(req, res);

		expect(Tourist.findById).toHaveBeenCalledWith(2);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.send).toHaveBeenCalledWith("Cannot find Tourist");
	});

	test("getTouristById handles errors", async () => {
		Tourist.findById.mockRejectedValue(new Error("Database error"));

		const req = { params: { id: 3 } };
		const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

		await getTouristById(req, res);

		expect(Tourist.findById).toHaveBeenCalledWith(3);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
	});
});
//test updating tourist
