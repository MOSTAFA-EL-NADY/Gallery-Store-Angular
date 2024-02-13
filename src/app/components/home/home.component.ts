import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
/**
 *
 */
constructor( private loginService: LoginService ,private route: Router,
  private router: ActivatedRoute){
  
  
}
  ngOnInit(): void {
   this.loginService.getLoggedInUser().subscribe({
     next: (response) => {
       console.log(response);
     },
     error: (error) => {
      this.route.navigate(['/auth'], { relativeTo: this.router });
     }
   })
  }

}
