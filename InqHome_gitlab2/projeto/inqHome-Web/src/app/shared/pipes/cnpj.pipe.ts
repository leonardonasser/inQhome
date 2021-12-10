import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {

  constructor(private maskService: MaskApplierService) {}

  transform(value: string): string {
    return this.maskService.applyMask(value, '00.000.000/0000-00');
  }
}
