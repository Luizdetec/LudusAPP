import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IButtonsVariants =
  'confirm'|'Diretório'|'new'
  | 'edit'
  | 'view'
  | 'remove'
  | 'search'
  | 'clear'
  | 'save'
  | 'cancel'
  | 'generate'
  | 'add-attachment'
  | 'download-file'
  | 'return'
  | 'reevaluate'
  | 'evaluate'
  | 'regularize'
  | 'appropriate'
  | 'launch-include'
  | 'other-fields'
  | 'search-account'
  | 'print'
  | 'add'
  | 'Cancel'
  | '';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule],
})
export class ButtonComponent implements OnInit{
  @Input() text: string = 'Button';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() width: string = '';
  @Input() textcolor: string = '';
  @Input() hoverColor: string = '';
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;
  @Input() centered: boolean = false;

  @Input() variant: IButtonsVariants = '';
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
    this.setVariantDefaults();
  }

  ngOnInit() {
    this.setVariantDefaults();
  }

  setVariantDefaults() {
    if (!this.color || !this.hoverColor) {
      switch (this.variant) {
        case 'new':
          this.icon = 'assets/icons/add.svg';
          this.text = 'Novo';
          this.color = '#3AA96D';
          this.hoverColor = '#58C063';
          break;
        case 'edit':
          this.text = 'Editar';
          if(this.outlined) {
            this.icon = 'assets/icons/edit_grey.svg';
            this.color = '#E2E8F0';
            this.textcolor = '#5B6776';
            this.hoverColor = '#F8FAFC';
            break;
          }
          this.icon = 'assets/icons/edit.svg';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'view':
          this.icon = 'assets/icons/eye.svg';
          this.text = 'Visualizar';
          this.color = '#F8FAFC';
          this.textcolor = '#263293';
          this.hoverColor = '#F8FAFC';
          break;
        case 'remove':
          this.icon = 'assets/icons/trash.svg';
          this.text = 'Remover';
          this.color = '#D1493D';
          this.hoverColor = '#E27D7D';
          break;
        case 'search':
          this.icon = 'assets/icons/search.svg';
          this.text = 'Buscar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'confirm':
          this.icon = '';
          this.text = 'Confirmar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'clear':
          this.icon = 'assets/icons/clear.svg';
          this.text = 'Limpar';
          this.color = '#FFF';
          this.textcolor = '#5B6776';
          this.hoverColor = '#F8FAFC';
          break;
        case 'save':
          this.icon = 'assets/icons/save.svg';
          this.text = 'Salvar';
          this.color = '#3AA96D';
          this.hoverColor = '#58C063';
          break;
        case 'cancel':
          this.icon = 'assets/icons/cancel.svg';
          this.text = 'Cancelar';
          this.color = '#D1493D';
          this.hoverColor = '#E27D7D';
          break;
        case 'generate':
          this.icon = 'assets/icons/refresh.svg';
          this.text = 'Gerar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'add-attachment':
          this.icon = 'assets/icons/cloud_upload.svg';
          this.text = 'Adiconar Anexo';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'download-file':
          this.icon = 'assets/icons/FileDownload.svg';
          this.text = 'Baixar Arquivo';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'return':
          this.icon = 'assets/icons/chevron-left.svg';
          this.text = 'Voltar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'reevaluate':
          this.icon = 'assets/icons/refresh_blue.svg';
          this.text = 'Reavaliar';
          this.color = '#263293';
          this.textcolor = '#263293';
          this.hoverColor = '#f1f6fcff';
          break;
        case 'evaluate':
          this.text = 'Avaliar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'regularize':
          this.icon = 'assets/icons/regularize.svg';
          this.text = 'Regularizar';
          this.color = '#E2E8F0';
          this.textcolor = '#5B6776';
          this.hoverColor = '#F8FAFC';
          break;
        case 'appropriate':
          this.icon = 'assets/icons/money_bag_grey.svg';
          this.text = 'Apropriar';
          this.color = '#E2E8F0';
          this.textcolor = '#5B6776';
          this.hoverColor = '#F8FAFC';
          break;
        case 'launch-include':
          this.icon = 'assets/icons/add_square.svg';
          this.text = 'Incluir Lançamento';
          this.color = '#263293';
          this.textcolor = '#FFF';
          this.hoverColor = '#001863';
          break;
        case 'other-fields':
          this.icon = 'assets/icons/eye_white.svg';
          this.text = 'Outros Campos';
          this.color = '#263293';
          this.textcolor = '#FFF';
          this.hoverColor = '#001863';
          break;
        case 'search-account':
          this.icon = 'assets/icons/search.svg';
          this.text = 'Selecionar Conta';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'print':
          this.icon = 'assets/icons/printer.svg';
          this.text = 'Imprimir';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'Diretório':
          this.icon = 'assets/icons/server_path.svg';
          this.text = '';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'add':
          this.icon = 'assets/icons/plus.svg';
          this.text = 'Adicionar';
          this.color = '#263293';
          this.hoverColor = '#001863';
          break;
        case 'Cancel':
          this.text = 'Cancelar';
          this.color = '#FFF';
          this.textcolor = '#79808A';
          this.hoverColor = '#E2E8F0';
          break;
      }
    }
  }

  onClick() {
    this.buttonClick.emit();
  }
}