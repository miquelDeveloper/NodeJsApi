const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
    // Global setup - runs once before all tests
    console.log('🚀 Starting MongoDB Memory Server for tests...');
    
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.API_KEY = 'test-api-key-123';
    
    // Create and start MongoDB Memory Server
    global.__MONGOD__ = await MongoMemoryServer.create();
    const mongoUri = global.__MONGOD__.getUri();
    
    // Set the MongoDB URI for all tests
    process.env.MONGODB_URI = mongoUri;
    
    console.log('✅ MongoDB Memory Server started at:', mongoUri);
};
