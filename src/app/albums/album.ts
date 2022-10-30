import { Musician } from '../musician/musician';
import { Track } from './tracks/tracks';
import { Comment } from './comments/comments';

export class Album {

  public constructor(
    public name: string,
    public cover: string,
    public releaseDate: string,
    public description: string,
    public genre: string,
    public recordLabel: string,
    public performers: Musician[],
    public tracks: Track[],
    public comments: Comment[],
    public id?: number,
    public listaPerformers?: string
  ) {

  }
}
