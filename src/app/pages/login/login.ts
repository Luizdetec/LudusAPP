import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { InputFieldComponent } from "../../components/main-input-field/input-field.component";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        alert('Login bem-sucedido!');
        this.navigateToHome();

      },
      (error) => {
        console.error('Erro no login:', error);
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
