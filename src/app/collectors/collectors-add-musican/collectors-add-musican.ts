export class CollectorsAddMusican {
  public constructor(
    public id?: number
) { }
}

export interface CreateMusicianPayload {

  collector: {
    id: number;
  };
}

