// sentTransactions     Transaction[] @relation("sender")
//   receivedTransactions Transaction[] @relation("receiver")

import { TransactionModel } from "./transaction.model";

export class UserModel {
  private _fullName: string;
  private _cpf: string;
  private _email: string;
  private _type: UserType;
  private _amount: number;
  private _sentTransactions: Partial<TransactionModel>[];
  private _receivedTransactions: Partial<TransactionModel>[];

  constructor(
    fullName: string,
    cpf: string,
    email: string,
    type: UserType,
    amount: number,
    sentTransactions: Partial<TransactionModel>[],
    receivedTransactions: Partial<TransactionModel>[]
  ) {
    this._fullName = fullName;
    this._cpf = cpf;
    this._email = email;
    this._type = type;
    this._amount = amount;
    this._sentTransactions = sentTransactions;
    this._receivedTransactions = receivedTransactions;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  get cpf(): string {
    return this._cpf;
  }

  get email(): string {
    return this._email;
  }

  get type(): UserType {
    return this._type;
  }

  get amount(): number {
    return this._amount;
  }

  get sentTransactions(): Partial<TransactionModel>[] {
    return this._sentTransactions;
  }

  get receivedTransactions(): Partial<TransactionModel>[] {
    return this._receivedTransactions;
  }
}

export enum UserType {
  COMMON_USER = "COMMON_USER",
  SHOPKEEPER = "SHOPKEEPER",
}
