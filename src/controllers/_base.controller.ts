
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export abstract class BaseController<T> {
  abstract get model(): any;

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.model.findMany();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.model.findUnique({
        where: { id: Number(id) },
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.model.create({
        data: req.body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.model.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.model.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
}
