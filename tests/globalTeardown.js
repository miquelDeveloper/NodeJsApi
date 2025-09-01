module.exports = async () => {
    // Global teardown - runs once after all tests
    console.log('🛑 Stopping MongoDB Memory Server...');
    
    if (global.__MONGOD__) {
        await global.__MONGOD__.stop();
        console.log('✅ MongoDB Memory Server stopped');
    }
};
