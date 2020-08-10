import { observer } from "mobx-react";
import React, { useContext } from "react";
import { TicketList } from "./list";
import { TicketDetails } from "./details";
import { Grid, Dialog, CircularProgress } from "@material-ui/core";
import { TicketStateContext } from "../state";
import { AddTicketModal } from "./add";
import { RootStoreContext } from "../../../store";

export const TicketPage = observer(() => {
  const { ticketStore } = useContext(RootStoreContext);
  const state = useContext(TicketStateContext);

  console.log(`Show Add Modal: ${state.showAddModal}`);
  return (
    <TicketStateContext.Provider value={state}>
      <Grid style={{padding: "16px"}}>
        <Dialog open={state.isLoading || ticketStore.initializing}>
          <CircularProgress style={{padding: "16px"}} color="primary"></CircularProgress>
        </Dialog>
        <AddTicketModal></AddTicketModal>
        <TicketList></TicketList>
        <TicketDetails></TicketDetails>
      </Grid>
    </TicketStateContext.Provider>
  );
});
