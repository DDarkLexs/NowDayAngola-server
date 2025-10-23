import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

// Create a new order (with its items)
router.post('/', (req, res, next) => orderController.create(req, res, next));

// Get all orders
router.get('/', (req, res, next) => orderController.findAll(req, res, next));

// Get one order
router.get('/:id', (req, res, next) => orderController.findOne(req, res, next));

// Delete an order
router.delete('/:id', (req, res, next) => orderController.delete(req, res, next));

export default router;