import { ValidateTransactionError } from "@/app/errors/validate-transaction.error";
import { UserEntity } from "../entities/user.entity";

export class AmmountValidator {
  constructor(
    private readonly sender: UserEntity,
    private readonly ammount: number
  ) {}

  validate(): void {
    if (this.sender.props.amount < this.ammount) {
      throw new ValidateTransactionError("Sender does not have enough money");
    }
  }
}
