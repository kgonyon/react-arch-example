import React, { useContext } from "react";
import { TicketStateContext } from "../state";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../store";
import { Grid, Button } from "@material-ui/core";

export const TicketDetails = observer(() => {
  const { ticketStore } = useContext(RootStoreContext);
  const state = useContext(TicketStateContext);
  const ticket = ticketStore.tickets.find(
    (ticket) => ticket.id === state.selected
  );

  if (!ticket) {
    return <p>Please Select Ticket</p>;
  }

  const onDeleteTicket = async () => {
    state.isLoading = true;
    await ticketStore.deleteTicket(ticket.id);
    state.isLoading = false;
  };

  return (
    <Grid>
      <p>{ticket.title}</p>
      <Button onClick={onDeleteTicket} color="secondary">
        Delete Ticket
      </Button>
    </Grid>
  );
});
