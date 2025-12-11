import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IloginModel } from '../../models/login-model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(user: string, password: string): Observable<IloginModel> {
    const url = `${this.apiUrl}/users/login?login=${user}&senha=${password}`;
    return this.http.get<IloginModel>(url);
  }
}