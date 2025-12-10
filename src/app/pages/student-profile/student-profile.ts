import { Component } from '@angular/core';
import { Dropdown } from '../../components/dropdown/dropdown';
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';
import { LudusCheckbox } from "../../components/ludus-checkbox/ludus-checkbox";
import { AttendanceService } from '../../services/attendance/attendance.service';
import { Istudents } from '../../models/attendance-model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';
import { SharedDataService } from '../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-student-profile',
  imports: [Dropdown, ButtonComponent, LudusCheckbox, FormsModule, NgFor],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export default class StudentProfile {
  turmas = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano'];
  students: Istudents[] = []; // Lista de alunos carregados
  turmaSelecionada = ''; // Turma selecionada pelo usuário
  alunoSelecionadoId: number | null = null; // ID do aluno selecionado
  isLoading: boolean = false;

  constructor(
    private readonly router: Router, private readonly attendanceService: AttendanceService, 
    private readonly updateProfileService: UpdateProfileService, 
    private readonly sharedDataService: SharedDataService
  ) {}

  turmaMap: { [key: string]: string } = {
    'Jardim I': 'J1',
    'Jardim II': 'J2',
    '1° Ano': '1A',
    '2° Ano': '2A',
    '3° Ano': '3A',
    '4° Ano': '4A',
    '5° Ano': '5A',
  };

  // Método para carregar os alunos da turma selecionada
  loadStudents(): void {
    const turmaId = this.turmaMap[this.turmaSelecionada]; // Obtém o código da turma
    if (!turmaId) {
      alert('Por favor, selecione uma turma válida.');
      return;
    }

    this.isLoading = true;
    this.attendanceService.getStudentsByClass(turmaId).subscribe(
      (response) => {
        this.isLoading = false;
        this.students = response.alunos; // Armazena os alunos retornados pela API
        console.log('Alunos carregados:', this.students);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao carregar alunos:', error);
        alert('Erro ao carregar alunos. Por favor, tente novamente.');
      }
    );
  }

  // Método para selecionar um aluno
  selecionarAluno(id: number): void {
    this.alunoSelecionadoId = id; // Salva o ID do aluno selecionado
    console.log('Aluno selecionado:', this.alunoSelecionadoId);
  }

  // Método chamado ao clicar no botão "Editar"
  editarAluno(): void {
    if (this.alunoSelecionadoId === null) {
      alert('Por favor, selecione um aluno antes de editar.');
      return;
    }
    console.log('ID do aluno para edição:', this.alunoSelecionadoId);
    this.isLoading = true;
    this.updateProfileService.getStudentProfile(this.alunoSelecionadoId).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Dados do aluno para edição:', response);
        this.sharedDataService.setAluno(response, this.alunoSelecionadoId); // Armazena os dados no serviço compartilhado
        this.router.navigate(['/atualizar-perfil']); // Navega para a outra tela
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao obter dados do aluno:', error);
        alert('Erro ao obter dados do aluno. Por favor, tente novamente.');
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
