export const COLLECTION_NAME_MIN = 2;
export const COLLECTION_NAME_MAX = 50;
export const COLLECTION_DESCRIPTION_MAX = 300;

export type CollectionFormValues = {
  name: string;
  description: string;
};

export function normalizeCollectionName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateCollectionInput(values: CollectionFormValues) {
  const name = normalizeCollectionName(values.name);
  const description = values.description.trim();
  const errors: Partial<Record<keyof CollectionFormValues, string>> = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < COLLECTION_NAME_MIN) {
    errors.name = `Name must be at least ${COLLECTION_NAME_MIN} characters`;
  } else if (name.length > COLLECTION_NAME_MAX) {
    errors.name = `Name must be at most ${COLLECTION_NAME_MAX} characters`;
  }

  if (description.length > COLLECTION_DESCRIPTION_MAX) {
    errors.description = `Description must be at most ${COLLECTION_DESCRIPTION_MAX} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalized: {
      name,
      description: description || null,
    },
  };
}
