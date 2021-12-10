import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {

  constructor(private maskService: MaskApplierService) {}

  transform(value: string): string {
    return this.maskService.applyMask(value, '000.000.000-00');
  }
}
