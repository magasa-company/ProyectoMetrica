import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Album } from '../album';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumDetailsService {

  private apiUrl = environment.baseUrl + 'albums';

  constructor(private http: HttpClient) { }

  getAlbumDetails(id: number): Observable<Album> {
    return this.http.get<Album>(this.apiUrl + '/' + id.toString());
  }

}
