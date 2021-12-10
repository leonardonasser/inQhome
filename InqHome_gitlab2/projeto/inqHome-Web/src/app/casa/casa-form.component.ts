import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isFormInvalid } from '../shared/utils/form-utils';
import { Casa, CasaService, Despesa, Inquilino } from './casa.service';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-casa-form',
  templateUrl: './casa-form.component.html',
  styleUrls: []
})
export class CasaFormComponent implements OnInit {

  @Input() casa: Casa | null = null;

  form: FormGroup;
  
  formDespesa: FormGroup;
  formInquilino: FormGroup;

  usuarios: any[] = [];
  despesas: Despesa[] = [];
  inquilinos: Inquilino[] = [];

  loading = false;

  constructor(
    private casaService: CasaService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuarioResponsavelId: [this.casa?.usuarioResponsavel.idUsuario, [Validators.required]],
      valorAluguel: [this.casa?.valorAluguel, [Validators.required]],
    });

    if(this.casa) {
      this.createFormDespesa();
      this.listarDespesa();
      this.createFormInquilino();
      this.listarInquilino();
    }
   
    this.listarUsuarios();  
  }

  createFormDespesa() {
    this.formDespesa = this.fb.group({
      titulo: [null,[Validators.required]],
      valor: [null, [Validators.required]],
      dataValidade: [null, [Validators.required]],
    });
  }

  createFormInquilino() {
    this.formInquilino = this.fb.group({
      inquilinoId: [null,[Validators.required]],
      casaId: [this.casa?.idCasa,[Validators.required]],
    });
  }

  get isNovo() {
    return this.casa == null;
  }

  voltar() {
    this.location.back();
  }

  get mensagemSucesso() {
    return this.isNovo ? 'Casa criada com sucesso' : 'Casa atualizada com sucesso';
  }

  submit() {
    if (isFormInvalid(this.form)) {
      return;
    }

    this.loading = true;

    if (this.casa == null || this.casa.idCasa == null) {
      this.salvar();
    } else {
      this.atualizar();
    }

  }

  salvar() {
    this.casaService.salvar(this.form.value)
      .subscribe(
        () => {
          this.loading = false;
          this.message.success(this.mensagemSucesso);
          this.router.navigate(['casas']);
        },
        (e) => {
          this.loading = false;
          this.message.error(e.message);
        }
      );
  }

  atualizar() {
    if (this.casa) {
      this.casaService.atualizar(this.casa.idCasa, this.form.value)
        .subscribe(
          () => {
            this.loading = false;
            this.message.success(this.mensagemSucesso);
            this.router.navigate(['casas']);
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


  submitDespesa() {

    if (isFormInvalid(this.formDespesa)) {
      return;
    }

    const params = {
      titulo: this.formDespesa.value.titulo,
      valor: this.formDespesa.value.valor,
      dataValidade: this.formDespesa.value.dataValidade,
      casaId: this.casa?.idCasa
    }

  console.log(params);

    this.casaService.salvarDespesa(params)
    .subscribe(
      () => {
        this.loading = false;
        this.message.success("Despesa inserida com sucesso!");
        this.listarDespesa();
      },
      (e) => {
        this.loading = false;
        this.message.error(e.message);
      }
    );
  }

  listarDespesa() {
    this.casaService.listarDespesa()
      .subscribe(
        dados => {
          this.despesas = dados;
        },
        (e) => {
          this.message.error(e.message);
        }
      );
  }

  deleteDespesa(despesaId: number) {
    return this.casaService.removerDespesa(despesaId)
      .toPromise()
      .then(() => {
        this.message.success('Despesa removida com sucesso');
        this.listarDespesa();
      })
      .catch(e => {
        this.message.error(e.message);
      });
  }



  submitInquilino() {

    if (isFormInvalid(this.formInquilino)) {
      return;
    }

    this.casaService.salvarInquilino(this.formInquilino.value)
    .subscribe(
      () => {
        this.loading = false;
        this.message.success("Inquilino inserido com sucesso!");
        this.listarInquilino();
      },
      (e) => {
        this.loading = false;
        this.message.error(e.message);
      }
    );
  }

  listarInquilino() {
    this.casaService.listarInquilino()
      .subscribe(
        dados => {
          this.inquilinos = dados;
        },
        (e) => {
          this.message.error(e.message);
        }
      );
  }

  deleteInquilino(inquilinoId: number) {
    return this.casaService.removerInquilino(inquilinoId)
      .toPromise()
      .then(() => {
        this.message.success('Inquilino removida com sucesso');
        this.listarInquilino();
      })
      .catch(e => {
        this.message.error(e.message);
      });
  }


}
