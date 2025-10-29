import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  @Input() label = '';
  @Input() showBorder: boolean = false;

  checkedIconUrl = 'assets/icons/check.svg';
}
