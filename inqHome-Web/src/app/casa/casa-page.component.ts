import { Component, OnInit } from '@angular/core';
import LoadingSubject from '../shared/utils/loading-subject';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Casa, CasaFilter, CasaService } from './casa.service';

@Component({
  selector: 'app-casa-page',
  templateUrl: './casa-page.component.html',
  styleUrls: []
})
export class CasaPageComponent implements OnInit {

  casa$ = new LoadingSubject<Casa[]>();

  casas: Casa[] = [];

  filtro: CasaFilter = {};

  loading = false;

  constructor(
    private casaService: CasaService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.casa$.asObservable()
      .subscribe(
        ({ loading, value, error }) => {
          if (error) {
            this.message.error(error.message);
            return;
          }

          this.loading = loading;
          this.casas = value || [];
        }
      );

    this.listar();
  }

  listar() {
    const observable = this.casaService.listar();
    this.casa$.next(observable);
  }


  novo() {
    this.router.navigate(['casas', 'novo']);
  }

  editar(casa: Casa) {
    this.router.navigate(['casas', casa.idCasa]);
  }

  remover(casa: Casa) {
    this.modal.confirm({
      nzTitle: 'Remover',
      nzContent: `Deseja realmente remover a casa ?`,
      nzOnOk: () => this.doRemover(casa),
      nzOkText: 'Confirmar',
    });
  }

  doRemover(casa: Casa) {
    return this.casaService.removerDespesa(casa.idCasa)
      .toPromise()
      .then(() => {
        this.message.success('Casa removido com sucesso');
        this.listar();
      })
      .catch(e => {
        this.message.error(e.message);
      });
  }



}
