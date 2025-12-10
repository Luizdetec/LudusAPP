import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { InewStudentModel } from '../../models/new-student-model';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // Método para atualizar o perfil do aluno
  getStudentProfile(id_aluno: number): Observable<InewStudentModel> {
    return this.http.get<InewStudentModel>(`${this.apiUrl}/enrollments/${id_aluno}`);
  }

  // Método para enviar os dados alterados do aluno
  updateStudentProfile(id_aluno: number, studentData: InewStudentModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/enrollments/${id_aluno}`, studentData);
  }
}
