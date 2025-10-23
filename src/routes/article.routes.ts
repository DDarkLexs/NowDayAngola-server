import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';

const router = Router();
const articleController = new ArticleController();

// Create a new article
router.post('/', (req, res, next) => articleController.create(req, res, next));

// Get all articles
router.get('/', (req, res, next) => articleController.findAll(req, res, next));

// Get one article
router.get('/:id', (req, res, next) => articleController.findOne(req, res, next));

// Update an article
router.put('/:id', (req, res, next) => articleController.update(req, res, next));

// Delete an article
router.delete('/:id', (req, res, next) => articleController.delete(req, res, next));

export default router;