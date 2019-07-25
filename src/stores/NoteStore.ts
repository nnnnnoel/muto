import moment from "moment";
import { observable } from "mobx";

export interface NoteStoreTypes {
  name: string;
  date: moment.Moment;
  categories: string[];
}

class NoteStore implements NoteStoreTypes {
  @observable name = "";
  @observable date = moment();
  @observable categories: string[] = [];
}

const noteStore: NoteStore = new NoteStore();

export default noteStore;
