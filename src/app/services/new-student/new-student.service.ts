import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { InewStudentModel } from '../../models/new-student-model';

@Injectable({
  providedIn: 'root'
})
export class NewStudentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  registerStudent(data: InewStudentModel): Observable<InewStudentModel> {
    const url = `${this.apiUrl}/enrollments`;
    return this.http.post<InewStudentModel>(url, data);
  }
}
