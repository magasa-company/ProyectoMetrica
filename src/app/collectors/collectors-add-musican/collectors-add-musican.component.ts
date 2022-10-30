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
import type { Musician } from 'src/app/musician/musician';
import { MusicianService } from 'src/app/musician/musician.service';
import { CollectorsAddMusicanService } from 'src/app/collectors/collectors-add-musican/collectors-add-musican.service';
import { Collector } from '../collector';

@Component({
  selector: 'app-collectors-add-musican',
  templateUrl: './collectors-add-musican.component.html',
  styleUrls: ['./collectors-add-musican.component.scss']
})
export class CollectorsAddMusicanComponent implements OnInit {
  public title = 'Agregar músicos favoritos';
  public commentForm: FormGroup;
  public maxDescriptionLength = 500;
  public musicanOptions: Array<{ label: string, value: number }> = [];
  public collectorId: number;
  public collector?: Collector;
  public isLoading = true;
  musicians: Musician[];
  public breadcrumbs = ['Home', 'Coleccionistas'];

  constructor(
    private formBuilder: FormBuilder,
    private musiciansService: CollectorsAddMusicanService,
    private collectorsService: CollectorsService,
    private musicianService: MusicianService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectorId = params.id;
    });

    this.commentForm = this.formBuilder.group({
      musicianId: ['', Validators.required]
    });

    this.route.params.subscribe(params => this.getCollector(params.id));
    this.getMusicians();
  }

  get musicianId(): AbstractControl {
    return this.commentForm.get('musicianId');
  }

  getCollector(id: number): void {
    this.collectorsService.getCollector(id)
      .subscribe((collector) => {
        this.collector = collector;
        this.breadcrumbs.push(collector.name);
      });
  }

  getMusicians(): void {
    this.musicianService.getMusicians()
      .subscribe((musicians) => {
        this.isLoading = false; this.musicanOptions = musicians.map((musician) =>
          ({label: musician.name, value: musician.id})
        );
      });
  }


  addMusican(): void {
    const id =  this.commentForm.value.musicianId;


    this.musiciansService.addCollerMusican(this.collectorId, id).subscribe(() => {
      this.toastrService.success(
        'El músico ha sido creado exitosamente.',
        'Músico creado'
      );
      this.router.navigate(['coleccionistas', this.collectorId]);
    });
  }

  navigateBack(): void {
    this.router.navigate(['coleccionistas', this.collectorId]);
  }
}
