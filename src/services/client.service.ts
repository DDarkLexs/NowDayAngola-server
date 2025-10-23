import { PrismaClient, Client } from '@prisma/client';
import { CrudService } from './crud.service';

export class ClientService extends CrudService<Client> {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async create(data: Client): Promise<Client> {
        return this.prisma.client.create({
            data: {
                nome: data.nome,
                email: data.email,
                morada: data.morada,
            }
        });
    }

    async findAll(): Promise<Client[]> {
        return this.prisma.client.findMany();
    }

    async findOne(id: string): Promise<Client | null> {
        return this.prisma.client.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Partial<Client>): Promise<Client> {
        return this.prisma.client.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.client.delete({ where: { id } });
    }
}