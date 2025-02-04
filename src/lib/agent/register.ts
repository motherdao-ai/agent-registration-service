import { createOrFetchThing, createTriple } from "../intuition/atoms";
import { addEthWallet } from "./ethereum-wallet";

/**
 * Registers a new agent by creating the necessary entities and relationships.
 * This function creates or fetches things for the agent, its primary function,
 * and establishes relationships between them.
 *
 * @param {Object} params - The parameters for registering an agent
 * @param {string} params.name - The name of the agent
 * @param {string} [params.description] - Optional description of the agent
 * @param {string} params.primaryFunction - The main function/purpose of the agent
 * @param {string} params.ethWallet - The Ethereum wallet address associated with the agent (must match format 0x[0-9a-fA-F]{40})
 * @returns {Promise<bigint>} A promise that resolves to the agent's ID
 *
 * @example
 * ```ts
 * const agentId = await registerAgent({
 *   name: "AI Assistant",
 *   description: "A helpful AI agent",
 *   primaryFunction: "Customer Support",
 *   ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
 * });
 * ```
 */
export async function registerAgent({
  name,
  description = "",
  primaryFunction,
  ethWallet = "",
}: {
  name: string;
  description?: string;
  primaryFunction: string;
  ethWallet: string;
}) {
  const agentId = await createOrFetchThing({
    name,
    description,
    url: "",
    image: "",
  });

  const primaryFunctionOfAgentId = await createOrFetchThing({
    name: primaryFunction,
    description: "an action performed by something or somebody",
    url: "",
    image: "",
  });

  const primaryFunctionPredicateId = await createOrFetchThing({
    name: "primaryFunction",
    url: "",
    image: "",
    description: "",
  });

  await createTriple(
    agentId,
    primaryFunctionPredicateId,
    primaryFunctionOfAgentId
  );

  await addEthWallet({
    entityId: agentId,
    ethWallet: ethWallet,
  });

  return agentId;
}
