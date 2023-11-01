import { TransactionEntity } from "../entities/transaction.entity";
import { UserEntity } from "../entities/user.entity";
import { TransactionStatus } from "../models/transaction.model";
import { NotificationEmailDto } from "../notification/dto/notification-email.dto";
import { INotificationEmail } from "../notification/notification-email.interface";
import { INotification } from "../notification/notification.interface";
import { IRepository } from "../repositories/repository.interface";

export class NotificationService implements INotification {
  constructor(
    private readonly emailSender: INotificationEmail,
    private readonly userRepository: IRepository<UserEntity>,
    private readonly transactionRepository: IRepository<TransactionEntity>
  ) {}

  async createTransactionNotification(transaction: TransactionEntity): Promise<void> {
    const sender = await this.userRepository.findById(transaction.props.senderId);
    const receiver = await this.userRepository.findById(transaction.props.receiverId);
    const notification: NotificationEmailDto = {
      body: `You have created a new transaction with id ${transaction.id}`,
      from: sender.props.email,
      subject: "New transaction",
      to: receiver.props.email,
    };

    const emailStatus = await this.emailSender.sendMail(notification);
    if (!emailStatus) {
      await this.updateTransactionStatus(transaction, false);
    }
    await this.updateTransactionStatus(transaction, true);
  }

  async updateTransactionNotification(transaction: TransactionEntity): Promise<void> {
    const receiver = await this.userRepository.findById(transaction.props.receiverId);
    const sender = await this.userRepository.findById(transaction.props.senderId);
    const notification: NotificationEmailDto = {
      body: `You have received a new transaction with id ${transaction.id} and value ${transaction.props.value}`,
      from: sender.props.email,
      subject: "New transaction",
      to: receiver.props.email,
    };

    const emailStatus = await this.emailSender.sendMail(notification);
    if (!emailStatus) {
      await this.updateTransactionStatus(transaction, false);
    }
    await this.updateTransactionStatus(transaction, true);
  }

  private async updateTransactionStatus(
    transaction: TransactionEntity,
    notified: boolean
  ): Promise<void> {
    transaction.updateNotified(notified);
    await this.transactionRepository.save(transaction);
  }
}
