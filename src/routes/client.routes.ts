import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';

const router = Router();
const clientController = new ClientController();

// Create a new client
router.post('/', (req, res, next) => clientController.create(req, res, next));

// Get all clients
router.get('/', (req, res, next) => clientController.findAll(req, res, next));

// Get one client
router.get('/:id', (req, res, next) => clientController.findOne(req, res, next));

// Update a client
router.put('/:id', (req, res, next) => clientController.update(req, res, next));

// Delete a client
router.delete('/:id', (req, res, next) => clientController.delete(req, res, next));

export default router;