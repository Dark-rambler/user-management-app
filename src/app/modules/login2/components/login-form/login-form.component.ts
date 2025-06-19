import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormUtils } from '../../../../core/utils/form-group';
import { Router } from '@angular/router';

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

  constructor(private route: Router) {
    this.loginForm = FormUtils.getDefaultLoginFormGroup();
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.disabled = true;
      setTimeout(() => {
        this.route.navigate(['/user-management']);
      }, 1000);
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
