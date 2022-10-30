import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Collector } from './collector';
import { CollectorsService } from './collectors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableRow } from '../shared/table/table.component';
interface CollectorsTable {
  headers: string[];
  rows: TableRow[];
}
@Component({
  selector: 'app-collectors',
  templateUrl: './collectors.component.html',
  styleUrls: ['./collectors.component.css']
})
export class CollectorsComponent implements OnInit {
  collectors?: Collector[];
  table: CollectorsTable = {
    headers: [$localize`:@@NombreMusico:Nombre`, 'Email', $localize`:@@TelefonoColeccionista:Telephone`],
    rows: []
  };
  title = $localize`:@@7b58538b1dd31df6643c09049be1550edbc8641e:Coleccionistas`;

  @Output() Collector: Collector;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      public collectorService: CollectorsService
    ) {
    }

    ngOnInit(): void {
      this.getCollectorsList();
    }

    getCollectorsList(): void {
      this.collectorService.getCollectorsList()
        .subscribe((collectors) => {
          this.collectors = collectors;
          this.table.rows = collectors.map(({id, name, email, telephone}) => ({
            columns: [name, email, telephone],
            viewButtonClick: () => this.router.navigate([`./${id}`], { relativeTo: this.route })
          }));
        });
    }

    deleteCollector(id: number): void {
      this.collectorService.deleteCollector(id).subscribe(collector => {  });
    }


    navigateToCreate = () => this.router.navigate(['./agregar'], { relativeTo: this.route });
}

