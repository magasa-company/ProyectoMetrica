import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Collector } from '../collector';
import { CollectorsCreateService } from '../collectors-create/collectors-create.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collectors-create',
  templateUrl: './collectors-create.component.html',
  styleUrls: ['./collectors-create.component.scss']
})
export class CollectorsCreateComponent implements OnInit {
  collectorForm: FormGroup;
  public title = 'Agregar nuevo Coleccionista';
  collectors: Collector[];

  constructor(
    private createCollectorService: CollectorsCreateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {

  }

  createCollector(newCollector: Collector): void {
    if (this.collectorForm.valid) {
      this.createCollectorService.createCollector(newCollector).subscribe(collector => {
        this.toastr.success('Guardado con éxito');
        this.showSuccess(newCollector);
      });
    }
    this.collectorForm.reset();
  }

  showSuccess(c: Collector): void {
    this.toastr.success('Guardado con éxito');
    this.router.navigate(['coleccionistas']);
  }

  cancelCreation(): void {
    console.log('Cancelando ...');
    this.collectorForm.reset();
    this.router.navigate(['coleccionistas']);
  }

  ngOnInit(): void {
    this.collectorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}
