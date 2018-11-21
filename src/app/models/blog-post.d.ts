declare interface BlogPost {
  _id: string;
  active: boolean,
  title: string;
  body: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  category: string;
}
