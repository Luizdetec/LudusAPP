import { Component } from '@angular/core';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { RegisterService } from '../../services/register/register.service';
import { IRegisterModel } from '../../models/login-model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [InputFieldComponent, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export default class Register {
  login: string = '';
  teacherName: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private readonly registerService: RegisterService, private readonly router: Router) {}

  register() {
    this.isLoading = true;
    const data: IRegisterModel = {
      login: this.login,
      nome_professor: this.teacherName,
      senha: this.password
    };


    this.registerService.register(data).subscribe(
      (response) => {
        this.isLoading = false;
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro no cadastro:', error);
        alert('Erro ao realizar cadastro.');
      }
    );
  }
}
