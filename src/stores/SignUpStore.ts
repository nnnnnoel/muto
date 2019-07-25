import { observable } from "mobx";

export interface SignUpStoreTypes {
  phone: string;
  code: string;
  pw: string;
  pwConfirm: string;
}

class SignUpStore implements SignUpStoreTypes {
  @observable phone = "";
  @observable code = "";
  @observable pw = "";
  @observable pwConfirm = "";
}

const signUpStore: SignUpStore = new SignUpStore();

export default signUpStore;
