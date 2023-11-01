export class TransactionNotAprovedError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "TransactionNotAprovedError";
  }
}
