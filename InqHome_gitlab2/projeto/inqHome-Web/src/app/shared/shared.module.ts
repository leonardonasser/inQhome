import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Others
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

// App
import { BrCurrencyPipe } from './pipes/br-currency.pipe';
import { BrDatePipe } from './pipes/br-date.pipe';
import { BrTimePipe } from './pipes/br-time.pipe';
import { BrDateTimePipe } from './pipes/br-date-time.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { DateRangesDirective } from './directives/date-ranges.directive';

const pipes = [
  BrCurrencyPipe,
  BrDatePipe,
  BrTimePipe,
  BrDateTimePipe,
  CpfPipe,
  CnpjPipe,
  CpfCnpjPipe,
  CepPipe,
  PhonePipe,
];

const directives = [
  DateRangesDirective,
];

const publicModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

const currencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    ...pipes,
    ...directives,
  ],
  imports: [
    ...publicModules,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(currencyMaskConfig),
  ],
  exports: [
    ...publicModules,
    ...pipes,
    ...directives,
    NgxMaskModule,
    NgxCurrencyModule,
  ],
})
export class SharedModule { }
