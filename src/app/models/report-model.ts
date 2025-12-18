export interface IstudentAttendance {
  nome_aluno: string;
  matricula: string;
  jan: number,
  fev: number,
  mar: number,
  abr: number,
  mai: number,
  jun: number,
  jul: number,
  ago: number,
  set: number,
  out: number,
  nov: number,
  dez: number,
  total_faltas: number,
  percentual_presenca: number
}

export interface IreportModel {
  relatorio: IstudentAttendance[];
}