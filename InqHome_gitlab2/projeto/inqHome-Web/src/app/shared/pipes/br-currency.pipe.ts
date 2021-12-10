import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brCurrency',
})
export class BrCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return formatCurrency(value, 'pt', 'R$', 'BRL');
  }
}
