import { ITransactionStatus } from "@/domain/transaction_status/transaction-status.interface";

export class TransactionService implements ITransactionStatus {
  authorize(transactionId: string): Promise<boolean> {
    return Promise.resolve(this.randomStatus());
  }

  private randomStatus(): boolean {
    return Math.random() >= 0.33;
  }
}
