import { NextFunction, Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // O corpo da requisição deve ter: { clienteId: "...", itens: [{ articleId: "...", quantidade: X }] }
            const order = await this.orderService.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await this.orderService.findAll();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const order = await this.orderService.findOne(req.params.id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.orderService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}