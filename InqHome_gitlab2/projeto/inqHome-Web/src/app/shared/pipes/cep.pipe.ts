import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {

  constructor(private maskService: MaskApplierService) {}

  transform(value: string): string {
    return this.maskService.applyMask(value, '00000-00');
  }
}
