import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
//import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    //   private loginService: LoginService,
    private loginService: LoginService,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.loginService.loggedIn.subscribe({
      next: (response: boolean) => {
        this.isLoggedIn = response;
      },
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = !this.isLoggedIn;
    this.route.navigate(['/auth'], { relativeTo: this.router });
    //  this.loginService.loggedIn.next(false);
  }
}
