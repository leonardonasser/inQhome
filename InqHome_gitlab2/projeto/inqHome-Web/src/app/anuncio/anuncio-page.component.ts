import { Component, OnInit } from '@angular/core';
import LoadingSubject from '../shared/utils/loading-subject';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Anuncio, AnuncioFilter, AnuncioService } from './anuncio.service';

@Component({
  selector: 'app-anuncio-page',
  templateUrl: './anuncio-page.component.html',
  styleUrls: []
})
export class AnuncioPageComponent implements OnInit {

  anuncio$ = new LoadingSubject<Anuncio[]>();

  anuncios: Anuncio[] = [];

  filtro: AnuncioFilter = {};

  loading = false;

  constructor(
    private anuncioService: AnuncioService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.anuncio$.asObservable()
      .subscribe(
        ({ loading, value, error }) => {
          if (error) {
            this.message.error(error.message);
            return;
          }

          this.loading = loading;
          this.anuncios = value || [];
        }
      );

    this.listar();
  }

  listar() {
    const observable = this.anuncioService.listar();
    this.anuncio$.next(observable);
  }


  novo() {
    this.router.navigate(['anuncios', 'novo']);
  }

  editar(anuncio: Anuncio) {
    this.router.navigate(['anuncios', anuncio.id]);
  }

  remover(anuncio: Anuncio) {
    this.modal.confirm({
      nzTitle: 'Remover',
      nzContent: `Deseja realmente remover o anuncio '${anuncio.id}'?`,
      nzOnOk: () => this.doRemover(anuncio),
      nzOkText: 'Confirmar',
    });
  }

  doRemover(anuncio: Anuncio) {
    return this.anuncioService.remover(anuncio.id)
      .toPromise()
      .then(() => {
        this.message.success('Anuncio removido com sucesso');
        this.listar();
      })
      .catch(e => {
        this.message.error(e.message);
      });
  }

}
