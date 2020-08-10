import { observable } from "mobx";

// Exposes ticket data in a way that is observable
export class Ticket {
  @observable id: number;
  @observable title: string;

  constructor(data: Partial<Ticket>) {
    this.id = data.id ?? Math.random();
    this.title = data.title ?? "";
  }
}
