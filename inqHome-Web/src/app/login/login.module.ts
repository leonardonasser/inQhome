import { NgModule } from '@angular/core';

import { ThemeModule } from 'src/app/theme/theme.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ThemeModule,
    SharedModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
