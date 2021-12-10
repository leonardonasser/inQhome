import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioPageComponent } from './usuario-page.component';
import { UsuarioNovoPageComponent } from './usuario-novo-page.component';
import { UsuarioEditarPageComponent } from './usuario-editar-page.component';

const routes: Routes = [
  { path: '', component: UsuarioPageComponent },
  { path: 'novo', component: UsuarioNovoPageComponent },
  { path: ':id', component: UsuarioEditarPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
