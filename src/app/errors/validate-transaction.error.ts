export class ValidateTransactionError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ValidateTransactionError";
  }
}
