declare interface BlogPost {
  _id?: string;
  isDraft: boolean;
  title: string;
  body: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  category: string;
  mainImageId: string;
}
