import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  constructor(private maskService: MaskApplierService) {}

  transform(value: string): string {
    if (value == null) {
      return '';
    }

    if (value.length === 10) {
      return this.maskService.applyMask(value, '(00) 0000-0000');
    }

    return this.maskService.applyMask(value, '(00) 00000-0000');
  }
}
