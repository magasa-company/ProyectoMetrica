import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Collector } from '../collector';
import { Musician } from '../../musician/musician';
import { CreateMusicianPayload, CollectorsAddMusican } from './collectors-add-musican';


@Injectable({
  providedIn: 'root'
})
export class CollectorsAddMusicanService {
  private apiUrl = environment.baseUrl + 'collectors';
  constructor(private http: HttpClient) { }
  addCollerMusican(idc: number, idm: CreateMusicianPayload): Observable<CollectorsAddMusican> {

    return this.http.post<CollectorsAddMusican>(`${this.apiUrl}/${idc}/musicians/${idm}`, idm);

  }
}
