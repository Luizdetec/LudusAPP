export interface IstudentAttendance {
  nome_aluno: string;
  total_faltas: number;
  percentual_presenca: number;
  meses: { [mes: string]: number }; // Adiciona os dados de faltas por mês
}

export interface IreportModel {
  relatorio: IstudentAttendance[];
}