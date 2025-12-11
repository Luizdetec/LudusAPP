import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";
import { SharedDataService } from '../../services/shared-data/shared-data.service'; // importe o serviço

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {

  professorNome: string = '';

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService // injete o serviço
  ) {
    this.professorNome = this.sharedDataService.getProfessor(); // pegue o nome do professor
  }

  navigateToAttendance() {
    this.router.navigate(['/frequencia']);
  }

  navigateToReport() {
    this.router.navigate(['/gerar-relatorio']);
  }

  navigateToNewStudent() {
    this.router.navigate(['/matricular-novo-aluno']);
  }

  navigateToStudentProfile() {
    this.router.navigate(['/Perfil-do-aluno']);
  }

  navigateToLogin(){
    this.router.navigate(['/'])
  }
}
