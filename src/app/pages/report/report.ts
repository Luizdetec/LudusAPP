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

  exportReport(): void {
    if (!this.report || this.report.length === 0) {
      alert('Não há dados para exportar.');
      return;
    }
    this.isLoading = true;
    const headers = [
      'Nome do Aluno',
      'Turma',
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
      'Percentual de presença' // <-- Adicionado
    ];
    const rows = this.report.map((aluno) => [
      aluno.nome_aluno,
      this.turmaSelecionada,
      aluno.meses['Jan'],
      aluno.meses['Fev'],
      aluno.meses['Mar'],
      aluno.meses['Abr'],
      aluno.meses['Mai'],
      aluno.meses['Jun'],
      aluno.meses['Jul'],
      aluno.meses['Ago'],
      aluno.meses['Set'],
      aluno.meses['Out'],
      aluno.meses['Nov'],
      aluno.meses['Dez'],
      aluno.percentual_presenca?.toFixed(2) + '%' // <-- Adicionado
    ]);

    const csvContent = [
      headers.join(','), // Adiciona os cabeçalhos
      ...rows.map((row) => row.join(',')), // Adiciona as linhas de dados
    ].join('\n'); // Junta tudo com quebra de linha

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `frequencia_alunos_${this.turmaSelecionada}_${this.anoSelecionado}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.isLoading = false
    console.log('Relatório exportado com sucesso!');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/home']);
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  generateReport(): void {
    if (!this.codigoTurma || !this.anoSelecionado) {
      alert('Por favor, selecione a turma e o ano antes de gerar o relatório.');
      return;
    }

    this.isLoading = true;

    this.report = []; // Limpa os dados anteriores

    const alunosMap: { [nome: string]: IstudentAttendance } = {};

    const promises: Promise<IstudentAttendance[]>[] = []; // Array para armazenar as chamadas à API

    for (let mes = 1; mes <= 12; mes++) {
      const promise = this.reportService.getAttendanceReport(this.codigoTurma, this.anoSelecionado, mes)
        .toPromise()
        .then((response) => response || []); // Garante que o retorno seja um array vazio se for undefined
      promises.push(promise);
    }

    // Aguarda todas as chamadas à API serem concluídas
    Promise.all(promises).then((responses) => {
      responses.forEach((response, index) => {
        const mes = index + 1; // Mês correspondente à iteração (1 = Janeiro, 2 = Fevereiro, etc.)
        response.forEach((aluno) => {
          if (!alunosMap[aluno.nome_aluno]) {
            // Inicializa os dados do aluno se ainda não estiver no mapa
            alunosMap[aluno.nome_aluno] = {
              nome_aluno: aluno.nome_aluno,
              total_faltas: 0,
              percentual_presenca: aluno.percentual_presenca, // ou o campo correto     // <-- adicione se vier da API
              meses: {
                Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0,
                Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0,
              },
            };
          }

          // Atualiza o número de faltas no mês correspondente
          const mesNome = this.getMesNome(mes); // Obtém o nome do mês (Jan, Fev, etc.)
          alunosMap[aluno.nome_aluno].meses[mesNome] = aluno.total_faltas;

          // Atualiza o total de faltas
          alunosMap[aluno.nome_aluno].total_faltas += aluno.total_faltas;
        });
      });

      // Calcula o percentual de presença para cada aluno
      Object.values(alunosMap).forEach((aluno) => {
        const totalMeses = 12; // Total de meses no ano
        const totalPresencas = totalMeses - aluno.total_faltas; // Presenças = Total meses - faltas
        aluno.percentual_presenca = (totalPresencas / totalMeses) * 100; // Percentual de presença
      });

      // Converte o mapa de alunos para um array para exibição na tabela
      this.report = Object.values(alunosMap);
      this.turmaExibida = this.turmaSelecionada; // Atualiza a turma exibida na tabela
      this.isLoading = false;
      console.log('Relatório gerado com sucesso:', this.report);
    }).catch((error) => {
      this.isLoading = false;
      console.error('Erro ao gerar relatório:', error);
    });
  }

  // Método para obter o nome do mês correspondente
  getMesNome(mes: number): string {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses[mes - 1];
  }
}
