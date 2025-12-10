import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {

  constructor(private router: Router) {}

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
