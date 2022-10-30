import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Collector } from '../collector';

@Injectable({
  providedIn: 'root'
})
export class CollectorsCreateService {

  private apiUrl = environment.baseUrl + 'collectors';

  constructor(private http: HttpClient) { }
  createCollector(newCollector: Collector): Observable<Collector> {
    return this.http.post<Collector>(this.apiUrl, newCollector);
  }
}
