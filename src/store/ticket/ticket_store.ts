import { observable, autorun } from "mobx";
import { Store } from "../store";
import { Ticket } from "./ticket";
import { TicketRepository, TicketEvent } from "../../repositories";
import { RootStore } from "../root";

/*
  Ticket store. Holds all the ticket related data and exposes
  actions to update the data. Stores are meant to hold data and coordinate
  user actions with the server through repositories.
*/
export class TicketStore extends Store {
  // You would want to inject this in some way
  private ticketRepository = new TicketRepository();

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.ticketRepository.getTickets().then((data) => {
      const tickets = data.map((ticket) => new Ticket(ticket));
      this.tickets.push(...tickets);
      this.initializing = false;
    });
    this.ticketRepository.subscribeToChanges((event) =>
      this.onTicketEvent(event)
    );
  }

  @observable tickets: Ticket[] = [];
  @observable initializing: boolean = true;

  public async createTicket(ticket: Ticket) {
    await this.ticketRepository.createTicket(ticket);
  }

  public async deleteTicket(id: number) {
    await this.ticketRepository.deleteTicket(id);
  }

  private onTicketEvent(event: TicketEvent) {
    if (event.type == "created") {
      this.tickets.push(event.ticket!);
    } else if (event.type == "deleted") {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== event.id);
    }
  }
}
