import { create } from "domain";

export class TransactionModel {
  private _senderId: string;
  private _receiverId: string;
  private _value: number;
  private _status: TransactionStatus;
  private _notified: boolean;
  public created_at: Date;
  public _updated_at: Date;

  constructor(
    senderId: string,
    receiverId: string,
    value: number,
    status: TransactionStatus,
    notified?: boolean,
    created_at?: Date
  ) {
    this._senderId = senderId;
    this._receiverId = receiverId;
    this._value = value;
    this._status = status;
    this.created_at = new Date();
    this._notified = notified || false;
    this.created_at = created_at || null;
  }

  set updated_at(value: Date) {}

  set notified(value: boolean) {
    this._notified = value;
  }

  set status(value: TransactionStatus) {
    this._status = value;
  }

  get notified(): boolean {
    return this._notified;
  }

  get senderId(): string {
    return this._senderId;
  }

  get receiverId(): string {
    return this._receiverId;
  }

  get value(): number {
    return this._value;
  }

  get status(): TransactionStatus {
    return this._status;
  }

  // get created_at(): Date {
  //   return this.created_at;
  // }

  get updated_at(): Date {
    return this._updated_at;
  }

  update(): void {
    this._updated_at = new Date();
  }
}

export enum TransactionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
