import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IstudentAttendance } from '../../models/report-model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // Método para obter o relatório de frequência
  getAttendanceReport(turma: string, ano: string): Observable<IstudentAttendance[]> {
    return this.http.get<IstudentAttendance[]>(
      `${this.apiUrl}/reports?codigo_turma=${turma}&ano=${ano}`
    );
  }
}
