import React, { useContext, useState, ChangeEventHandler } from "react";
import { observer } from "mobx-react";
import { RootStoreContext, Ticket } from "../../../store";
import { TicketStateContext } from "../state";
import { Button, Grid, TextField, Card, Dialog } from "@material-ui/core";

export const AddTicketModal = observer(() => {
  const { ticketStore } = useContext(RootStoreContext);
  const state = useContext(TicketStateContext);
  const [title, changeTitle] = useState("");

  const onCancel = () => {
    state.showAddModal = false;
    changeTitle("");
  };

  const onCreate = async () => {
    state.isLoading = true;
    state.showAddModal = false;
    try {
      await ticketStore.createTicket(
        new Ticket({
          id: Math.random() * 10000,
          title,
        })
      );
      state.isLoading = false;
      changeTitle("");
    } catch (error) {
      state.isLoading = false;
      state.showAddModal = true;
    }
  };

  const onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTitle(event.target.value);
  };

  return (
    <Dialog open={state.showAddModal}>
      <Card style={{ padding: "16px" }}>
        <Grid style={{ backgroundColor: "white" }}>
          <TextField onChange={onTitleChanged} value={title}></TextField>
          <Button onClick={onCreate}>Create</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Grid>
      </Card>
    </Dialog>
  );
});
