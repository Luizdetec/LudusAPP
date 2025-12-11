import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  constructor(private loginService: LoginService, private router: Router) {}

  username: string = '';
  password: string = '';
  isLoading: boolean = false; 

  login() {
    this.isLoading = true; // Inicia o loading
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        this.isLoading = false; // Finaliza o loading
        this.navigateToHome();
      },
      (error) => {
        this.isLoading = false; // Finaliza o loading mesmo em caso de erro
        console.error('Erro no login:', error);
        alert('Erro ao realizar login. Por favor, tente novamente.');
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToRegister() {
    this.router.navigate(['/cadastro']);
  }
}
