import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';


import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioPageComponent } from './anuncio-page.component';
import { AnuncioFormComponent } from './anuncio-form.component';
import { AnuncioNovoPageComponent } from './anuncio-novo-page.component';
import { AnuncioEditarPageComponent } from './anuncio-editar-page.component';


@NgModule({
  declarations: [
    AnuncioPageComponent,
    AnuncioNovoPageComponent,
    AnuncioEditarPageComponent,
    AnuncioFormComponent
  ],
  imports: [
    SharedModule,
    ThemeModule,
    AnuncioRoutingModule
  ]
})
export class AnuncioModule { }
