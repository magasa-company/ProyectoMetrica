import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import '@angular/localize/init';
import { Track } from './tracks';
import { TracksCreateService } from './tracks-create.service';
import { AlbumDetailsService } from '../album-details/album-details.service';
import { Album } from '../album';

@Component({
  selector: 'app-tracks-create',
  templateUrl: './tracks-create.component.html',
  styleUrls: ['./tracks-create.component.css']
})
export class TracksCreateComponent implements OnInit {
  trackForm: FormGroup;
  formBuilder: FormBuilder;

  public breadcrumbs = ['Home', $localize`:@@AlbumsTitulo:Álbumes`];

  public title: string = $localize`:@@AgregarTrackTitulo:Agregar nueva canción`;
  public subtitle = 'TBD';
  public imageSrc = '';

  public albumId?: number;
  constructor(private createTrackService: TracksCreateService,
              private getAlbumDetailsService: AlbumDetailsService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.albumId = params.id; });
    this.formBuilder = new FormBuilder();
    this.trackForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required,
      Validators.pattern('^[0-5]?[0-9]:[0-5][0-9]$')]]
    });
    this.getAlbum();
  }

  get name(): AbstractControl {
    return this.trackForm.get('name');
  }

  get duration(): AbstractControl {
    return this.trackForm.get('duration');
  }

  getAlbum(): void {
    this.getAlbumDetailsService.getAlbumDetails(this.albumId).subscribe((album) => {
      this.breadcrumbs.push(album.name);
      this.breadcrumbs.push(this.title);
      this.subtitle = $localize`:@@AlbumTitulo:Álbum` + ': ' + album.name;
    });
  }

  addNewTrack(newTrack: Track): void {

    // Process checkout data here

    if (this.trackForm.valid) {

      this.createTrackService.addTrack(newTrack, this.albumId).subscribe((item) => {
        this.toastrService.success('Guardado con éxito');
        this.router.navigate(['albumes', this.albumId]);

      });
    }

  }

  cleanFields(): void {
    this.trackForm.reset();
  }

  cancelCreation(): void {
    this.router.navigate(['albumes', this.albumId]);
  }

}
