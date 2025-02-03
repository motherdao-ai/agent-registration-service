import { registrationSchema } from "../schemas";
import { createOrFetchThing, createTriple } from "../intuition/atoms";

export async function createRegistration(dataToValidate: unknown) {
  console.log({ dataToValidate });
  const { data, success, error } = registrationSchema.safeParse(dataToValidate);
  if (error) {
    throw error;
  }

  if (success) {
    const { agent, developer } = data;

    // upsert all `things`
    const agentId = await createOrFetchThing({
      name: agent.name,
      description: agent.description ? agent.description : "",
      url: "",
      image: "",
    });

    const primaryFunctionOfAgentId = await createOrFetchThing({
      name: agent.primaryFunction,
      description: "an action performed by something or somebody",
      url: "",
      image: "",
    });

    const ethWalletId = await createOrFetchThing({
      name: agent.ethWallet,
      description: "An ethereum compatible wallet address",
      url: "",
      image: "",
    });

    const developerId = await createOrFetchThing({
      name: developer.name,
      description: "A software developer",
      url: "",
      image: "",
    });

    // predicates
    const hasWalletPredicateId = await createOrFetchThing({
      name: "hasWallet",
      url: "",
      image: "",
      description: "",
    });

    const primaryFunctionPredicateId = await createOrFetchThing({
      name: "primaryFunction",
      url: "",
      image: "",
      description: "",
    });

    const usesTwitterHandlePredicateId = await createOrFetchThing({
      name: "usesXOrTwitterHandle",
      description: "",
      image: "",
      url: "",
    });

    const usesTelegranHandlePredicateId = await createOrFetchThing({
      name: "usesTelegramHandle",
      description: "",
      image: "",
      url: "",
    });

    const hasSkillPredicateId = await createOrFetchThing({
      name: "hasSkill",
      description: "Indicates that an agent possesses a particular skill",
      url: "",
      image: "",
    });

    // create relations
    await createTriple(
      agentId,
      primaryFunctionPredicateId,
      primaryFunctionOfAgentId
    );

    await createTriple(agentId, hasWalletPredicateId, ethWalletId);

    // optional values
    if (agent.twitterHandle) {
      const agentTwitterHandleId = await createOrFetchThing({
        name: agent.twitterHandle,
        description: "a X (twitter) user handle",
        image: "",
        url: "",
      });

      await createTriple(
        agentId,
        usesTwitterHandlePredicateId,
        agentTwitterHandleId
      );
    }

    if (developer.twitterHandle) {
      const devTwitterHandleId = await createOrFetchThing({
        name: developer.twitterHandle,
        description: "a X (twitter) user handle",
        image: "",
        url: "",
      });

      await createTriple(
        developerId,
        usesTwitterHandlePredicateId,
        devTwitterHandleId
      );
    }

    if (developer.telegramHandle) {
      const devTelegramHandleId = await createOrFetchThing({
        name: developer.telegramHandle,
        description: "a X (twitter) user handle",
        image: "",
        url: "",
      });

      await createTriple(
        developerId,
        usesTelegranHandlePredicateId,
        devTelegramHandleId
      );
    }

    if (agent.tools && agent.tools.length > 0) {
      for (const tool of agent.tools) {
        const skillId = await createOrFetchThing({
          name: tool,
          description: "A tool or skill that an agent can use",
          url: "",
          image: "",
        });

        await createTriple(agentId, hasSkillPredicateId, skillId);
      }
    }

    return {
      agentId: agentId.toString(),
    };
  }
}
