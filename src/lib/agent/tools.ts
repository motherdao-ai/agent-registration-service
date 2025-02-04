import { createOrFetchThing, createTriple } from "../intuition/atoms";

/**
 * Creates tool/skill associations for an agent by creating triple relationships.
 * This function creates or fetches the necessary things (skills and predicate) and
 * establishes relationships between the agent and each tool/skill.
 *
 * @param {Object} params - The parameters for adding tools to an agent
 * @param {bigint} params.agentId - The ID of the agent to associate the tools with
 * @param {string[]} params.tools - Array of tool/skill names to associate with the agent
 * @returns {Promise<void>} A promise that resolves when all tools have been added
 *
 * @example
 * ```ts
 * await createToolsForAgent({
 *   agentId: 123n,
 *   tools: ["Python", "JavaScript", "React"]
 * });
 * ```
 */
export async function createToolsForAgent({
  agentId,
  tools,
}: {
  agentId: bigint;
  tools: string[];
}) {
  if (!tools || tools.length === 0) {
    return;
  }

  const hasSkillPredicateId = await createOrFetchThing({
    name: "hasSkill",
    description: "Indicates that an agent possesses a particular skill",
    url: "",
    image: "",
  });

  for (const tool of tools) {
    const skillId = await createOrFetchThing({
      name: tool,
      description: "A tool or skill that an agent can use",
      url: "",
      image: "",
    });

    await createTriple(agentId, hasSkillPredicateId, skillId);
  }
}
