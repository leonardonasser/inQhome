import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() pretitle: string;
  @Input() subtitle: string;
  @Input() noMargin = false;
  @Input() noBorder = false;

  constructor() { }

  ngOnInit(): void {
  }

}
