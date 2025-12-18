import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { SharedDataService } from '../../services/shared-data/shared-data.service';
import { Select } from "../../components/select/select";
import { InputDate } from "../../components/input-date/input-date";
import { LudusCheckbox } from "../../components/ludus-checkbox/ludus-checkbox";
import { Router } from '@angular/router';
import { InewStudentModel } from '../../models/new-student-model';
import { FormsModule } from '@angular/forms'
import { UpdateProfileService } from '../../services/update-profile/update-profile.service';


@Component({
  selector: 'app-update-profile',
  imports: [InputFieldComponent, Select, InputDate, LudusCheckbox, FormsModule],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
})
export default class UpdateProfile implements OnInit {
  aluno: any;

  constructor(private readonly sharedDataService: SharedDataService, private readonly router: Router, private readonly updateProfileService: UpdateProfileService) {}

  sexes: string[] = ['Masculino', 'Feminino', 'Outro'];
  races: string[] = ['Branco', 'Negro', 'Pardo', 'Indígena', 'Amarelo'];
  certificateType: string[] = ['Nascimento', 'Casamento', 'N/A'];
  class: string[] = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano'];
  shift: string[] = ['Manhã', 'Intermediário', 'Tarde', 'Noite', 'Tempo Integral'];
  Origin: string[] = ['01 - do lar', '02 - Escola Municipal', '03 - Escola Estadual', '04 - Escola Particular', '05 - Escola Federal', '06 - Escola Comunitária'];
  vaccine: string[] = ['Completa', 'Incompleta', 'Não entregue'];
  zone: string[] = ['Urbana', 'Rural', 'N/A'];
  isLoading: boolean = false;
  alunoSelecionadoId: number | null = null;
  alunoId: any;

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

  ngOnInit(): void {
    const aluno = this.sharedDataService.getAluno(); // Recupera os dados do aluno
    const alunoId = this.sharedDataService.getAlunoId();
    if (aluno) {
      this.studentData = aluno; // Preenche o objeto `studentData` com os dados recebidos
      this.alunoId = alunoId;
      console.log('Dados do aluno recebidos:', this.studentData);
      console.log('ID do aluno recebido:', alunoId);
    } else {
      console.error('Nenhum dado de aluno encontrado.');
      alert('Erro ao carregar os dados do aluno.');
      this.router.navigate(['/Perfil-do-aluno']); // Navega de volta para a tela inicial
    }
  }

  salvarAlteracoes(): void {
    if (this.alunoId === null) {
      alert('Erro: ID do aluno não encontrado.');
      return;
    }
    this.isLoading = true;

    this.updateProfileService.updateStudentProfile(this.alunoId, this.studentData).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Alterações salvas com sucesso:', response);
        alert('Alterações salvas com sucesso!');
        this.router.navigate(['/home']); // Redireciona para a tela inicial
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao salvar alterações:', error);
        alert('Erro ao salvar alterações. Por favor, tente novamente.');
      }
    );
  }

  cancelEdit() {
    this.router.navigate(['/Perfil-do-aluno']);
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
}
