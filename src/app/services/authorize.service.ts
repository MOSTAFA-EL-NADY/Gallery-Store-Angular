import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthorizeService {
  isAdmin: boolean = false;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  validateToken() {
    if (localStorage.getItem('userToken')) {
      this.loginService.getLoggedInUser().subscribe({
        next: (response) => {
          this.isAdmin = true;
        },
        error: (error) => {
          console.log(error);
          localStorage.clear();
          this.route.navigate(['/auth'], { relativeTo: this.router });
          this.isAdmin = false;
        },
      });
    }

    return this.isAdmin;
  }
}
