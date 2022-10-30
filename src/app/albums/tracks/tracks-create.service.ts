import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Track } from './tracks';

@Injectable({
  providedIn: 'root'
})
export class TracksCreateService {

  private apiUrl = environment.baseUrl + 'albums';

  constructor(private http: HttpClient) { }

  addTrack(newTrack: Track, albumId: number): Observable<Track> {

    return this.http.post<Track>(this.apiUrl + '/' + albumId + '/tracks', newTrack);
  }

}
