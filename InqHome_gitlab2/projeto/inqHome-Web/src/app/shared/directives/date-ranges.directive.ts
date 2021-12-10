import { Directive, Input, OnInit } from '@angular/core';
import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

function todayRange() {
  return [new Date(), new Date()];
}

function thisMonthRange() {
  return [startOfMonth(new Date()), endOfMonth(new Date())];
}

function lastMonthRange() {
  const dateLastMonth = subMonths(new Date(), 1);
  return [startOfMonth(dateLastMonth), endOfMonth(dateLastMonth)];
}

function nextMonthRange() {
  const dateNextMonth = addMonths(new Date(), 1);
  return [startOfMonth(dateNextMonth), endOfMonth(dateNextMonth)];
}

type RangeType = 'TODAY' | 'THIS_MONTH' | 'LAST_MONTH' | 'NEXT_MONTH';

@Directive({
  selector: 'nz-range-picker[appDateRanges]'
})
export class DateRangesDirective implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('appDateRanges') includeRanges: RangeType[];

  // tslint:disable-next-line: no-input-rename
  @Input('appDateRangesExclude') excludeRanges: RangeType[] = [];

  defaultDateRanges = ['TODAY', 'THIS_MONTH', 'LAST_MONTH', 'NEXT_MONTH'];

  availableRanges = {
    'TODAY': { label: 'Hoje', rangeFn: todayRange },
    'THIS_MONTH': { label: 'Esse Mês', rangeFn: thisMonthRange },
    'LAST_MONTH': { label: 'Mês Anterior', rangeFn: lastMonthRange },
    'NEXT_MONTH': { label: 'Próximo Mês', rangeFn: nextMonthRange },
  };

  constructor(private datePicker: NzDatePickerComponent) { }

  ngOnInit(): void {
    this.datePicker.nzRanges = this.ranges;
  }

  get ranges() {
    const includeRanges = this.includeRanges || this.defaultDateRanges;

    return includeRanges
      .filter(rangeType => !this.excludeRanges.includes(rangeType))
      .reduce((rangesAcc, rangeType) => {
        const range = this.availableRanges[rangeType];

        return {
          ...rangesAcc,
          [range.label]: range.rangeFn,
        };
      }, {});
  }

}
