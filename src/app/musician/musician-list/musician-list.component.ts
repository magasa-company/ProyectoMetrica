import { Component, OnInit } from '@angular/core';
import { MusicianService } from '../musician.service';
import { Router, ActivatedRoute } from '@angular/router';

import type { Musician } from '../musician';
import type { TableRow } from '../../shared/table/table.component';
interface MusiciansTable {
  headers: string[];
  rows: TableRow[];
  tableContentName: string;
}
@Component({
  selector: 'app-musician-list',
  templateUrl: './musician-list.component.html',
  styleUrls: ['./musician-list.component.css']
})
export class MusicianListComponent implements OnInit {
  musicians: Musician[];
  table: MusiciansTable = {
    headers: [$localize`:@@AlbumsMusico:Músico`, $localize`:@@NombreMusico:Nombre`],
    rows: [],
    tableContentName: 'musicos'
  };
  title = $localize`:@@6fa400b45b8518d2bdc434c365dbf6c62c1b485c: Músicos `;

  constructor(
    private musicianService: MusicianService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMusicians();
  }

  getMusicians(): void {
    this.musicianService.getMusicians()
      .subscribe((musicians) => {
        this.musicians = musicians;
        this.table.rows = musicians.map(({ id, image, name }) => ({
          columns: [imgTag(image), name],
          viewButtonClick: () => this.router.navigate([`./${id}`], { relativeTo: this.route })
        }));
      });
  }

  navigateToCreate = () => this.router.navigate(['./agregar'], { relativeTo: this.route });
}


function imgTag(src: string): string {
  return `<img class="table-avatar" src="${src}" alt="Imagen de músico" />`;
}
