import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// Create a new user
router.post('/', (req, res, next) => userController.create(req, res, next));

// Login
router.post('/login', (req, res, next) => userController.login(req, res, next));

// Get all users
router.get('/', (req, res, next) => userController.findAll(req, res, next));

// Get one user
router.get('/:id', (req, res, next) => userController.findOne(req, res, next));

// Update a user
router.put('/:id', (req, res, next) => userController.update(req, res, next));

// Delete a user
router.delete('/:id', (req, res, next) => userController.delete(req, res, next));

export default router;