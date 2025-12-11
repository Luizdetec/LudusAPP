import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.scss'],
})
export class Checkbox {
  @Input() label = '';
  @Input() showBorder: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>(); // Emite o estado do checkbox

  checkedIconUrl = 'assets/icons/check.svg';
  isChecked: boolean = false; // Estado do checkbox

  // Método chamado quando o checkbox é alterado
  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.checkedChange.emit(this.isChecked); // Emite o novo estado
  }
}
