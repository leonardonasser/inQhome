import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'cpfCnpj',
})
export class CpfCnpjPipe implements PipeTransform {

  constructor(private maskService: MaskApplierService) {}

  transform(value: string): string {
    return this.maskService.applyMask(value, '000.000.000-00||00.000.000/0000-00');
  }
}
