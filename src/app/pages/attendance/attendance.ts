import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Dropdown } from '../../components/dropdown/dropdown';
import { Checkbox } from '../../components/checkbox/checkbox'; 
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";

@Component({
  selector: 'app-attendance',
  imports: [ButtonComponent, Dropdown, Checkbox, InputFieldComponent],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export default class Attendance {


}
