import { Component, OnInit, Input } from '@angular/core';

interface FeaturedText {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css']
})
export class DetailHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle?: string;
  @Input() description?: string;
  @Input() imgSrc?: string;
  @Input() breadcrumbs: string[] = [];
  @Input() featured: FeaturedText[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
