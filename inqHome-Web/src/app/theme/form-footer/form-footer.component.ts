import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
})
export class FormFooterComponent implements OnInit {

  @Input() loading = false;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
