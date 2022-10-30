import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-musician-details',
  templateUrl: './musician-details.component.html',
  styleUrls: ['./musician-details.component.css']
})
export class MusicianDetailsComponent implements OnInit {
  public musician?: Musician;
  public albumsTable = {
    headers: [
      $localize`:@@AlbumsPortada:Portada`,
      $localize`:@@ListaCancionesTítulo:Título`,
      $localize`:@@AlbumsLanzamiento:Lanzamiento`
    ],
    rows: [],
    tableContentName: 'albumes'
  };
  public awardsTable = {
    headers: [
      'Nombre',
      'Organización',
      'Año'
    ],
    rows: [],
    tableContentName: 'awards'
  };
  public breadcrumbs = ['Home', $localize`:@@6fa400b45b8518d2bdc434c365dbf6c62c1b485c:Músicos`];
  public featured = [{
    title: $localize`:@@CumpleñosMusico:Cumpleaños`,
    subtitle: ''
  }];

  constructor(
    private musicianService: MusicianService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getMusician(params.id));
  }

  getMusician(id: number): void {
    this.musicianService.getMusician(id)
      .subscribe((musician) => {
        this.musician = musician;
        this.breadcrumbs.push(musician.name);

        this.featured[0].subtitle = formatDate(musician.birthDate, 'longDate', this.locale, '+0');
        this.albumsTable.rows = musician.albums.map(({ cover, releaseDate, name }) => {
          const formattedImg = imgTag(cover);
          const formattedDate = formatDate(releaseDate, 'longDate', this.locale, '+0');

          return {
            columns: [formattedImg, name, formattedDate]
          };
        });
      });
  }
}

function imgTag(src: string): string {
  return `<img class="table-avatar" src="${src}" alt="Portada de album" />`;
}
