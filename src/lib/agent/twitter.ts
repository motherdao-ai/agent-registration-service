import { createOrFetchThing, createTriple } from "../intuition/atoms";

/**
 * Adds a Twitter/X handle to an entity by creating a triple relationship.
 * This function creates or fetches the necessary things (handle and predicate) and
 * establishes a relationship between the entity and the Twitter handle.
 *
 * @param {Object} params - The parameters for adding a Twitter handle
 * @param {bigint} params.entityId - The ID of the entity to associate the handle with
 * @param {string} params.twitterHandle - The Twitter handle to associate with the entity (must match format @[a-zA-Z0-9_]{3,15})
 * @returns {Promise<void>} A promise that resolves when the handle has been added
 *
 * @example
 * ```ts
 * await addTwitterHandle({
 *   entityId: 123n,
 *   twitterHandle: "@johndoe"
 * });
 * ```
 */
export async function addTwitterHandle({
  entityId,
  twitterHandle,
}: {
  entityId: bigint;
  twitterHandle: string;
}) {
  const twitterHandleId = await createOrFetchThing({
    name: twitterHandle,
    description: "a X (twitter) user handle",
    image: "",
    url: "",
  });

  const usesTwitterHandlePredicateId = await createOrFetchThing({
    name: "usesXOrTwitterHandle",
    description: "",
    image: "",
    url: "",
  });

  await createTriple(entityId, usesTwitterHandlePredicateId, twitterHandleId);
}
