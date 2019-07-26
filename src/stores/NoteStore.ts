import moment from "moment";
import { observable } from "mobx";

export interface NoteStoreTypes {
  name: string;
  date: Date;
  categories: string[];
}

class NoteStore implements NoteStoreTypes {
  @observable name = "";
  @observable date = new Date();
  @observable categories: string[] = [];
}

const noteStore: NoteStore = new NoteStore();

export default noteStore;
