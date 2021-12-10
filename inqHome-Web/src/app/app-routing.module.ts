import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardLayoutComponent } from './theme/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { NotLoggedInGuard } from './auth/not-logged-in.guard';

const routes: Routes = [
 
  {
    path: 'login',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: DashboardLayoutComponent, 
    canActivate: [AuthGuard], 
     children: [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
    { path: 'casas', loadChildren: () => import('./casa/casa.module').then(m => m.CasaModule) },
    { path: 'anuncios', loadChildren: () => import('./anuncio/anuncio.module').then(m => m.AnuncioModule) },

 
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'top',
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
