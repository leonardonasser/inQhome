import { Observable } from 'rxjs';
import { isFormInvalid } from './form-utils';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServiceError } from '../services/api.service';

export abstract class AbstractFormComponent {

  form: FormGroup;
  loading = false;

  constructor(private message: NzMessageService) { }

  submit() {
    if (isFormInvalid(this.form)) {
      return;
    }

    this.loading = true;
    this.doSubmit()
      .subscribe(
        (result) => {
          this.loading = false;

          if (this.successMessage != null) {
            this.message.success(this.successMessage);
          }

          this.afterSubmitSuccess(result);
        },
        (e: ServiceError) => {
          this.loading = false;
          this.message.error(e.message);
          this.afterSubmitError(e);
        }
      );
  }

  abstract doSubmit(): Observable<any>;

  get successMessage(): string | null {
    return null;
  }

  afterSubmitSuccess(_result: any): void { }

  afterSubmitError(_error: ServiceError): void { }
}
