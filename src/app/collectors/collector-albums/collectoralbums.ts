import { Album } from '../../albums/album';
import { Collector } from '../collector';
export class CollectorAlbums {
  id: number;
  price: string;
  status: number;
  album: Album[];
  collector: Collector[];
}
