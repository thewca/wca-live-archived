import { Component } from '@angular/core';
import { AuthService } from './common-services/auth/auth.service';

@Component({
  selector: 'wca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggedIn: boolean = false;

  public constructor(private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  public login() {
    this.auth.login();
  }
}
