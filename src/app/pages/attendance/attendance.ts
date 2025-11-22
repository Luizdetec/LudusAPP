import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf, CommonModule  } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [NgClass, FormsModule, NgFor, NgIf, CommonModule ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
  standalone: true
})
export default class Attendance {
  constructor(private router: Router) {}

  turmaSelecionada = '';
  dataSelecionada = '';
  turmas = ['01 — Berçário I', '02 — Berçário II', '03 — Infantil I'];
  alunos = [
    { nome: 'Maria Clara da Silva', status: 'Presente', checked: true },
    { nome: 'João Pereira', status: 'Presente', checked: true },
    { nome: 'Pedro Alves', status: 'Presente', checked: true },
    { nome: 'Matheus Leão', status: 'Presente', checked: true },
    { nome: 'Leonardo Bernardes', status: 'Presente', checked: true },
    { nome: 'Luiz Eduardo', status: 'Falta', justificada: true, observacao: 'Atestado médico', checked: true },
    { nome: 'Renan Moreira', status: 'Presente', checked: true },
    { nome: 'Thiago Amoras', status: 'Presente', checked: true },
    { nome: 'Maria Clara da Silva', status: 'Presente', checked: true },
    { nome: 'João Pereira', status: 'Presente', checked: true },
    { nome: 'Pedro Alves', status: 'Presente', checked: true },
    { nome: 'apple', status: 'Presente', checked: true },
    { nome: 'microsoft', status: 'Presente', checked: true },
    { nome: 'airbnb', status: 'Falta', justificada: true, observacao: 'Atestado médico', checked: true },
    { nome: 'intercom', status: 'Presente', checked: true },
    { nome: 'google', status: 'Presente', checked: true },
  ];

  returnHome() {
    this.router.navigate(['/home']);
  }
}
