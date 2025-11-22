import { Component } from '@angular/core';
import { Dropdown } from '../../components/dropdown/dropdown';
import { Checkbox } from "../../components/checkbox/checkbox";
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  imports: [Dropdown, Checkbox, ButtonComponent],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export default class StudentProfile {
  constructor(private readonly router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
