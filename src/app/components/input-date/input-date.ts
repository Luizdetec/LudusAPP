import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-date',
  imports: [],
  templateUrl: './input-date.html',
  styleUrl: './input-date.scss',
})
export class InputDate {
  @Input() label: string = '';
}
