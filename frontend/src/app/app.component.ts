import { Component } from '@angular/core';
import { AuthService } from './common-services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggedIn: boolean = false;
  public myWcaId: string;

  public constructor(private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.auth.me().subscribe((me: any) => this.myWcaId = me.wcaId);
  }

  public login() {
    this.auth.login();
  }

  public logout() {
    this.auth.logout();
  }
}
