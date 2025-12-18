import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-select',
  imports: [ NgFor, FormsModule, NgIf],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  @Input() label: string = ''; 
  @Input() options: string[] = []; 
  @Input() selected: string | null = null;
  @Input() required: boolean = false;
  @Output() selectedChange = new EventEmitter<string>(); 

  onChange(value: string) {
    this.selectedChange.emit(value); 
  }
}
