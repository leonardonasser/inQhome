import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

const menuDashboard = { name: 'Dashboard', link: '/', icon: 'dashboard' };
const menuUsuario = { name: 'Usuario', link: '/usuarios', icon: 'user' };
const menuCasa = { name: 'Casa', link: '/casas', icon: 'home' };
const menuAnuncio = { name: 'Anúncio', link: '/anuncios', icon: 'profile' };



@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  isCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get usuario() {
    return this.authService.currentUser;
  }


  get menus() {
    return [menuDashboard,menuUsuario, menuCasa, menuAnuncio];
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onPerfil() {
    this.router.navigate(['perfil', this.authService.currentUser?.id]);
  }

}
