import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brDate',
})
export class BrDatePipe implements PipeTransform {

  transform(value: string | number | Date): string {
    return formatDate(value, 'dd/MM/yyyy', 'pt');
  }
}
