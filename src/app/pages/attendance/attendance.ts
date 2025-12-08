import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf, CommonModule  } from '@angular/common';
import { Router } from '@angular/router';
import { Select } from "../../components/select/select";
import { InputDate } from "../../components/input-date/input-date";
import { AttendanceService } from '../../services/attendance/attendance.service';
import { Istudents, IAttendanceRequest } from '../../models/attendance-model';

@Component({
  selector: 'app-attendance',
  imports: [NgClass, FormsModule, NgFor, NgIf, CommonModule, Select, InputDate],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
  standalone: true
})
export default class Attendance {
  constructor(private router: Router, private attendanceService: AttendanceService) {}

  students: Istudents[] = [];
  studentsAttendance: IAttendanceRequest[] = [];

  turmaSelecionada = '';
  dataSelecionada = '';
  turmas = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano'];

  // Mapeamento das opções do select para os valores associados
  turmaMap: { [key: string]: string } = {
    'Jardim I': 'J1',
    'Jardim II': 'J2',
    '1° Ano': '1A',
    '2° Ano': '2A',
    '3° Ano': '3A',
    '4° Ano': '4A',
    '5° Ano': '5A',
  };

  returnHome() {
    this.router.navigate(['/home']);
  }

  // Método para obter o valor associado à turma selecionada
  getTurmaValue(): string {
    return this.turmaMap[this.turmaSelecionada] || '';
  }

  loadStudents(turmaId: string): void {
    this.attendanceService.getStudentsByClass(turmaId).subscribe(
      (response) => {
        this.students = response.alunos.map((aluno) => ({
          ...aluno,
          checked: true, // Adiciona a propriedade `checked` para controle da presença
        }));
        console.log('Alunos carregados:', this.students);
      },
      (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
    );
  }

  onTurmaChange(turma: string): void {
    this.turmaSelecionada = turma; // Atualiza a turma selecionada
    const turmaId = this.getTurmaValue(); // Obtém o valor associado à turma
    console.log('Turma selecionada:', this.turmaSelecionada, 'Valor associado:', turmaId);
    this.loadStudents(turmaId); // Faz a chamada da API
  }

  onStatusChange(aluno: any): void {
    aluno.status = aluno.checked ? 'Presente' : 'Falta';
    console.log(`Status do aluno ${aluno.nome_aluno}: ${aluno.status}`);
  }

  submitAttendance(): void {
    if (!this.dataSelecionada) {
      alert('Por favor, selecione uma data antes de enviar a frequência.');
      return;
    }

    const attendanceData: IAttendanceRequest = {
      data: this.dataSelecionada, // Data selecionada
      alunos: this.students.map((aluno) => ({
        id_aluno: aluno.id_aluno,
        nome_aluno: aluno.nome_aluno,
        matricula: aluno.matricula,
        presenca: aluno.checked ? 'P' : 'F', // Explicitamente 'P' ou 'F'
        justificativa: null, // Pode ser preenchido futuramente
        observacoes: null, // Pode ser preenchido futuramente
      })),
    };

    console.log('Dados de frequência preparados para envio:', attendanceData);

    this.attendanceService.submitAttendance(attendanceData).subscribe(
      (response) => {
        console.log('Frequência enviada com sucesso:', response);
        alert('Frequência registrada com sucesso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao enviar frequência:', error);
        alert('Erro ao registrar frequência. Tente novamente.');
      }
    );
  }
}
