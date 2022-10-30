export class CollectorsAddAlbum {
  public constructor(
    public price: number,
    public status: string
) { }
}

export interface CreateAlbumPayload {
  price: number;
  status: string;
}

