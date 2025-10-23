import { PrismaClient, Order, OrderItem } from '@prisma/client';

// Interface para os dados de criação da encomenda
interface CreateOrderData {
    clienteId: string;
    itens: {
        articleId: string;
        quantidade: number;
    }[];
}

export class OrderService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Cria uma nova encomenda com seus itens.
     */
    async create(data: CreateOrderData): Promise<Order> {
        // Usando nested writes do Prisma para criar a encomenda e os itens atomicamente
        return this.prisma.order.create({
            data: {
                clienteId: data.clienteId,
                itens: {
                    create: data.itens.map(item => ({
                        articleId: item.articleId,
                        quantidade: item.quantidade,
                    })),
                },
            },
            include: {
                itens: true, // Inclui os itens criados na resposta
            },
        });
    }

    /**
     * Encontra todas as encomendas, incluindo cliente e itens com detalhes do artigo.
     */
    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany({
            include: { cliente: true, itens: { include: { article: true } } },
        });
    }

    /**
     * Encontra uma única encomenda pelo ID.
     */
    async findOne(id: string): Promise<Order | null> {
        return this.prisma.order.findUnique({
            where: { id },
            include: { cliente: true, itens: { include: { article: true } } },
        });
    }

    /**
     * Deleta uma encomenda. O Prisma cuidará de deletar os OrderItems associados
     * se a relação no schema.prisma estiver configurada com `onDelete: Cascade`.
     * Caso contrário, a exclusão falhará se houver itens.
     */
    async delete(id: string): Promise<void> {
        // Para garantir a exclusão em cascata, deletamos os itens primeiro
        await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
        await this.prisma.order.delete({ where: { id } });
    }
}