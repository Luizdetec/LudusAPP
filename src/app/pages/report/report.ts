import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Dropdown } from '../../components/dropdown/dropdown';

@Component({
  selector: 'app-report',
  imports: [CommonModule, ButtonComponent, Dropdown],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export default class Report {
  classes = ['01. Berçário I', '02. Maternal', '03. Pré'];
  year = 2024;

  rows = [
    { name: 'a', matricula: '1', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno 1000', matricula: '123123', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno 2000', matricula: '7676887', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno teste', matricula: '29129', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'b', matricula: '2', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'c', matricula: '3', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'a', matricula: '1', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno 1000', matricula: '123123', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno 2000', matricula: '7676887', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'aluno teste', matricula: '29129', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'b', matricula: '2', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
    { name: 'c', matricula: '3', months: ['0','1','0','0','0','0','0','0','0','0','0','0'] },
  ];

  showModal = false;

  exportReport(): void {
    // aqui você dispararia o processo real de export (API, CSV etc.)
    this.showModal = true;
    // fecha automaticamente após 2s
    setTimeout(() => { this.showModal = false; }, 2000);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
