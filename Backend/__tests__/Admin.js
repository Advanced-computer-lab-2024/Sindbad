const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../app");
const { startServer, stopServer } = require("../jest.setup");
const Admin = require("../models/Admin");

let adminId;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
	await startServer();
});

// After each test, clear the database
afterEach(async () => {
	await Admin.deleteMany();
});

// After all tests, stop MongoDB server
afterAll(async () => {
	await stopServer();
});

describe("Admin CRUD Operations", () => {
	// Passing Tests
	it("should create a new admin", async () => {
		const res = await request(app).post("/admin").send({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});

		expect(res.status).toBe(201);
		const admin = await Admin.findOne({ username: "testAdmin" });
		expect(admin).not.toBeNull();
		expect(admin.email).toBe("test@example.com");
	});

	it("should retrieve all admins", async () => {
		await request(app).post("/admin").send({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});

		const res = await request(app).get("/admin");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].username).toBe("testAdmin");
	});

	it("should retrieve an admin by ID", async () => {
		const admin = new Admin({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});
		await admin.save();

		const res = await request(app).get(`/admin/${admin._id}`);
		expect(res.status).toBe(200);
		expect(res.body.username).toBe("testAdmin");
	});

	it("should update an admin by ID", async () => {
		const admin = new Admin({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});
		await admin.save();

		const res = await request(app)
			.put(`/admin/${admin._id}`)
			.send({ username: "updatedAdmin" });

		expect(res.status).toBe(200);
		const updatedAdmin = await Admin.findById(admin._id);
		expect(updatedAdmin.username).toBe("updatedAdmin");
	});

	it("should delete an admin by ID", async () => {
		const admin = new Admin({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});
		await admin.save();

		const res = await request(app).delete(`/admin/${admin._id}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Admin deleted successfully!");

		const deletedAdmin = await Admin.findById(admin._id);
		expect(deletedAdmin).toBeNull();
	});

	// Failing Tests
	it("should not create an admin without an email", async () => {
		const res = await request(app).post("/admin").send({
			username: "testAdmin",
			passwordHash: "hashedPassword123",
		});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/`email` is required/);
	});

	it("should not create an admin with a duplicate email", async () => {
		await request(app).post("/admin").send({
			username: "testAdmin",
			email: "test@example.com",
			passwordHash: "hashedPassword123",
		});

		const res = await request(app).post("/admin").send({
			username: "duplicateAdmin",
			email: "test@example.com", // Same email as before
			passwordHash: "hashedPassword456",
		});

		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/duplicate key error/);
	});

	it("should return 404 when retrieving a non-existent admin by ID", async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app).get(`/admin/${nonExistentId}`);

		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Admin not found");
	});

	it("should return 404 when updating a non-existent admin by ID", async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.put(`/admin/${nonExistentId}`)
			.send({ username: "updatedAdmin" });

		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Admin not found");
	});

	it("should return 404 when deleting a non-existent admin by ID", async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app).delete(`/admin/${nonExistentId}`);

		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Admin not found");
	});
});