import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Anuncio, AnuncioService } from './anuncio.service';

@Component({
  selector: 'app-anuncio-editar-page',
  templateUrl: './anuncio-editar-page.component.html',
  styleUrls: []
})
export class AnuncioEditarPageComponent implements OnInit {

  anuncio: Anuncio;

  loading = false;

  constructor(
      private anuncioService: AnuncioService,
      private router: Router,
      private route: ActivatedRoute,
      private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
        ({ id }) => this.recuperar(id)
    );
  }

  recuperar(anuncioID: number) {
    this.loading = true;
    this.anuncioService.get(anuncioID)
        .subscribe(
            anuncio => {
              this.loading = false;
              this.anuncio = anuncio;
            },
            (e) => {
              this.loading = false;
              this.router.navigate(['/anuncio']);
              this.message.error(e.message);
            }
        );
  }

}
