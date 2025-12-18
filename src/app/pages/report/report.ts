import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Select } from "../../components/select/select";
import { ReportService } from '../../services/report/report.service';
import { IstudentAttendance } from '../../models/report-model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  imports: [CommonModule, ButtonComponent, Select, FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export default class Report {
  turmas = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano'];
  ano = [ '2025', '2026', '2027' , '2028', '2029', '2030' , '2031', '2032', '2033', '2034', '2035' , '2036', '2037', '2038', '2039', '2040' , '2041', '2042', '2043', '2044', '2045' ];
  turmaSelecionada = '';
  codigoTurma = ''; // Código da turma selecionada
  turmaExibida = ''; // Turma exibida na tabela
  anoSelecionado = '';
  report: IstudentAttendance[] = [];
  isLoading: boolean = false;

  constructor(private reportService: ReportService, private router: Router) {}

  turmaMap: { [key: string]: string } = {
    'Jardim I': 'J1',
    'Jardim II': 'J2',
    '1° Ano': '1A',
    '2° Ano': '2A',
    '3° Ano': '3A',
    '4° Ano': '4A',
    '5° Ano': '5A',
  };

  // Método chamado ao selecionar o ano
  onAnoChange(ano: string): void {
    this.anoSelecionado = ano;
    console.log('Ano selecionado:', this.anoSelecionado);
  }

  onTurmaChange(turma: string): void {
    this.turmaSelecionada = turma;
    this.codigoTurma = this.turmaMap[turma] || '';
    console.log('Turma selecionada:', this.turmaSelecionada, 'Código:', this.codigoTurma);
  }

  showModal = false;

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/home']);
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  async buscarRelatorio() {
    if (!this.codigoTurma || !this.anoSelecionado) return;
    this.isLoading = true;
    this.turmaExibida = this.turmaSelecionada;
    this.reportService.getAttendanceReport(this.codigoTurma, this.anoSelecionado)
      .subscribe({
        next: (dados) => {
          this.report = dados;
          this.isLoading = false;
        },
        error: () => {
          this.report = [];
          this.isLoading = false;
        }
      });
  }

  exportarCSV(): void {
    if (!this.report.length) return;

    const header = [
      'Nome do Aluno',
      'Matrícula',
      'Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez',
      'Total de Faltas',
      'Percentual de Presença'
    ];

    const rows = this.report.map(aluno => [
      aluno.nome_aluno,
      aluno.matricula,
      aluno.jan, aluno.fev, aluno.mar, aluno.abr, aluno.mai, aluno.jun,
      aluno.jul, aluno.ago, aluno.set, aluno.out, aluno.nov, aluno.dez,
      aluno.total_faltas,
      aluno.percentual_presenca.toFixed(2) + '%'
    ]);

    const csvContent =
      [header, ...rows]
        .map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `frequencia_alunos_${this.turmaExibida}_${this.anoSelecionado}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showModal = true;
  }
}
