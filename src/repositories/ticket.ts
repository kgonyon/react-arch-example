export class TicketRepository {
  private callbacks: TicketSubscription[] = [];

  public async subscribeToChanges(callback: TicketSubscription) {
    // Simulates server subscription
    this.callbacks.push(callback);
  }

  public async getTickets(): Promise<TicketData[]> {
    // Simulates server call
    await wait(randomTimeout());
    return [
      {
        id: 0,
        title: "First Ticket",
      },
      {
        id: 1,
        title: "Second Ticket",
      },
      {
        id: 2,
        title: "Third Ticket",
      },
    ];
  }

  public async createTicket(ticket: TicketData) {
    // Simulates server call
    await wait(randomTimeout());
    const event: TicketEvent = {
      type: "created",
      ticket,
      id: ticket.id,
    };
    this.callbacks.forEach((callback) => callback(event));
  }

  public async deleteTicket(id: number) {
    // Simulates server call
    await wait(randomTimeout());
    const event: TicketEvent = {
      type: "deleted",
      id,
    };
    this.callbacks.forEach((callback) => callback(event));
  }
}

function randomTimeout() {
  return 1000 + Math.floor(Math.random() * Math.floor(2000));
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface TicketData {
  id: number;
  title: string;
}

type TicketSubscription = (event: TicketEvent) => any;

type TicketEventType = "deleted" | "created";

export interface TicketEvent {
  type: TicketEventType;
  ticket?: TicketData;
  id: number;
}
