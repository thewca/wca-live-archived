import { Component } from '@angular/core';
import { AuthService } from './common-services/auth/auth.service';

@Component({
  selector: 'wca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService
  ) {}

  public login() {
    this.auth.login();
  }
}
