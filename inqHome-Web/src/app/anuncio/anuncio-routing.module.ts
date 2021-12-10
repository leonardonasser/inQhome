import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnuncioPageComponent } from './anuncio-page.component';
import { AnuncioNovoPageComponent } from './anuncio-novo-page.component';
import { AnuncioEditarPageComponent } from './anuncio-editar-page.component';

const routes: Routes = [
  { path: '', component: AnuncioPageComponent },
  { path: 'novo', component: AnuncioNovoPageComponent },
  { path: ':id', component: AnuncioEditarPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnuncioRoutingModule { }
