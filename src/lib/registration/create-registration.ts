import { registrationSchema } from "../schemas";
import { createOrFetchAtom, createTriple } from "../intuition/atoms";

export async function createRegistration(dataToValidate: unknown) {
  console.log({ dataToValidate });
  const { data, success, error } = registrationSchema.safeParse(dataToValidate);
  if (error) {
    throw error;
  }

  if (success) {
    const agentThing = {
      name: data.agent.name,
      // optional properties
      primaryFunction: data.agent.primaryFunction,
      ethWallet: data.agent.ethWallet,
      ...(data.agent.twitterHandle && {
        twitterHandle: data.agent.twitterHandle,
      }),
      ...(data.agent.description && { description: data.agent.description }),
    };

    const devThing = {
      name: data.developer.name,
      // optional properties
      ...(data.developer.telegramHandle && {
        telegramHandle: data.developer.telegramHandle,
      }),
      ...(data.developer.twitterHandle && {
        twitterHandle: data.developer.twitterHandle,
      }),
    };

    const skillThings = data.agent.tools
      ? data.agent.tools.map((tool) => ({ skillName: tool }))
      : [];

    const developedByThing = {
      name: "developedBy",
    };

    const hasSkillThing = {
      name: "hasSkill",
    };

    //  craete things
    const agentId = await createOrFetchAtom(agentThing);
    const devId = await createOrFetchAtom(devThing);
    const skillsId = await Promise.all(skillThings.map(createOrFetchAtom));
    const developedByPredicateId = await createOrFetchAtom(developedByThing);
    const hasSkillPredicateId = await createOrFetchAtom(hasSkillThing);

    const addSkillTriple = (skillId: bigint) =>
      createTriple(agentId, hasSkillPredicateId, skillId);

    // add relationships

    const agentDevelopedById = await createTriple(
      agentId,
      developedByPredicateId,
      devId
    );

    const agentHasSkillsIds = await Promise.all(skillsId.map(addSkillTriple));

    return {
      agentHasSkillsIds,
      agentDevelopedById,
      agentId,
      devId,
      skillsId,
    };
  }
}
