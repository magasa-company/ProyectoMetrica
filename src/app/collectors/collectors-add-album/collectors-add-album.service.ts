import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateAlbumPayload, CollectorsAddAlbum } from './collectors-add-album';

@Injectable({
  providedIn: 'root'
})
export class CollectorsAddAlbumService {
  private apiUrl = environment.baseUrl + 'collectors';
  constructor(private http: HttpClient) { }
  addCollerAlbums(idc: number, ida: number, payload: CreateAlbumPayload): Observable<CollectorsAddAlbum> {

    return this.http.post<CollectorsAddAlbum>(`${this.apiUrl}/${idc}/albums/${ida}`, payload);

  }
}
