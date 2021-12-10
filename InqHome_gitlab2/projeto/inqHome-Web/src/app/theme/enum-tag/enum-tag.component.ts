import { Component, Input, OnInit } from '@angular/core';

interface EnumOption {
  label: string;
  color: string;
}

type Color = string;

@Component({
  selector: 'app-enum-tag',
  templateUrl: './enum-tag.component.html',
})
export class EnumTagComponent implements OnInit {

  @Input() enumValue: string;
  @Input() enumOptions: Record<string, Color | EnumOption>;

  constructor() { }

  ngOnInit(): void {
  }

  get current() {
    return this.enumOptions[this.enumValue];
  }

  get currentColor() {
    if (typeof(this.current) === 'string') {
      return this.current;
    }

    return this.current.color;
  }

  get currentLabel() {
    if (typeof(this.current) === 'string') {
      return this.enumValue;
    }

    return this.current.label;
  }

}
