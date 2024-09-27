const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { server } = require("./app");

let mongoServer;

module.exports = {
    startServer: async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        }
    },
    stopServer: async () => {
            await mongoose.disconnect();
			await mongoServer.stop();
			await new Promise((resolve) => server.close(resolve));
		}
};
