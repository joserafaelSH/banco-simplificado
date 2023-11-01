import { ITransactionStatus } from "@/domain/transaction_status/transaction-status.interface";
import { DefaultUseCase } from "./usecase.interface";
import { INotification } from "@/domain/notification/notification.interface";
import { IRepository } from "@/domain/repositories/repository.interface";
import { UserEntity } from "@/domain/entities/user.entity";
import { TransactionEntity } from "@/domain/entities/transaction.entity";
import { TransactionNotAprovedError } from "../errors/transaction-not-aproved.error";
import { NotFoundError } from "../errors/not-found.error";
import { TransactionStatus } from "@/domain/models/transaction.model";

export namespace ProcessTransactionUseCase {
  export type Input = {
    tansactionId: string;
  };

  export type Output = {
    tansactionId: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IRepository<UserEntity>,
      private readonly transactionRepository: IRepository<TransactionEntity>,
      private readonly notificationService: INotification,
      private readonly transactionStatusService: ITransactionStatus
    ) {}

    async execute(input: Input): Promise<Output> {
      const { tansactionId } = input;
      const transaction = await this.transactionRepository.findById(tansactionId);

      if (!transaction) {
        throw new NotFoundError("Transaction not found");
      }

      const transactionStatus = await this.transactionStatusService.authorize(input.tansactionId);

      if (!transactionStatus) {
        await this.updateTransactionStatus(transaction, TransactionStatus.REPROVED);

        const sender = await this.userRepository.findById(transaction.props.senderId);
        const refound = sender.props.amount + transaction.props.value;
        await this.updateUserBalance(sender, refound);
        await this.notificationService.updateTransactionNotification(transaction);
        throw new TransactionNotAprovedError("Transaction not approved");
      }

      const receiver = await this.userRepository.findById(transaction.props.receiverId);
      const newAmount = receiver.props.amount + transaction.props.value;
      await this.updateUserBalance(receiver, newAmount);
      await this.updateTransactionStatus(transaction, TransactionStatus.APPROVED);
      await this.notificationService.updateTransactionNotification(transaction);

      return { tansactionId: transaction.id };
    }

    private async updateTransactionStatus(
      transaction: TransactionEntity,
      status: TransactionStatus
    ): Promise<void> {
      transaction.updateStatus(status);
      await this.transactionRepository.save(transaction);
    }

    private async updateUserBalance(sender: UserEntity, amount: number): Promise<void> {
      const newAmount = sender.props.amount + amount;
      sender.updateBalance(newAmount);
      await this.userRepository.save(sender);
    }
  }
}
