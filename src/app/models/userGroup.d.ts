declare interface UserGroup {
  _id: string;
  name: string;
  type: { USER; EMAIL };
  values: string[];
  deprecated: boolean;
  notes: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
