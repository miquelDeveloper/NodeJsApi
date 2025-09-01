const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user');

describe('User API Integration Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'John Doe', email: 'john@example.com' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('_id');
    });

    it('should not create a user with duplicate email', async () => {
        await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Jane Doe', email: 'john@example.com' });
        const response = await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Jane Doe', email: 'john@example.com' });
        expect(response.status).toBe(409);
    });

    it('should list users with pagination', async () => {
        const response = await request(app)
            .get('/users?page=1&limit=5')
            .set('x-api-key', process.env.API_KEY);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('should get a user by id', async () => {
        const user = await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Alice', email: 'alice@example.com' });
        const response = await request(app)
            .get(`/users/${user.body.user._id}`)
            .set('x-api-key', process.env.API_KEY);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Alice');
    });

    it('should update a user', async () => {
        const user = await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Bob', email: 'bob@example.com' });
        const response = await request(app)
            .put(`/users/${user.body.user._id}`)
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Robert', email: 'bob@example.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Robert');
    });

    it('should delete a user', async () => {
        const user = await request(app)
            .post('/users')
            .set('x-api-key', process.env.API_KEY)
            .send({ name: 'Charlie', email: 'charlie@example.com' });
        const response = await request(app)
            .delete(`/users/${user.body.user._id}`)
            .set('x-api-key', process.env.API_KEY);
        expect(response.status).toBe(204);
    });

    it('should get user stats', async () => {
        const response = await request(app)
            .get('/users/stats')
            .set('x-api-key', process.env.API_KEY);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalUsers');
        expect(response.body).toHaveProperty('lastWeekUsers');
        expect(response.body).toHaveProperty('byDomain');
    });

    it('should reject requests without API key', async () => {
        const response = await request(app)
            .get('/users');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'API Key required');
    });

    it('should reject requests with invalid API key', async () => {
        const response = await request(app)
            .get('/users')
            .set('x-api-key', 'invalid-key');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid API Key');
    });
});