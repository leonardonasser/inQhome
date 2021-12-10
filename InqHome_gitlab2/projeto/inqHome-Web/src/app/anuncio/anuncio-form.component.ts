import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isFormInvalid } from '../shared/utils/form-utils';
import { Anuncio, AnuncioService } from './anuncio.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CasaService } from '../casa/casa.service';

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: []
})
export class AnuncioFormComponent implements OnInit {

  @Input() anuncio: Anuncio | null = null;

  form: FormGroup;

  pessoas: any[] = [];
  tiposAnuncio: any[] = [];
  usuarios: any[] = [];
  casas: any[] = [];

  loading = false;

  constructor(
    private anuncioService: AnuncioService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private message: NzMessageService,
    private usuarioService: UsuarioService,
    private casaService: CasaService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idUsuario: [this.anuncio?.usuario.idUsuario, [Validators.required]],
      descricao: [this.anuncio?.descricao, [Validators.required] ],
      vagasDisponiveis: [this.anuncio?.vagasDisponiveis, [Validators.required] ],
      ativo: [this.anuncio?.ativo],
    });
    
    this.listarUsuarios();
  }

  get isNovo() {
    return this.anuncio == null;
  }

  voltar() {
    this.location.back();
  }

  get mensagemSucesso() {
    return this.isNovo ? 'Anuncio criado com sucesso' : 'Anuncio atualizado com sucesso';
  }

  submit() {
    if (isFormInvalid(this.form)) {
      return;
    }

    this.loading = true;

    if (this.anuncio == null || this.anuncio.id == null) {
      this.salvar();
    } else {
      this.atualizar();
    }

  }

  salvar() {

    this.anuncioService.salvar(this.form.value)
      .subscribe(
        () => {
          this.loading = false;
          this.message.success(this.mensagemSucesso);
          this.router.navigate(['anuncios']);
        },
        (e) => {
          this.loading = false;
          this.message.error(e.message);
        }
      );
  }

  atualizar() {

    console.log(this.form.value)
    if (this.anuncio) {
      this.anuncioService.atualizar(this.anuncio.id, this.form.value)
        .subscribe(
          () => {
            this.loading = false;
            this.message.success(this.mensagemSucesso);
            this.router.navigate(['anuncios']);
          },
          (e) => {
            this.loading = false;
            this.message.success(e.message);
          }
        );
    }
  }
  listarUsuarios() {
    this.usuarioService.listar()
      .subscribe(
        dados => {
          console.log(dados);
          this.usuarios = dados.map(usuario => ({ label: usuario.nome, value: usuario.idUsuario }));
        },
        (e) => {
          this.message.error(e.message);
        }
      );
  }

}
