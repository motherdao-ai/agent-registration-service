import { registrationSchema } from "../schemas";
import { createOrFetchThing } from "../intuition/atoms";
import { createToolsForAgent } from "../agent/tools";
import { addTwitterHandle } from "../agent/twitter";
import { addTelegramHandle } from "../agent/telegram";
import { registerAgent } from "../agent/register";
import { addDeveloper } from "../agent/developer";

/**
 * Creates a new registration for an agent and its developer by validating input data
 * and establishing necessary relationships between entities.
 *
 * This function performs the following steps:
 * 1. Validates the input data against the registration schema
 * 2. Creates or fetches the agent entity with its properties
 * 3. Creates or fetches the developer entity
 * 4. Links the developer to the agent
 * 5. Adds optional properties (Twitter, Telegram, tools) if provided
 *
 * @param {unknown} dataToValidate - The raw input data to be validated against the registration schema
 * @returns {Promise<{ agentId: string }>} A promise that resolves to an object containing the created agent's ID
 * @throws {ZodError} If the input data fails schema validation
 *
 * @example
 * ```ts
 * const result = await createRegistration({
 *   developer: {
 *     name: "John Doe",
 *     twitterHandle: "@johndoe",
 *     telegramHandle: "johndoe123"
 *   },
 *   agent: {
 *     name: "AI Assistant",
 *     description: "A helpful AI agent",
 *     primaryFunction: "Customer Support",
 *     ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
 *     tools: ["Python", "JavaScript"]
 *   }
 * });
 * ```
 */
export async function createRegistration(dataToValidate: unknown) {
  console.log({ dataToValidate });
  const { data, success, error } = registrationSchema.safeParse(dataToValidate);
  if (error) {
    throw error;
  }

  if (success) {
    const { agent, developer } = data;

    // create the base entities, (this does an upsert)
    const agentId = await registerAgent({
      name: agent.name,
      description: agent.description,
      primaryFunction: agent.primaryFunction,
      ethWallet: agent.ethWallet,
    });

    const developerId = await createOrFetchThing({
      name: developer.name,
      description: "A software developer",
      url: "",
      image: "",
    });

    // link dev to the agent
    await addDeveloper({
      agentId,
      developerId,
    });

    // optional values for the agent
    if (agent.twitterHandle) {
      await addTwitterHandle({
        entityId: agentId,
        twitterHandle: agent.twitterHandle,
      });
    }

    if (agent.tools && agent.tools.length > 0) {
      await createToolsForAgent({
        agentId,
        tools: agent.tools,
      });
    }

    // developer optional values
    if (developer.twitterHandle) {
      await addTwitterHandle({
        entityId: developerId,
        twitterHandle: developer.twitterHandle,
      });
    }

    if (developer.telegramHandle) {
      await addTelegramHandle({
        entityId: developerId,
        telegramHandle: developer.telegramHandle,
      });
    }

    return {
      agentId: agentId.toString(),
    };
  }
}
