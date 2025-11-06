import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Dropdown } from '../../components/dropdown/dropdown';
import { Checkbox } from '../../components/checkbox/checkbox'; 


@Component({
  selector: 'app-attendance',
  imports: [ButtonComponent, Dropdown, Checkbox],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export default class Attendance {

}
