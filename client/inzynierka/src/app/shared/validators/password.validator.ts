import { FormGroup } from '@angular/forms';

// tslint:disable-next-line:typedef
export function PasswordValidator(password: string, matchingPassword: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matching = formGroup.controls[matchingPassword];
    if (matching.errors && !matching.errors.passwordValidator) {
      return;
    }
    if (control.value !== matching.value) {
      matching.setErrors({ passwordValidator: true });
    } else {
      matching.setErrors(null);
    }
  };
}
