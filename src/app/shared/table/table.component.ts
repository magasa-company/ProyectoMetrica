import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';

export interface TableRow {
  columns: string[];
  viewButtonClick?: () => void;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  @Input() headers: string[];
  @Input() rows: TableRow[];
  @Input() tableContentName: TableRow[];

  constructor() { }

  ngOnInit(): void { }
}
