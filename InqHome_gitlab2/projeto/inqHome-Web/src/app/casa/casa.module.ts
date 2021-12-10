import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';


import { CasaRoutingModule } from './casa-routing.module';
import { CasaPageComponent } from './casa-page.component';
import { CasaFormComponent } from './casa-form.component';
import { CasaNovoPageComponent } from './casa-novo-page.component';
import { CasaEditarPageComponent } from './casa-editar-page.component';


@NgModule({
  declarations: [
    CasaPageComponent,
    CasaNovoPageComponent,
    CasaEditarPageComponent,
    CasaFormComponent
  ],
  imports: [
    SharedModule,
    ThemeModule,
    CasaRoutingModule
  ]
})
export class CasaModule { }
