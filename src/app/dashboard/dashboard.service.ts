import {Injectable} from '@angular/core';
import {LoginService} from '../login/login.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from "rxjs";

@Injectable()
export class DashboardService {
  searchHistoryRef: any;

  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {

    this.searchHistoryRef =
      this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getFirstName(firstName: string) {
    return this.db.object(`firstNames/${firstName}`)
      .valueChanges();
  }

  getLastName(lastName: string) {
    return this.db.object(`lastNames/${lastName}`)
      .valueChanges();
  }

  addFirstName(name: string) {
    debugger;
    if (name.trim()) {
      return this.db
        .object(`firstNames`)
        .update({[name] : true});
    }
  }

  addLastName(name: string) {
    return this.db
      .object(`lastNames`)
      .update({[name] : true});
  }


}
