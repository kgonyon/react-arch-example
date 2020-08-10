import { observer } from "mobx-react";
import { RootStoreContext, Ticket } from "../../../store";
import React, { useContext, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItem, ListItemText, Button, Grid } from "@material-ui/core";
import { TicketStateContext, TicketState } from "../state";
import { useStyles } from "../styles";

export const TicketList = observer(() => {
  const classes = useStyles();
  const { ticketStore } = useContext(RootStoreContext);
  const state = useContext(TicketStateContext);

  const onAddTicket = () => {
    state.showAddModal = true;
  };

  return (
    <Grid>
      <Button color="primary" onClick={onAddTicket}>Add Ticket</Button>
      <FixedSizeList
        className={classes.ticketList}
        height={400}
        width={300}
        itemSize={46}
        itemCount={ticketStore.tickets.length}
      >
        {observer((props: ListChildComponentProps) =>
          renderTicketRow(props, ticketStore.tickets, state)
        )}
      </FixedSizeList>
    </Grid>
  );
});

function renderTicketRow(
  props: ListChildComponentProps,
  tickets: Ticket[],
  state: TicketState
) {
  const { index, style } = props;
  const ticket = tickets[index];

  const selectTicket = () => {
    state.selected = ticket.id;
  };

  return (
    <ListItem
      button
      style={style}
      selected={state.selected === ticket.id}
      key={ticket.id}
      onClick={selectTicket}
    >
      <ListItemText primary={ticket.title} />
    </ListItem>
  );
}
