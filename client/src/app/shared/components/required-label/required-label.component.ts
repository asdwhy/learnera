import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-required-label',
  templateUrl: './required-label.component.html',
  styleUrls: ['./required-label.component.scss']
})
export class RequiredLabelComponent implements OnInit {
  @Input()
  value = ""
  constructor() { }

  ngOnInit(): void {
  }

}
