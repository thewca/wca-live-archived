import { Component, OnInit } from '@angular/core';
import { AuthService } from './common-services/auth/auth.service';

@Component({
  selector: 'wca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public get isLoggedIn() {
    return this.auth.loggedIn;
  }

  public get user() {
    return this.auth.loggedInUser;
  }

  constructor(
    private auth: AuthService
  ) {}

  public ngOnInit() {
    this.auth.checkLoginStatus();
  }

  public login() {
    this.auth.login();
  }
}
