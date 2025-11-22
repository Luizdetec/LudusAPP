import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
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
}
