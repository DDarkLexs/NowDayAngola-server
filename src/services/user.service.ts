import { PrismaClient, User } from '@prisma/client';
import { CrudService } from './crud.service';
import * as bcrypt from 'bcrypt';

export class UserService extends CrudService<User> {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async create(data: User): Promise<User> {
        if (!data.senha) {
            throw new Error('Senha (password) is required.');
        }
        const hashedPassword = await bcrypt.hash(data.senha, 10);
        const user = await this.prisma.user.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword as string,
            }
        });
        (user as Partial<User>).senha = undefined;
        return user;
    }

    async login(email: string, password: string):Promise<User> {
        console.log("ok")
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.senha) {
            throw new Error('Email ou senha inválidos');
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (!isPasswordValid) {
            throw new Error('Email ou senha inválidos');
        }

        (user as Partial<User>).senha = undefined;
        return user;
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