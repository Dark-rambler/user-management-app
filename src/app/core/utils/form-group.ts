import { FormControl, FormGroup, Validators } from "@angular/forms";

export class FormUtils {
  static getDefaultLoginFormGroup(): FormGroup {
    return new FormGroup({
      userName: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
