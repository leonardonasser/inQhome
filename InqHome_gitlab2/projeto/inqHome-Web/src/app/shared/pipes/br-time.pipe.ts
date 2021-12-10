import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brTime',
})
export class BrTimePipe implements PipeTransform {

  transform(value: string | number | Date, showSeconds = false): string {
    if (showSeconds) {
      return formatDate(value, 'HH:mm:ss', 'pt');
    }

    return formatDate(value, 'HH:mm', 'pt');
  }
}
