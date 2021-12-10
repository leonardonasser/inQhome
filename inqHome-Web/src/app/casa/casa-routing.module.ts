import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasaPageComponent } from './casa-page.component';
import { CasaNovoPageComponent } from './casa-novo-page.component';
import { CasaEditarPageComponent } from './casa-editar-page.component';

const routes: Routes = [
  { path: '', component: CasaPageComponent },
  { path: 'novo', component: CasaNovoPageComponent },
  { path: ':id', component: CasaEditarPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasaRoutingModule { }
