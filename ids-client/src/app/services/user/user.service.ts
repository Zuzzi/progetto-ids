import { Injectable } from '@angular/core';
import { User, UserTitle, SmartContractType } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor() { }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getContractById(contractId: string) {
    const contract = this.user.contracts.find(element => element._id === contractId);
    return contract ? contract : false;
  }

  getContractByIndex(index: number) {
    return this.user.contracts[0];
  }

  titleCheck(title: UserTitle) {
    let test = false;
    if (this.user.title !== null ) {
      if (this.user.title === title) {
                test = true;
      } else {
        test = false;
      }
    }
    return test;
  }

}
