import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MusicianService } from '../musician.service';

@Component({
  selector: 'app-musician-create',
  templateUrl: './musician-create.component.html',
  styleUrls: ['./musician-create.component.css'],
})
export class MusicianCreateComponent implements OnInit {
  public title = $localize`:@@AgregarNuevoMusico:Agregar nuevo músico`;
  public musicianForm: FormGroup;
  public maxDescriptionLength = 500;

  constructor(
    private formBuilder: FormBuilder,
    private musicianService: MusicianService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.musicianForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, imageURIValidator]],
      birthDate: ['', Validators.required],
      description: [
        '',
        [Validators.required, Validators.maxLength(this.maxDescriptionLength)],
      ],
    });
  }

  get name(): AbstractControl {
    return this.musicianForm.get('name');
  }

  get image(): AbstractControl {
    return this.musicianForm.get('image');
  }

  get description(): AbstractControl {
    return this.musicianForm.get('description');
  }

  get birthDate(): AbstractControl {
    return this.musicianForm.get('birthDate');
  }

  createMusician(): void {
    const payload = {
      name: this.musicianForm.value.name,
      description: this.musicianForm.value.description,
      image: this.musicianForm.value.image,
      birthDate: new Date(this.musicianForm.value.birthDate).toISOString(),
    };

    this.musicianService.createMusician(payload).subscribe(() => {
      this.toastrService.success(
        'El músico ha sido creado exitosamente.',
        'Músico creado'
      );
      this.router.navigate(['musicos']);
    });
  }

  navigateBack(): void {
    this.router.navigate(['musicos']);
  }
}

function imageURIValidator(control: AbstractControl): ValidationErrors | null {
  try {
    if (control.value) {
      return new URL(control.value);
    }

    return null;
  } catch (e) {
    return {
      imageURI: true,
    };
  }
}
