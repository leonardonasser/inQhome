import { Component, OnInit } from '@angular/core';
import LoadingSubject from '../shared/utils/loading-subject';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Usuario, UsuarioFilter, UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: []
})
export class UsuarioPageComponent implements OnInit {

  usuario$ = new LoadingSubject<Usuario[]>();

  usuarios: Usuario[] = [];

  filtro: UsuarioFilter = {};

  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario$.asObservable()
      .subscribe(
        ({ loading, value, error }) => {
          if (error) {
            this.message.error(error.message);
            return;
          }

          this.loading = loading;
          this.usuarios = value || [];
        }
      );

    this.listar();
  }

  listar() {
    const observable = this.usuarioService.listar();
    this.usuario$.next(observable);
  }


  novo() {
    this.router.navigate(['usuarios', 'novo']);
  }

  editar(usuario: Usuario) {
    this.router.navigate(['usuarios', usuario.idUsuario]);
  }

  remover(usuario: Usuario) {
    this.modal.confirm({
      nzTitle: 'Remover',
      nzContent: `Deseja realmente remover o usuario '${usuario.nome}'?`,
      nzOnOk: () => this.doRemover(usuario),
      nzOkText: 'Confirmar',
    });
  }

  doRemover(usuario: Usuario) {
    return this.usuarioService.remover(usuario.idUsuario)
      .toPromise()
      .then(() => {
        this.message.success('Usuario removido com sucesso');
        this.listar();
      })
      .catch(e => {
        this.message.error(e.message);
      });
  }

}
