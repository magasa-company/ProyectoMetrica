import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Album } from './album';
import { CreateCommentPayload, Comment } from './comments/comments';
@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl = environment.baseUrl + 'albums';

  constructor(private http: HttpClient) {

  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  createAlbumComment(albumId: number, payload: CreateCommentPayload): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${albumId}/comments`, payload);
  }
}


