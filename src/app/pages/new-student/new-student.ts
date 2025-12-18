import { Component } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { Select } from "../../components/select/select";
import { InputDate } from "../../components/input-date/input-date";
import { LudusCheckbox } from "../../components/ludus-checkbox/ludus-checkbox";
import { Router } from '@angular/router';
import { InewStudentModel } from '../../models/new-student-model';
import { NewStudentService } from '../../services/new-student/new-student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  imports: [InputFieldComponent, Select, InputDate, LudusCheckbox, FormsModule],
  templateUrl: './new-student.html',
  styleUrl: './new-student.scss',
})
export default class NewStudent {
  constructor(private readonly router: Router, private readonly newStudentService: NewStudentService) {}

  sexes: string[] = ['Masculino', 'Feminino', 'Outro'];
  races: string[] = ['Branco', 'Negro', 'Pardo', 'Indígena', 'Amarelo'];
  certificateType: string[] = ['Nascimento', 'Casamento', 'N/A'];
  class: string[] = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano'];
  shift: string[] = ['Manhã', 'Intermediário', 'Tarde', 'Noite', 'Tempo Integral'];
  Origin: string[] = ['01 - do lar', '02 - Escola Municipal', '03 - Escola Estadual', '04 - Escola Particular', '05 - Escola Federal', '06 - Escola Comunitária'];
  vaccine: string[] = ['Completa', 'Incompleta', 'Não entregue'];
  zone: string[] = ['Urbana', 'Rural', 'N/A'];
  isLoading: boolean = false;

  studentData: InewStudentModel = {
    ident_aluno: {
      nis: '',
      nome_aluno: '',
      sexo: '',
      uf: '',
      local_nascimento_municipio: '',
      uf_cartorio: '',
      municipio_cartorio: '',
      nome_cartorio: '',
      identidade_docestrangeiro_passaporte: '',
      data_expedicao_identidade: '',
      orgao_emissor: '',
      uf_identidade: 'PA',
      cpf: '',
      aluno_raca: '',
      cartao_sus: '',
      data_nascimento: '',
      tipo_nascimento: '',
      nacionalidade: '',
      codigo_inep: '',
    },
    certidao: {
      num_matricula_registro_civil: '',
      num_termo: '',
      livro: '',
      folha: '',
      data_expedicao_certidao: '',
      tipo_certidao_civil: '',
    },
    saude: {
      autismo: false,
      rett: false,
      asperger: false,
      transtorno_desintegrativo: false,
      baixa_visao: false,
      cegueira: false,
      auditiva: false,
      intelectual: false,
      fisica: false,
      multipla: false,
      sindrome_down: false,
      surdez: false,
      surdocegueira: false,
      altas_habilidades: false,
      vacina: '',
    },
    info_endereco: {
      endereco: '',
      complemento: '',
      numero_endereco: '',
      municipio: '',
      bairro: '',
      cep: '',
      zona: '',
      telefone: '',
      email: '',
      uf: '',
    },
    responsaveis: {
      nome_mae: '',
      nome_pai: '',
      responsavel: '',
      cpf_responsavel: '',
      rg_responsavel: '',
    },
    info_matricula: {
      nome_escola: '',
      cod_censo_inep: '',
      data_ingresso_escola: '',
      matricula: 0,
      data_matricula: '',
      codigo_turma: '',
      turno: '',
      codigo_serie: '',
      codigo_procedencia: '',
      participa_programa: false,
      transporte_escolar: false,
      ano_letivo: 0,
      codigo_aluno: '',
      documento_pendente: false,
      transferencia: '',
      ressalvas: '',
    },
  };

  registerStudent() {
    const errors = this.validateRequiredFields();
    if (errors.length > 0) {
      alert('Preencha os campos obrigatórios:\n' + errors.join('\n'));
      return;
    }
    this.isLoading = true;
    this.newStudentService.registerStudent(this.studentData).subscribe(
      (response) => {
        console.log('Cadastro de aluno realizado com sucesso:', response);
        this.isLoading = false;
        alert('Aluno cadastrado com sucesso!');
        this.navigateToHome();
      },
      (error) => {
        console.error('Erro ao cadastrar aluno:', error);
        this.isLoading = false;
        alert('Erro ao cadastrar aluno. Por favor, tente novamente.');
        console.log(this.studentData);
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Logs para os inputs de data
  onDateEmissionChange(value: string): void {
    console.log('Data de Emissão:', value);
  }

  onDateExpeditionChange(value: string): void {
    console.log('Data de Expedição:', value);
  }

  onDateIngressChange(value: string): void {
    console.log('Data de Ingresso:', value);
  }

  onDateMatriculaChange(value: string): void {
    console.log('Data de Matrícula:', value);
  }

  onZoneChange(value: string): void {
    this.studentData.info_endereco.zona = value; // Atualiza o valor no objeto studentData
    console.log('Zona selecionada:', value); // Exibe o valor no console
  }

  onRaceChange(value: string): void {
    this.studentData.ident_aluno.aluno_raca = value;
    console.log('Identidade racial selecionada:', value);
  }

  onSexChange(value: string): void {
    this.studentData.ident_aluno.sexo = value;
    console.log('Sexo selecionado:', value);
  }

  onCertificateTypeChange(value: string): void {
    this.studentData.certidao.tipo_certidao_civil = value;
    console.log('Tipo da certidão civil selecionado:', value);
  }

  onShiftChange(value: string): void {
    this.studentData.info_matricula.turno = value;
    console.log('Turno selecionado:', value);
  }

  onClassChange(value: string): void {
    this.studentData.info_matricula.codigo_serie = value;
    console.log('Série selecionada:', value);
  }

  onOriginChange(value: string): void {
    this.studentData.info_matricula.codigo_procedencia = value;
    console.log('Código de Procedência selecionado:', value);
  }

  onVaccineChange(value: string): void {
    this.studentData.saude.vacina = value;
    console.log('Vacina selecionada:', value);
  }

  validateRequiredFields(): string[] {
    const errors: string[] = [];

    // Identificação do aluno
    if (!this.studentData.ident_aluno.nome_aluno) errors.push('Nome do aluno');
    if (!this.studentData.ident_aluno.nis) errors.push('NIS');
    if (!this.studentData.ident_aluno.sexo) errors.push('Sexo');
    if (!this.studentData.ident_aluno.aluno_raca) errors.push('Identidade racial');
    if (!this.studentData.ident_aluno.uf) errors.push('UF');
    if (!this.studentData.ident_aluno.data_nascimento) errors.push('Data de Nascimento');
    if (!this.studentData.ident_aluno.cpf) errors.push('CPF');
    if (!this.studentData.ident_aluno.cartao_sus) errors.push('Cartão SUS');
    if (!this.studentData.ident_aluno.identidade_docestrangeiro_passaporte) errors.push('Município de Nascimento');

    // Responsáveis
    if (!this.studentData.responsaveis.responsavel) errors.push('Nome do Responsável');
    if (!this.studentData.responsaveis.cpf_responsavel) errors.push('CPF do Responsável');
    if (!this.studentData.responsaveis.rg_responsavel) errors.push('RG do Responsável');

    // Endereço
    if (!this.studentData.info_endereco.endereco) errors.push('Endereço');
    if (!this.studentData.info_endereco.cep) errors.push('CEP');
    if (!this.studentData.info_endereco.municipio) errors.push('Município');

    // Vacina
    if (!this.studentData.saude.vacina) errors.push('Vacina');

    return errors;
  }
}
