import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findOne(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.update(req.params.id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.delete(req.params.id);
            return res.status(204).json({message: 'User deleted successfully'});
        } catch (error) {
            return next(error);
        }
    }
}