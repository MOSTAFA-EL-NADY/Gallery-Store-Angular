import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service'; 
import { Login } from 'src/app/models/login'; 
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseData } from 'src/app/interfaces/response.Interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: Login = new Login('', '');
  errorMessage: string = '';
  hasError: boolean = false;
  isLoading: boolean = false;
  constructor(
    private loginService: LoginService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onLogin() {
   
    this.isLoading = true;
    this.loginService.login(this.loginData).subscribe({
      next: (responseData: ResponseData) => {
       if(responseData.statusCode===200)
       {
       
         localStorage.setItem('userToken', responseData.result);
         this.loginService.loggedIn.next(true);
         this.route.navigate(['/home'], { relativeTo: this.router });
         this.hasError = false;
         this.isLoading = false;
       }
       else
       {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.message,
         
        });
       }

      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password!';
        this.hasError = true;
        this.isLoading = false;

        console.clear();
      },
    });
  }
}
