import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export interface LoginData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Output() loginSubmit = new EventEmitter<LoginData>();

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // Getters para fácil acceso a los controles
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

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginSubmit.emit(this.loginForm.value as LoginData);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.loginForm.reset();
  }
}
