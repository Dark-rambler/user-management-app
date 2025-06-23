import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDate',
  standalone: true
})
export class BirthDatePipe implements PipeTransform {
  public transform(value: string | Date | undefined | null): string {
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
