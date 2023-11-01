import { TransactionEntity } from "@/domain/entities/transaction.entity";
import { TransactionModel, TransactionStatus } from "@/domain/models/transaction.model";
import { IRepository } from "@/domain/repositories/repository.interface";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IRepository<TransactionEntity> {
  constructor(private readonly prismaService: PrismaClient) {}

  async findById(id: string): Promise<TransactionEntity> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        value: true,
        status: true,
        notified: true,
        created_at: true,
        updated_at: true,
      },
    });

    return this.convertPrismaTransactionReturn(transaction);
  }
  async save(entity: TransactionEntity): Promise<void> {
    const entityJson = entity.toJSON();
    await this.prismaService.transaction.upsert({
      where: { id: entityJson.id },
      update: {
        senderId: entityJson.senderId,
        receiverId: entityJson.receiverId,
        value: entityJson.value,
        status: entityJson.status,
        notified: entityJson.notified,
        created_at: entityJson.created_at,
        updated_at: entityJson.updated_at,
      },
      create: {
        senderId: entityJson.senderId,
        receiverId: entityJson.receiverId,
        value: entityJson.value,
        status: entityJson.status,
        notified: entityJson.notified,
        created_at: entityJson.created_at,
        updated_at: entityJson.updated_at,
      },
    });
  }

  private convertPrismaTransactionReturn(transaction: any): TransactionEntity {
    const transactionModel: TransactionModel = new TransactionModel(
      transaction.senderId,
      transaction.receiverId,
      transaction.value,
      transaction.status as TransactionStatus,
      transaction.notified,
      transaction.created_at
    );
    return new TransactionEntity(transactionModel, transaction.id);
  }
}
