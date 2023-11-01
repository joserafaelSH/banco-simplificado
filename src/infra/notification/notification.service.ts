import { TransactionEntity } from "@/domain/entities/transaction.entity";
import { INotification } from "@/domain/notification/notification.interface";
import { EmailNotification } from "./email.notification";
import { NotificationEmailDto } from "@/domain/notification/dto/notification-email.dto";
import { IRepository } from "@/domain/repositories/repository.interface";
import { UserEntity } from "@/domain/entities/user.entity";

export class NotificationService implements INotification {
  constructor(
    private readonly notificationEmail: EmailNotification,
    private readonly userRepository: IRepository<UserEntity>,
    private readonly transactionRepository: IRepository<TransactionEntity>
  ) {}

  async createTransactionNotification(transaction: TransactionEntity): Promise<void> {
    const sender = await this.userRepository.findById(transaction.props.senderId);
    const receiver = await this.userRepository.findById(transaction.props.receiverId);
    const emailPayload: NotificationEmailDto = {
      body: `You have a new transaction with id ${transaction.id}`,
      subject: "New transaction",
      to: receiver.props.email,
      from: sender.props.email,
    };
    const sendEmailResult = await this.notificationEmail.sendMail(emailPayload);
    transaction.props.notified = sendEmailResult;
    await this.transactionRepository.save(transaction);
  }
  async updateTransactionNotification(transaction: TransactionEntity): Promise<void> {
    const sender = await this.userRepository.findById(transaction.props.senderId);
    const receiver = await this.userRepository.findById(transaction.props.receiverId);
    const emailPayload: NotificationEmailDto = {
      body: `Your transaction with id ${transaction.id} has been updated. The new status is ${transaction.props.status}`,
      subject: `Transaction ${transaction.id} updated`,
      to: receiver.props.email,
      from: sender.props.email,
    };
    const sendEmailResult = await this.notificationEmail.sendMail(emailPayload);
    transaction.props.notified = sendEmailResult;
    await this.transactionRepository.save(transaction);
  }
}
