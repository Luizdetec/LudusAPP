import {
  Component,
  Input,
  forwardRef,
  EventEmitter,
  Output
} from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-input-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() label!: string;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() cpfCnpj = false;
  @Input() type: string = '';

  private _model = '';
  formattedValue = '';

  @Output() modelChange = new EventEmitter<string>();

  onChangeFn: (value: any) => void = () => {};
  onTouchedFn: () => void = () => {};

  @Input()
  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = this.cpfCnpj ? this.cleanValue(value) : value;
    this.formattedValue = this.cpfCnpj ? this.formatCpfCnpj(this._model) : this._model;
    this.modelChange.emit(this._model);
    this.onChangeFn(this._model);
  }

  onInput(event: any): void {
    const inputValue = event.target.value;
    if (this.cpfCnpj) {
      const raw = inputValue.replace(/\D/g, '');
      this._model = raw;
      this.formattedValue = this.formatCpfCnpj(raw);
    } else {
      this._model = inputValue;
    }
    this.modelChange.emit(this._model);
    this.onChangeFn(this._model);
  }

  writeValue(value: any): void {
    this.model = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private cleanValue(value: string): string {
    return value.replace(/\D/g, '');
  }

  private formatCpfCnpj(value: string): string {
    if (value.length <= 11) {
      value = value.slice(0, 11);
      if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11);
    } else {
      value = value.slice(0, 14);
      if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2);
      if (value.length > 6) value = value.slice(0, 6) + '.' + value.slice(6);
      if (value.length > 10) value = value.slice(0, 10) + '/' + value.slice(10);
      if (value.length > 15) value = value.slice(0, 15) + '-' + value.slice(15);
    }
    return value;
  }
}

