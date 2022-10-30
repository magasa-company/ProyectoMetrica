export class Comment {
  public constructor(
    public description: string,
    public rating: number,
    public id?: number
  ) { }
}

export interface CreateCommentPayload {
  description: string;
  rating: number;
  collector: {
    id: number;
  };
}
