import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Album } from '../album';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumCreateService {

  private apiUrl = environment.baseUrl + 'albums';

  constructor(private http: HttpClient) { }

  createAlbum(newAlbum: Album): Observable<Album> {

    return this.http.post<Album>(this.apiUrl, newAlbum);
  }

}
