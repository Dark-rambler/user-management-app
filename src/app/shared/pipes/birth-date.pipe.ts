import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDate',
  standalone: true
})
export class BirthDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    
    try {
      const date = new Date(value);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return value.toString();
    }
  }
}
