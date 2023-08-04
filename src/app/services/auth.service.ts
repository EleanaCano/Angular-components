import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { switchMap, tap } from 'rxjs';
import { R3TargetBinder } from '@angular/compiler';
import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/auth'

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password:string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile() {
    //const headers = new HttpHeaders();
    //headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   //'Content-type': 'application/json'
      //}
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.profile(rta.access_token))
    )
  }
}
