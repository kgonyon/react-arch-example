import { observable } from "mobx";
import { createContext } from "react";

export class TicketState {
  @observable selected: number | undefined
  @observable showAddModal: boolean = false
  @observable isLoading: boolean = false
}
export const TicketStateContext = createContext(new TicketState());