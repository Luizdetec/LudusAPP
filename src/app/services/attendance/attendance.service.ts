import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IstudentList, IAttendanceRequest } from '../../models/attendance-model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // Método para obter os alunos de uma turma
  getStudentsByClass(turmaId: string): Observable<IstudentList> {
    return this.http.get<IstudentList>(`${this.apiUrl}/students?codigo_turma=${turmaId}`);
  }

  // Método para enviar os dados de frequência
  submitAttendance(attendanceData: IAttendanceRequest): Observable<IAttendanceRequest> {
    return this.http.post<IAttendanceRequest>(`${this.apiUrl}/attendances`, attendanceData);
  }
}
