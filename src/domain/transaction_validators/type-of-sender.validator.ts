import { ValidateTransactionError } from "@/app/errors/validate-transaction.error";
import { UserEntity } from "../entities/user.entity";

export class TypeOfSenderValidator {
  constructor(private readonly sender: UserEntity) {}

  validate(): void {
    if (this.sender.props.type !== "SHOPKEEPER") {
      throw new ValidateTransactionError("Sender must be a common user");
    }
  }
}
