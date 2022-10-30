import { Component, OnInit } from '@angular/core';
import { Album } from '../albums/album';
import { AlbumsService } from '../albums/albums.service';
import type { Musician } from '../musician/musician';
import { MusicianService } from '../musician/musician.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public musician?: Musician;
  public musicians?: Musician[];
  public albums?: Album[];

  constructor(
    private musicianService: MusicianService,
    private albumService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.getMusicians();
    this.getAlbums();
  }

  getMusicians(): void {
    this.musicianService.getMusicians()
      .subscribe((musicians) => {
        this.musicians = musicians.slice(0, 3);
        this.musician = musicians[0];
      });
  }

  getAlbums(): void {
    this.albumService.getAlbums()
      .subscribe((albums) => {
        this.albums = albums.slice(0, 3);
      });
  }
}
