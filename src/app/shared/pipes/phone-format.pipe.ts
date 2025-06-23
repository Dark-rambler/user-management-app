import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  public transform(phone: string | undefined | null): string {
    if (!phone) return '';
    const cleaned = phone.replace(/[^\d\+\-\(\)\s]/g, '');

    if (cleaned.includes('(') && cleaned.includes(')')) {
      return cleaned;
    }

    if (cleaned.startsWith('+')) {
      return cleaned;
    }

    const digits = cleaned.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone;
  }
}
