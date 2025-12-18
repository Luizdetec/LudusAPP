import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.html',
  styleUrls: ['./input-date.scss'],
  imports: [NgIf, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDate),
      multi: true,
    },
  ],
})
export class InputDate implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() required: boolean = false;

  value: string = ''; // Valor do input
  disabled: boolean = false; // Estado de desabilitado

  // Funções de controle do Angular Forms
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Métodos da interface ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método chamado quando o valor do input muda
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value); // Notifica o Angular Forms sobre a mudança
  }
}
