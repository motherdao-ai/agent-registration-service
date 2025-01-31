import { getGqlClient, multiVault } from "./client";

const gqlClient = getGqlClient();

type PinThingResponse = {
  pinThing: {
    uri: string;
  };
};

export async function createOrFetchAtom(
  thing: Record<string, string | string[] | number>
): Promise<bigint> {
  // to identify our data in the intuition graph and storage
  const taggedThing = {
    ...thing,
    tag: "mother-dao",
  };

  const pinThingResult = await gqlClient.request<PinThingResponse>(
    `mutation Mutation_root($thing: PinThingInput!) {   pinThing(thing: $thing) {     uri   } }`,
    { thing: taggedThing }
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
  const result = await multiVault.createTriple({
    subjectId,
    predicateId,
    objectId,
  });

  return result.vaultId;
}
