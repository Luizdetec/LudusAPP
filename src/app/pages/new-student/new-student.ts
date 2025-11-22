import { Component } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { Select } from "../../components/select/select";
import { InputDate } from "../../components/input-date/input-date";
import { LudusCheckbox } from "../../components/ludus-checkbox/ludus-checkbox";

@Component({
  selector: 'app-new-student',
  imports: [InputFieldComponent, Select, InputDate, LudusCheckbox,],
  templateUrl: './new-student.html',
  styleUrl: './new-student.scss',
})
export default class NewStudent {
  selectedRace: string = '';
  selectedSex: string = '';

  sexes: string[] = ['Masculino', 'Feminino', 'Outro'];

  races: string[] = ['Branco', 'Negro', 'Pardo', 'Indígena', 'Amarelo'];

  certificateType: string[] = ['Nascimento', 'Casamento', 'N/A'];

  class: string[] = ['Jardim I', 'Jardim II', '1° Ano', '2° Ano', '3° Ano', '4° Ano', '5° Ano',]

  shift: string[] = ['Manhã', 'Intermediário', 'Tarde' , 'Noite' , 'Tempo Integral'];

  Origin: string[] = ['01 - do lar', '02 - Escola Municipal', '03 - Escola Estadual' , '04 - Escola Particular' , '05 - Escola Federal' , ' 06 - Escola Comunitária'];

  vaccine: string[] = ['Completa', 'Incompleta', 'Não entregue']

  zone: string[] = ['Urbana', 'Rural', 'N/A'];
}
