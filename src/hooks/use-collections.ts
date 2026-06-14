import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export function useCollections() {
  return useLiveQuery(
    () => db.collections.orderBy("createdAt").reverse().toArray(),
    [],
  );
}

export function useCollection(id: string) {
  return useLiveQuery(() => db.collections.get(id), [id]);
}
