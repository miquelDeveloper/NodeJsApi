const mongoose = require('mongoose');

// Connect to MongoDB Memory Server (already started in globalSetup)
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Cleanup after each test suite
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
});

// Cleanup after each individual test
afterEach(async () => {
    if (mongoose.connection.readyState !== 0) {
        // Clear all collections instead of dropping the entire database
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
});
