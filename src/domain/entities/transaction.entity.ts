import { TransactionModel, TransactionStatus } from "../models/transaction.model";
import { Entity } from "./entity";

export class TransactionEntity extends Entity<TransactionModel> {
  constructor(
    public props: TransactionModel,
    id?: string
  ) {
    super(props, id);
    this.props.created_at = this.props.created_at ?? new Date();
    //#TODO: implementar o createdAt
  }

  updateStatus(status: TransactionStatus): void {
    this.props.status = status;
    this.props.updated_at = new Date();
  }

  updateNotified(status: boolean): void {
    this.props.notified = status;
    this.props.updated_at = new Date();
  }
}
