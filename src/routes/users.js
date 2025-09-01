const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validateUser, validate } = require('../utils/validation');
const authenticateApiKey = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// Apply authentication and rate limiting to all routes
router.use(authenticateApiKey);
router.use(rateLimiter);

router.post('/', validateUser, validate, usersController.createUser);
router.get('/', usersController.getUsers);
router.get('/stats', usersController.getUserStats);
router.get('/:id', usersController.getUserById);
router.put('/:id', validateUser, validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;