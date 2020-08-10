import { RootStore } from "./root/root";

export abstract class Store {
  constructor(protected rootStore: RootStore) {}
}
