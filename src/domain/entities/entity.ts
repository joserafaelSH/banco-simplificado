import { v4 as uuidv4 } from "uuid";

export abstract class Entity<T = any> {
  public id: string;
  public props: T;

  constructor(props: T, id?: string) {
    this.props = props;
    this.id = id ?? uuidv4();
  }

  toJSON(): Required<{ id: string } & T> {
    const ret = {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & T>;

    return ret;
  }
}
