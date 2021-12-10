import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Usuario, UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario-editar-page',
  templateUrl: './usuario-editar-page.component.html',
  styleUrls: []
})
export class UsuarioEditarPageComponent implements OnInit {

  usuario: Usuario;

  loading = false;

  constructor(
      private usuarioService: UsuarioService,
      private router: Router,
      private route: ActivatedRoute,
      private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
        ({ id }) => this.recuperar(id)
    );
  }

  recuperar(usuarioID: number) {
    this.loading = true;
    this.usuarioService.get(usuarioID)
        .subscribe(
            usuario => {
              this.loading = false;
              this.usuario = usuario;
            },
            (e) => {
              this.loading = false;
              this.router.navigate(['/usuario']);
              this.message.error(e.message);
            }
        );
  }

}
