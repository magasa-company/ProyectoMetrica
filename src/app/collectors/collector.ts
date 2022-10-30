import { Comment } from '../albums/comments/comments';
import { CollectorAlbums } from './collector-albums/collectoralbums';

export class Collector {
  id: number;
  name: string;
  telephone: string;
  email: string;
  comments: Comment[];
  favoritePerformers: any[];
  cantidad: number;
  collectorAlbums: CollectorAlbums[];
}
