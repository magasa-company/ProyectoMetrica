import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import type { Musician, MusicianCreateKeys } from './musician';

interface CreateMusicianResponse extends MusicianCreateKeys {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class MusicianService {
  apiUrl: string = environment.baseUrl + 'musicians';

  constructor(private http: HttpClient) { }

  getMusicians(): Observable<Musician[]> {
    return this.http.get<Musician[]>(this.apiUrl);
  }

  getMusician(id: number): Observable<Musician> {
    return this.http.get<Musician>(`${this.apiUrl}/${id}`);
  }

  createMusician(musician: MusicianCreateKeys): Observable<CreateMusicianResponse> {
    return this.http.post<CreateMusicianResponse>(this.apiUrl, musician);
  }
}
