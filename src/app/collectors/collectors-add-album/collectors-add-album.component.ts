import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectorsService } from 'src/app/collectors/collectors.service';
import { Album } from 'src/app/albums/album';
import { AlbumsService } from 'src/app/albums/albums.service';
import { CollectorsAddAlbumService } from 'src/app/collectors/collectors-add-album/collectors-add-album.service';
import { Collector } from '../collector';

@Component({
  selector: 'app-collectors-add-album',
  templateUrl: './collectors-add-album.component.html',
  styleUrls: ['./collectors-add-album.component.scss']
})
export class CollectorsAddAlbumComponent implements OnInit {
  public title = 'Agregar álbum a coleccionista';
  public commentForm: FormGroup;
  public maxDescriptionLength = 500;
  public musicanOptions: Array<{ label: string, value: number }> = [];
  public collectorId: number;
  public collector?: Collector;
  public isLoading = true;
  public albums?: Album[];
  public breadcrumbs = ['Home', 'Coleccionistas'];

  constructor(
    private formBuilder: FormBuilder,
    private collectorsService: CollectorsService,
    private collersalbumsService: CollectorsAddAlbumService,
    private albumsService: AlbumsService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectorId = params.id;
    });

    this.commentForm = this.formBuilder.group({
      albumId: ['', Validators.required]
    });

    this.route.params.subscribe(params => this.getCollector(params.id));
    this.getAlbums();
  }

  get albumId(): AbstractControl {
    return this.commentForm.get('albumId');
  }

  getCollector(id: number): void {
    this.collectorsService.getCollector(id)
      .subscribe((collector) => {
        this.collector = collector;
        this.breadcrumbs.push(collector.name);
      });
  }

  getAlbums(): void {
    this.albumsService.getAlbums()
      .subscribe((albums) => {
        this.isLoading = false; this.musicanOptions = albums.map((musician) =>
          ({label: musician.name, value: musician.id})
        );
      });
  }


  addAlbums(): void {
    const ida =  this.commentForm.value.albumId;
    const payload = {
      price: 25,
      status: 'Active'
    };

    this.collersalbumsService.addCollerAlbums(this.collectorId, ida, payload).subscribe(() => {
      this.toastrService.success(
        'El álbum ha sido asignado exitosamente al coleccionista.',
        'Álbum asignado al coleccionista'
      );
      this.router.navigate(['coleccionistas', this.collectorId]);
    });
  }

  navigateBack(): void {
    this.router.navigate(['coleccionistas', this.collectorId]);
  }
}
