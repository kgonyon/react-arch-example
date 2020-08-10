import { observable } from "mobx";
import { TicketStore } from "../ticket";

/* 
  Root store that holds a reference to all other stores.
  This is the top level context that any component can tap into.
*/
export class RootStore {
  @observable ticketStore = new TicketStore(this);
}
