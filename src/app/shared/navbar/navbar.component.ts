import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() current: string;
  public collapsed = false;

  constructor() { }

  ngOnInit(): void { }

  onCollapseClick($event: Event): void {
    $event.preventDefault();
    this.collapsed = !this.collapsed;
  }
}
