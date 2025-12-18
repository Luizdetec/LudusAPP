export interface InewStudentModel {
  ident_aluno: IdentAluno;
  certidao: Certidao;
  saude: Saude;
  info_endereco: InfoEndereco;
  responsaveis: Responsaveis;
  info_matricula: InfoMatricula;
}

export interface IdentAluno {
  nis: string;
  nome_aluno: string;
  sexo: string;
  uf: string;
  local_nascimento_municipio: string;
  uf_cartorio: string;
  municipio_cartorio: string;
  nome_cartorio: string;
  identidade_docestrangeiro_passaporte: string;
  data_expedicao_identidade: string;
  orgao_emissor: string;
  uf_identidade: string;
  cpf: string;
  aluno_raca: string;
  cartao_sus: string;
  data_nascimento: string;
  tipo_nascimento: string;
  nacionalidade: string;
  codigo_inep: string;
}

export interface Certidao {
  num_matricula_registro_civil: string;
  num_termo: string;
  livro: string;
  folha: string;
  data_expedicao_certidao: string;
  tipo_certidao_civil: string;
}

export interface Saude {
  autismo: boolean;
  rett: boolean;
  asperger: boolean;
  transtorno_desintegrativo: boolean;
  baixa_visao: boolean;
  cegueira: boolean;
  auditiva: boolean;
  intelectual: boolean;
  fisica: boolean;
  multipla: boolean;
  sindrome_down: boolean;
  surdez: boolean;
  surdocegueira: boolean;
  altas_habilidades: boolean;
  vacina: string;
}

export interface InfoEndereco {
  endereco: string;
  complemento: string;
  numero_endereco: string;
  municipio: string;
  bairro: string;
  cep: string;
  zona: string;
  telefone: string;
  email: string;
  uf: string;
}

export interface Responsaveis {
  nome_mae: string;
  nome_pai: string;
  responsavel: string;
  cpf_responsavel: string;
  rg_responsavel: string;
}

export interface InfoMatricula {
  nome_escola: string;
  cod_censo_inep: string;
  data_ingresso_escola: string;
  matricula: number;
  data_matricula: string;
  codigo_turma: string;
  turno: string;
  codigo_serie: string;
  codigo_procedencia: string;
  participa_programa: boolean;
  transporte_escolar: boolean;
  ano_letivo: number;
  codigo_aluno: string;
  documento_pendente: boolean;
  transferencia: string;
  ressalvas: string;
}