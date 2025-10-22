import { PrismaClient } from '@prisma/client';
import { CrudService } from './crud.service';
import { User } from '../interfaces/user.interface';

export class UserService extends CrudService<User> {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async create(data: User): Promise<User> {
        return this.prisma.user.create({
            data: {
                nome: data.nome,
                morada: data.morada,
                email: data.email,
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            select: {
                id: true,
                nome: true,
                morada: true,
                email: true
            }
        });
    }

    async findOne(id: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                nome: true,
                morada: true,
                email: true
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}