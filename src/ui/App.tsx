import React from "react";
import { RootStoreContext, RootStore } from "../store";
import { TicketPage } from "./ticket";
import { observer } from "mobx-react";

const rootStore = new RootStore();

export const App = observer(() => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <TicketPage></TicketPage>
    </RootStoreContext.Provider>
  );
});

export default App;
