import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Casa, CasaService } from './casa.service';

@Component({
  selector: 'app-casa-editar-page',
  templateUrl: './casa-editar-page.component.html',
  styleUrls: []
})
export class CasaEditarPageComponent implements OnInit {

  casa: Casa;

  loading = false;

  constructor(
      private casaService: CasaService,
      private router: Router,
      private route: ActivatedRoute,
      private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
        ({ id }) => this.recuperar(id)
    );
  }

  recuperar(casaID: number) {
    this.loading = true;
    this.casaService.get(casaID)
        .subscribe(
            casa => {
              this.loading = false;
              this.casa = casa;
            },
            (e) => {
              this.loading = false;
              this.router.navigate(['/casa']);
              this.message.error(e.message);
            }
        );
  }

}
