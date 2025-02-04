import { configureClient, createServerClient } from "@0xintuition/graphql";
import { Multivault } from "@0xintuition/protocol";

import { publicClient, walletClient } from "../wallet/client";
import { config } from "../env";

export const multiVault = new Multivault({
  // @ts-expect-error unsure where typemismatch in versions is
  publicClient,
  walletClient,
});

export function getGqlClient() {
  configureClient({ apiUrl: config.intuitionApiUrl });
  return createServerClient({});
}
