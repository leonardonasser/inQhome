import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isFormInvalid } from 'src/app/shared/utils/form-utils';
import { ApiError, ServiceError } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loading = false;
  usuarioLogin: string = "";
  telaRecuperarSenha = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private message: NzMessageService,
              ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  submitLoginForm(): void {
    if (isFormInvalid(this.loginForm)) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value.login, this.loginForm.value.senha)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/']);
          this.loading = false;
        },
        (error: ServiceError) => {
          this.message.error(error.message);
          this.loading = false;
        }
      );
  }

  mostrarTelaRecuperarSenha() {
    this.telaRecuperarSenha = true;
  }

  submitRecuperarSenha() {
    this.authService.resetarSenha(this.usuarioLogin)
    .subscribe(
      () => {
        this.router.navigate(['/login']);
        this.message.success("Senha resetada com sucesso!");
        this.fecharRecuperarSenha();
        this.loading = false;
      },
      (error: ApiError) => {
        this.message.error(error.message);
        this.loading = false;
      }
    );
  }

  fecharRecuperarSenha() {
    this.telaRecuperarSenha = false;
    this.usuarioLogin = "";
  }

}
