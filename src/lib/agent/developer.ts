import { createOrFetchThing, createTriple } from "../intuition/atoms";

/**
 * Associates a developer with an agent using the "developedBy" predicate.
 * This creates a relationship in the knowledge graph indicating that the agent
 * was developed by the specified developer.
 *
 * @param {Object} params - The parameters object
 * @param {bigint} params.agentId - The unique identifier of the agent
 * @param {bigint} params.developerId - The unique identifier of the developer
 * @returns {Promise<void>} A promise that resolves when the association is created
 */
export async function addDeveloper({
  agentId,
  developerId,
}: {
  agentId: bigint;
  developerId: bigint;
}) {
  const developedByPredicateId = await createOrFetchThing({
    name: "developedBy",
    description:
      "Indicates that an entity was developed by a specific developer",
    url: "",
    image: "",
  });

  await createTriple(agentId, developedByPredicateId, developerId);
}
