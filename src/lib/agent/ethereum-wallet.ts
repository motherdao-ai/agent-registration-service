import { createOrFetchThing, createTriple } from "../intuition/atoms";

/**
 * Adds an Ethereum wallet address to an entity by creating a triple relationship.
 * This function creates or fetches the necessary things (wallet and predicate) and
 * establishes a relationship between the entity and the wallet.
 *
 * @param {Object} params - The parameters for adding an Ethereum wallet
 * @param {bigint} params.entityId - The ID of the entity to associate the wallet with
 * @param {string} params.ethWallet - The Ethereum wallet address (must match format 0x[0-9a-fA-F]{40})
 * @returns {Promise<void>} A promise that resolves when the wallet has been added
 *
 * @example
 * ```ts
 * await addEthWallet({
 *   entityId: 123n,
 *   ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
 * });
 * ```
 */
export async function addEthWallet({
  entityId,
  ethWallet,
}: {
  entityId: bigint;
  ethWallet: string;
}) {
  const ethWalletId = await createOrFetchThing({
    name: ethWallet,
    description: "An ethereum compatible wallet address",
    url: "",
    image: "",
  });

  const hasWalletPredicateId = await createOrFetchThing({
    name: "hasWallet",
    url: "",
    image: "",
    description: "",
  });

  await createTriple(entityId, hasWalletPredicateId, ethWalletId);
}
