import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login'; 
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
import { ResponseData } from '../interfaces/response.Interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = environment.apiDomain;
  isLoggedIn = new Subject<boolean>();
  loggedIn = new BehaviorSubject<boolean>(false);
  hasPermission: boolean = false;
  constructor(private http: HttpClient) {
    this.loggedIn.subscribe({
      next: (res: boolean) => {
        this.hasPermission = res;
      },
    });
  }

  login(loginData: Login): Observable<ResponseData>{
    return this.http.post<ResponseData>(this.url + '/api/Account/Login', loginData);
  }

  getLoggedInUser():Observable<ResponseData> {
    return this.http.get<ResponseData>(this.url + '/api/User');
  }
}
