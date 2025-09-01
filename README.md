# Node.js Express API

A secure REST API for managing users with MongoDB, featuring authentication, validation, and comprehensive testing.

## 🚀 Features

- **Secure Authentication**: API Key-based authentication
- **User Management**: CRUD operations for users
- **Data Validation**: Input validation with express-validator
- **Pagination**: Built-in pagination for user listings
- **Search & Filtering**: Search users by name
- **Statistics**: User analytics and domain statistics
- **Rate Limiting**: Protection against abuse
- **Comprehensive Testing**: Unit and integration tests
- **Production Ready**: Optimized for Vercel deployment

## 📋 Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd node-express-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# API Security
API_KEY=your-secure-api-key-here

# Server Configuration
PORT=3000

# Environment
NODE_ENV=development
```

### Required Variables:
- `MONGODB_URI`: Connection string for MongoDB Atlas
- `API_KEY`: Secret key for API authentication (generate a secure random string)
- `PORT`: Port number for the server (default: 3000)
- `NODE_ENV`: Environment mode (development, production, test)

## 🚀 Running the Project

**Development:**
```bash
npm start
```

**Testing:**
```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with coverage
npm run test:coverage
```

## 🔐 Authentication

All API endpoints require authentication using an API Key. Include the API key in the request headers:

```http
x-api-key: your-secure-api-key-here
```

### Example with cURL:
```bash
curl -H "x-api-key: your-api-key" \
     -H "Content-Type: application/json" \
     https://your-api-url.com/users
```

### Example with Postman:
1. Go to **Headers** tab
2. Add header: `x-api-key` with value `your-api-key`

## 📚 API Documentation

### Base URL
- **Production**: `https://apinode-navy.vercel.app`
- **Development**: `http://localhost:3000`

### Common Headers
```http
Content-Type: application/json
x-api-key: your-secure-api-key-here
```

### Error Responses
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🔗 API Endpoints

### 1. Create User

**POST** `/users`

**Headers:**
```http
Content-Type: application/json
x-api-key: your-api-key
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Success Response (201):**
```json
{
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
  }
}
```

### 2. List Users

**GET** `/users`

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of users per page (default: 10)
- `q` (optional): Search query for filtering by name
- `sort` (optional): Sort by attribute (e.g., `name`, `email`)

**Example:**
```
GET /users?page=1&limit=5&q=John&sort=name
```

**Success Response (200):**
```json
{
  "users": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2025-01-01T12:00:00.000Z",
      "updatedAt": "2025-01-01T12:00:00.000Z"
    }
  ],
  "totalPages": 3,
  "currentPage": 1
}
```

### 3. Get User by ID

**GET** `/users/{id}`

**Success Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

### 4. Update User

**PUT** `/users/{id}`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

**Success Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:30:00.000Z"
}
```

### 5. Delete User

**DELETE** `/users/{id}`

**Success Response (204):** No content

### 6. User Statistics

**GET** `/users/stats`

**Success Response (200):**
```json
{
  "totalUsers": 120,
  "lastWeekUsers": 15,
  "byDomain": {
    "gmail.com": 80,
    "hotmail.com": 25,
    "yahoo.com": 15
  }
}
```

## 🧪 Testing

The project includes comprehensive testing with Jest:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
- **Unit Tests**: Model validation and utility functions
- **Integration Tests**: Full API endpoint testing
- **Database**: Tests use a separate test database

## 🚀 Deployment

### Vercel Deployment

This project is optimized for Vercel deployment:

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `API_KEY`: Your secure API key
   - `NODE_ENV`: `production`

3. **Deploy automatically** on every push to main branch

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
API_KEY=your-production-api-key
NODE_ENV=production
```

## 🔒 Security Features

- **API Key Authentication**: All endpoints require valid API key
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: Protection against abuse
- **HTTPS Only**: Automatic HTTPS redirect in production
- **Error Handling**: Secure error messages without sensitive data

## 📝 Usage Examples

### Postman Collection

Create a Postman collection with these settings:

**Environment Variables:**
- `base_url`: `https://apinode-navy.vercel.app`
- `api_key`: `your-api-key`

**Headers (for all requests):**
```
Content-Type: application/json
x-api-key: {{api_key}}
```

### cURL Examples

**Create User:**
```bash
curl -X POST https://apinode-navy.vercel.app/users \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get Users:**
```bash
curl -X GET "https://apinode-navy.vercel.app/users?page=1&limit=10" \
  -H "x-api-key: your-api-key"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Check the API documentation above
- Review the test files for usage examples
- Ensure your API key is correctly configured
- Verify your MongoDB connection string