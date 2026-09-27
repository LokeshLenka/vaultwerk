import { getCollectionById, listCollections } from "@/lib/services/collection-service";
import { useApiDoc, useApiList } from "@/lib/api/useApi";
import type { CollectionRecord } from "@/lib/types/collection";

export function useCollections(): CollectionRecord[] {
  const { data } = useApiList(listCollections);
  return data;
}

export function useCollection(id: string) {
  const { data } = useApiDoc(() => getCollectionById(id), [id]);
  return data;
}
