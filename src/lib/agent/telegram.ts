import { createOrFetchThing, createTriple } from "../intuition/atoms";

/**
 * Adds a Telegram handle to an entity by creating a triple relationship.
 * This function creates or fetches the necessary things (handle and predicate) and
 * establishes a relationship between the entity and the Telegram handle.
 *
 * @param {Object} params - The parameters for adding a Telegram handle
 * @param {bigint} params.entityId - The ID of the entity to associate the handle with
 * @param {string} params.telegramHandle - The Telegram handle to associate with the entity
 * @returns {Promise<void>} A promise that resolves when the handle has been added
 *
 * @example
 * ```ts
 * await addTelegramHandle({
 *   entityId: 123n,
 *   telegramHandle: "johndoe"
 * });
 * ```
 */
export async function addTelegramHandle({
  entityId,
  telegramHandle,
}: {
  entityId: bigint;
  telegramHandle: string;
}) {
  const usesTelegramHandlePredicateId = await createOrFetchThing({
    name: "usesTelegramHandle",
    description: "Indicates that an entity uses a specific Telegram handle",
    image: "",
    url: "",
  });

  const telegramHandleId = await createOrFetchThing({
    name: telegramHandle,
    description: "A Telegram user handle",
    image: "",
    url: "",
  });

  await createTriple(entityId, usesTelegramHandlePredicateId, telegramHandleId);
}
