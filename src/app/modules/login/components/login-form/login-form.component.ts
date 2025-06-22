import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormUtils } from '../../../../core/utils/form-group';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginCredentials } from '../../../../core/interfaces';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  public showPassword: boolean = false;
  public disabled: boolean = false;
  public loginForm: FormGroup;
  public loginError: string = '';
  public isLoading: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService
  ) {
    this.loginForm = FormUtils.getDefaultLoginFormGroup();
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.disabled = true;
      this.loginError = '';      const credentials: LoginCredentials = {
        username: this.loginForm.get('userName')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.success) {
            this.route.navigate(['/app/user-management']);
          }
        },
        error: (error) => {
          this.loginError = error.message || 'Error de autenticación';
          this.isLoading = false;
          this.disabled = false;
        },
        complete: () => {
          this.isLoading = false;
          this.disabled = false;
        }
      });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get userName(): AbstractControl {
    return this.loginForm.get('userName')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  getUsernameErrorMessage(): string {
    if (this.userName.hasError('required')) {
      return 'El nombre de usuario es requerido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (this.password.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }


}
