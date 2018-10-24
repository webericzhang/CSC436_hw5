import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../app.component.css',
  ]
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNameInput: string;
  lastNameInput: string;

  nameResult: Object = null;

  constructor(private dashboardService: DashboardService,
              private router: ActivatedRoute) {

    this.searches = [];

  }

  ngOnInit() {

  }

  onFirstNameSearch() {
    if (!this.firstNameInput) {
      this.nameResult = {display: "Please input first name"};
      return;
    }

    this.nameResult = {
      display: `looking for ${this.firstNameInput}`,
      name: `${this.firstNameInput}`
    };

    this.dashboardService.getFirstName(this.firstNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameResult = {
            display: `First name ${this.firstNameInput} exists!`
          };
        } else {
          this.nameResult = {
            display: `No this first name ${this.firstNameInput} in the database`,
            name: `${this.firstNameInput}`,
            showCreate: true,
            type: "first"
          };
        }
        console.log(item);
      });
  }

  onLastNameSearch() {
    if (!this.lastNameInput) {
      this.nameResult = {display: "Please input last name"};
      return;
    }

    this.nameResult = {
      display: `looking for ${this.firstNameInput}`,
      name: `${this.firstNameInput}`
    };

    this.dashboardService.getLastName(this.lastNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameResult = {display: `Last name ${this.lastNameInput} exists!`};
        } else {
          this.nameResult = {
            display: `No this last name ${this.lastNameInput} in the database`,
            name: `${this.lastNameInput}`,
            showCreate: true,
            type: "last"
          };
        }
        console.log(item);
      });
  }

  addName(name, type) {
    let dbaddPromise;
    switch (type) {
      case "last" :
        dbaddPromise = this.dashboardService.addLastName(name);
        break;
      case "first":
        dbaddPromise = this.dashboardService.addFirstName(name);
        break;
    }

    if (dbaddPromise) {
      dbaddPromise
        .then( e=> {
          this.nameResult = {
            name: name,
            type: type,
            display: `Successfully added ${type} name: ${name}`
          };
        })
        .catch(error => console.error(error));
    }


  }
}
