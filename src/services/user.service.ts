import { PrismaClient, User } from '@prisma/client';
import { CrudService } from './crud.service';

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
                email: data.email,
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user || null;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
          
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}