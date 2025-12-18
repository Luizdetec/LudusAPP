import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisterModel } from '../../models/login-model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  register(data: IRegisterModel): Observable<IRegisterModel> {
    const url = `${this.apiUrl}/users`;
    return this.http.post<IRegisterModel>(url, data);
  }
}
