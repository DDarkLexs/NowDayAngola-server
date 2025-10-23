import { PrismaClient, Article } from '@prisma/client';
import { CrudService } from './crud.service';

export class ArticleService extends CrudService<Article> {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async create(data: Article): Promise<Article> {
        return this.prisma.article.create({
            data: {
                ref: data.ref,
                descricao: data.descricao,
                preco: data.preco,
            }
        });
    }

    async findAll(): Promise<Article[]> {
        return this.prisma.article.findMany();
    }

    async findOne(id: string): Promise<Article | null> {
        return this.prisma.article.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Partial<Article>): Promise<Article> {
        return this.prisma.article.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.article.delete({ where: { id } });
    }
}