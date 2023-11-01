export interface ITransactionStatus {
  authorize(transactionId: string): Promise<boolean>;
}
