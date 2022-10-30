import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() imgSrc?: string;
  @Input() imgAlt?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
