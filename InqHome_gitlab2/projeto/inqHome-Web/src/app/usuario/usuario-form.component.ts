import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isFormInvalid } from '../shared/utils/form-utils';
import { Usuario, UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: []
})
export class UsuarioFormComponent implements OnInit {

  @Input() usuario: Usuario | null = null;

  form: FormGroup;

  pessoas: any[] = [];
  tiposUsuario: any[] = [];

  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.usuario?.nome, [Validators.required]],
      email: [this.usuario?.email, [Validators.required]],
      senha: [null, ],
      senhaConfirma: [null, ],
      ativo: [this.usuario?.ativo],
    });
    
  }

  get isNovo() {
    return this.usuario == null;
  }

  voltar() {
    this.location.back();
  }

  get mensagemSucesso() {
    return this.isNovo ? 'Usuario criado com sucesso' : 'Usuario atualizado com sucesso';
  }

  validSenha(senha: string, senhaConfirma: string) {
    return senha === senhaConfirma;
  }

  submit() {
    if (isFormInvalid(this.form)) {
      return;
    }

    if (!this.validSenha(this.form.value.senha, this.form.value.senhaConfirma)) {
      this.message.error('As senhas não coincidem! Tente novamente.');
      return;
    }

    this.loading = true;

    if (this.usuario == null || this.usuario.idUsuario == null) {
      this.salvar();
    } else {
      this.atualizar();
    }

  }

  salvar() {

    this.usuarioService.salvar(this.form.value)
      .subscribe(
        () => {
          this.loading = false;
          this.message.success(this.mensagemSucesso);
          this.router.navigate(['usuarios']);
        },
        (e) => {
          this.loading = false;
          this.message.error(e.message);
        }
      );
  }

  atualizar() {

    console.log(this.form.value)
    if (this.usuario) {
      this.usuarioService.atualizar(this.usuario.idUsuario, this.form.value)
        .subscribe(
          () => {
            this.loading = false;
            this.message.success(this.mensagemSucesso);
            this.router.navigate(['usuarios']);
          },
          (e) => {
            this.loading = false;
            this.message.success(e.message);
          }
        );
    }
  }




}
