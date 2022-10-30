import { Album } from '../albums/album';

export interface MusicianCreateKeys {
  name: string;
  image: string;
  description: string;
  birthDate: string;
}

export interface Musician extends MusicianCreateKeys {
  id: number;
  albums: Album[];
  performerPrizes: unknown[];
}
