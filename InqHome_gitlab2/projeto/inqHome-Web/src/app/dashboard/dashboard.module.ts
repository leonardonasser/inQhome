import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    SharedModule,
    ThemeModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
