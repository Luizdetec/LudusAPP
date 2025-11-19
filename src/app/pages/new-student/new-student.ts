import { Component } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { Select } from "../../components/select/select";

@Component({
  selector: 'app-new-student',
  imports: [InputFieldComponent, Select],
  templateUrl: './new-student.html',
  styleUrl: './new-student.scss',
})
export default class NewStudent {
  selectedRace: string = '';
  selectedSex: string = '';

  sexes: string[] = ['Masculino', 'Feminino', 'Outro'];

  races: string[] = ['Branco', 'Negro', 'Pardo', 'Indígena'];
}
