import { getGqlClient, multiVault } from "./client";

const gqlClient = getGqlClient();

type PinThingResponse = {
  pinThing: {
    uri: string;
  };
};

export async function createOrFetchThing(
  thing: Record<string, string | string[] | number>
): Promise<bigint> {
  const pinThingResult = await gqlClient.request<PinThingResponse>(
    `mutation Mutation_root($thing: PinThingInput!) {   pinThing(thing: $thing) {     uri   } }`,
    { thing }
  );

  const uri = pinThingResult.pinThing.uri;

  // check if we already have an atom for this data
  const atomId = await multiVault.getVaultIdFromUri(uri);
  if (atomId !== null && atomId !== 0n) {
    console.log("atom found:", atomId);
    return atomId;
  }

  // we don't have an atom yet, let's create it
  const result = await multiVault.createAtom({
    uri: uri,
  });

  console.log("atom created:", result.vaultId);
  return result.vaultId;
}

export async function createTriple(
  subjectId: bigint,
  predicateId: bigint,
  objectId: bigint
): Promise<bigint> {
  try {
    const result = await multiVault.createTriple({
      subjectId,
      predicateId,
      objectId,
    });
    return result.vaultId;
  } catch (error) {
    // If triple already exists, treat as success
    if (
      error instanceof Error &&
      error.message.includes("EthMultiVault_TripleExists")
    ) {
      return 0n;
    }
    throw error;
  }
}
