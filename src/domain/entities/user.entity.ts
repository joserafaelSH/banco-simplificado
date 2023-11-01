import { UserModel, UserType } from "../models/user.model";
import { Entity } from "./entity";

export class UserEntity extends Entity<UserModel> {
  constructor(
    public readonly props: UserModel,
    id?: string
  ) {
    super(props, id);
    //#TODO: implementar o createdAt
  }

  updateBalance(value: number): void {
    this.props.amount = value;
  }
}
