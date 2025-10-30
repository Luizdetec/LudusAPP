import { Component } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { Dropdown } from "../../components/dropdown/dropdown";
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-update-profile',
  imports: [InputFieldComponent, Dropdown,ButtonComponent],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
})
export default class UpdateProfile {

}
