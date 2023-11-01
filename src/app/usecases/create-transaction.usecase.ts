import { TransactionEntity } from "@/domain/entities/transaction.entity";
import { TransactionModel, TransactionStatus } from "@/domain/models/transaction.model";
import { DefaultUseCase } from "./usecase.interface";
import { AmmountValidator } from "@/domain/transaction_validators/ammount-validator";
import { TypeOfSenderValidator } from "@/domain/transaction_validators/type-of-sender.validator";
import { UserEntity } from "@/domain/entities/user.entity";
import { IRepository } from "@/domain/repositories/repository.interface";
import { NotFoundError } from "../errors/not-found.error";
import { INotification } from "@/domain/notification/notification.interface";

export namespace CreateTransactionUseCase {
  export type Input = {
    senderId: string;
    receiverId: string;
    amount: number;
  };

  export type Output = {
    tansactionId: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IRepository<UserEntity>,
      private readonly transactionRepository: IRepository<TransactionEntity>,
      private readonly notificationService: INotification
    ) {}

    async execute(input: Input): Promise<Output> {
      const { senderId, receiverId, amount } = input;
      const sender: UserEntity = await this.userRepository.findById(senderId);

      if (!sender) {
        throw new NotFoundError("Sender not found");
      }

      this.validations(sender, amount);

      const newAmount = sender.props.amount - amount;

      await this.updateUserBalance(sender, newAmount);
      const receiver = await this.userRepository.findById(receiverId);
      if (!receiver) {
        throw new NotFoundError("Receiver not found");
      }

      const transactionModel = new TransactionModel(
        input.senderId,
        input.receiverId,
        input.amount,
        TransactionStatus.PENDING
      );

      const transactionEntity = new TransactionEntity(transactionModel);
      await this.transactionRepository.save(transactionEntity);

      await this.notificationService.createTransactionNotification(transactionEntity);

      return { tansactionId: transactionEntity.id };
    }

    validations(sender: UserEntity, amount: number): void {
      const typeOfSenderValidator = new TypeOfSenderValidator(sender);
      const ammountValidator = new AmmountValidator(sender, amount);

      const validations = [typeOfSenderValidator, ammountValidator];
      validations.forEach((validation) => validation.validate());
    }

    private async updateUserBalance(sender: UserEntity, amount: number): Promise<void> {
      const newAmount = sender.props.amount + amount;
      sender.updateBalance(newAmount);
      await this.userRepository.save(sender);
    }
  }
}
