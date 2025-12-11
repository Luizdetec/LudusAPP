export interface Istudents {
    id_aluno: number;
    nome_aluno: string;
    matricula: number;
    checked?: boolean;
}

export interface IstudentList{
    alunos: Istudents[];
}

export interface IstudentAttendance {
    id_aluno: number;
    nome_aluno: string;
    matricula: number;
    presenca: 'P' | 'F'; // 'P' para Presente, 'F' para Falta
    justificativa: string | null; // Justificativa para a falta, se houver
    observacoes: string | null; // Observações adicionais, se houver
}

export interface IAttendanceRequest {
    data: string; // Data da frequência no formato 'YYYY-MM-DD'
    alunos: IstudentAttendance[]; // Lista de alunos com suas respectivas presenças
}