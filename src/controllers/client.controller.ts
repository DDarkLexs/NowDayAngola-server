import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../services/client.service';

export class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = await this.clientService.create(req.body);
            res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const clients = await this.clientService.findAll();
            res.status(200).json(clients);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = await this.clientService.findOne(req.params.id);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = await this.clientService.update(req.params.id, req.body);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.clientService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}