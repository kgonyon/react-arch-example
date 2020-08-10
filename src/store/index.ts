import { RootStore } from "./root";
import { createContext, Context } from "react";

export const RootStoreContext: Context<RootStore> = createContext(new RootStore());
export * from "./root";
export * from "./ticket";