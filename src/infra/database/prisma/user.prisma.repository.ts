import { UserEntity } from "@/domain/entities/user.entity";
import { UserModel, UserType } from "@/domain/models/user.model";
import { IRepository } from "@/domain/repositories/repository.interface";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IRepository<UserEntity> {
  constructor(private readonly prismaService: PrismaClient) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        cpf: true,
        email: true,
        type: true,
        amount: true,
        sentTransactions: true,
        receivedTransactions: true,
      },
    });
    return this.convertPrismaUserReturn(user);
  }
  async save(entity: UserEntity): Promise<void> {
    const entityJson = entity.toJSON();
    await this.prismaService.user.upsert({
      where: { id: entityJson.id },
      update: {
        fullName: entityJson.fullName,
        cpf: entityJson.cpf,
        email: entityJson.email,
        type: entityJson.type,
        amount: entityJson.amount,
      },
      create: {
        fullName: entityJson.fullName,
        cpf: entityJson.cpf,
        email: entityJson.email,
        type: entityJson.type,
        amount: entityJson.amount,
      },
    });
  }

  private convertPrismaUserReturn(user: any): UserEntity {
    const userModel: UserModel = new UserModel(
      user.fullName,
      user.cpf,
      user.email,
      user.type as UserType,
      user.amount,
      (user.sentTransactions = user.sentTransactions.map((transaction: any) => transaction.id)),
      (user.receivedTransactions = user.receivedTransactions.map(
        (transaction: any) => transaction.id
      ))
    );
    return new UserEntity(userModel, user.id);
  }
}
