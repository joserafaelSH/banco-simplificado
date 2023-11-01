import { TransactionEntity } from "../entities/transaction.entity";

export interface INotification {
  createTransactionNotification(transaction: TransactionEntity): Promise<void>;
  updateTransactionNotification(transaction: TransactionEntity): Promise<void>;
}
