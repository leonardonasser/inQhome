// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NG-ZORRO
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzProgressModule } from 'ng-zorro-antd/progress';

// Others
import { QuillConfig, QuillModule } from 'ngx-quill';

// App
import { tips } from './validation-tips';
import { SharedModule } from '../shared/shared.module';
import { IconsProviderModule } from './icons-provider.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { EnumTagComponent } from './enum-tag/enum-tag.component';

const publicComponents = [
  DashboardLayoutComponent,
  PageHeaderComponent,
  CrudTableComponent,
  FormFooterComponent,
  EnumTagComponent,
];

const publicModules = [
  // ng-zorro
  IconsProviderModule,
  NzLayoutModule,
  NzMenuModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzButtonModule,
  NzCheckboxModule,
  NzCardModule,
  NzAlertModule,
  NzMessageModule,
  NzAvatarModule,
  NzToolTipModule,
  NzDropDownModule,
  NzTableModule,
  NzDividerModule,
  NzTagModule,
  NzModalModule,
  NzRadioModule,
  NzSelectModule,
  NzOutletModule,
  NzDatePickerModule,
  NzTabsModule,
  NzPopoverModule,
  NzSpinModule,
  NzResultModule,
  NzSkeletonModule,
  NzDescriptionsModule,
  NzStatisticModule,
  NzUploadModule,
  NzEmptyModule,
  NzProgressModule,
];

const ngZorroConfig: NzConfig = {
  form: {
    nzAutoTips: tips,
  },
};

const quillConfig: QuillConfig = {
  placeholder: '',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean'],
    ]
  }
};

@NgModule({
  declarations: [
    ...publicComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...publicModules,
    QuillModule.forRoot(quillConfig),
  ],
  exports: [
    ...publicModules,
    ...publicComponents,
    QuillModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
})
export class ThemeModule { }
