import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAge',
  standalone: true
})
export class UserAgePipe implements PipeTransform {
  transform(birthDateString: string): number {
    if (!birthDateString) return 0;

    try {
      const birthDate = new Date(birthDateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    } catch (error) {
      return 0;
    }
  }
}
