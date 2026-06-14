export interface CollectionRecord {
  id: string;
  name: string;
  description: string | null;
  toolIds: string[];
  createdAt: string;
  updatedAt: string;
}
