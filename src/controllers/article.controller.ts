import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';

export class ArticleController {
    private articleService: ArticleService;

    constructor() {
        this.articleService = new ArticleService();
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await this.articleService.create(req.body);
            res.status(201).json(article);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articles = await this.articleService.findAll();
            res.status(200).json(articles);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await this.articleService.findOne(req.params.id);
            if (!article) {
                res.status(404).json({ message: 'Article not found' });
                return;
            }
            res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await this.articleService.update(req.params.id, req.body);
            res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.articleService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}