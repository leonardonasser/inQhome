import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiService } from '../../shared/services/api.service';

import { of } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent implements OnInit {

  @Input() initialImageUrl: string | null = null;
  @Input() showButton: boolean | true = true;
  @Input() showUploadList: boolean | true = true;

  @Input() file: File | null = null;
  @Output() fileChange = new EventEmitter<File | null>();

  fileList: NzUploadFile[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.initialImageUrl != null) {
      this.getImageFromRest(this.initialImageUrl, (base64Image: string) => {
        this.fileList = [
          { uid: '-1', name: 'imagem.png', url: base64Image }
        ];
      });

    }
  }

  beforeUpload = (file: any) => {
    this.emitFileChange(file);

    this.getBase64(file, (base64Image: string) => {
      this.fileList = [
        { ...file, url: base64Image }
      ];
    });

    return of(false);
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private getImageFromRest(url: string, callback: (img: string) => void): void {

    const type = url.substr(url.indexOf('.') + 1);
    this.apiService.getImage(url)
      .subscribe((response) => {

        const blob = new Blob([response], { type: 'image/' + type });

        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result!.toString()));
        reader.readAsDataURL(blob);

      },
      (e) => {

      });

  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.type === 'removed') {
      this.emitFileChange(null);
    }
  }

  emitFileChange(file: File | null) {
    this.fileChange.emit(file);
  }

}
