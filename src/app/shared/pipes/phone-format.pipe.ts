import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {  transform(phone: string | undefined | null): string {
    if (!phone) return '';

    // Remover caracteres no numéricos excepto + y -
    const cleaned = phone.replace(/[^\d\+\-\(\)\s]/g, '');

    // Si ya tiene formato, devolverlo
    if (cleaned.includes('(') && cleaned.includes(')')) {
      return cleaned;
    }

    // Formato básico para números internacionales
    if (cleaned.startsWith('+')) {
      return cleaned;
    }

    // Formato para números largos (intentar formato US)
    const digits = cleaned.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone; // Devolver original si no se puede formatear
  }
}
