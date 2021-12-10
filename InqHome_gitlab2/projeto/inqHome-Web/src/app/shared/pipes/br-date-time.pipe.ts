import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brDateTime',
})
export class BrDateTimePipe implements PipeTransform {

  transform(value: string | number | Date, showSeconds = false): string {
    if (showSeconds) {
      return formatDate(value, 'dd/MM/yyyy HH:mm:ss', 'pt');
    }

    return formatDate(value, 'dd/MM/yyyy HH:mm', 'pt');
  }
}
