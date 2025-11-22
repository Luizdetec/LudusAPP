import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ludus-checkbox',
  templateUrl: './ludus-checkbox.html',
  styleUrls: ['./ludus-checkbox.scss'],
  standalone: true
})
export class LudusCheckbox {
  @Input() checked: boolean = false; // Estado inicial do checkbox
  @Input() text: string = ''; // Texto ao lado do checkbox
  @Output() checkedChange = new EventEmitter<boolean>(); // Emite mudanças no estado do checkbox

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked); // Emite o novo estado
  }
}
