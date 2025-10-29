import { Component } from '@angular/core';
import { Dropdown } from '../../components/dropdown/dropdown';
import { Checkbox } from "../../components/checkbox/checkbox";

@Component({
  selector: 'app-student-profile',
  imports: [Dropdown, Checkbox],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export default class StudentProfile {

}
