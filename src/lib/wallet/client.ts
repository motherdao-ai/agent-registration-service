import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { getPrivateKey } from "./get-private-key";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
  pollingInterval: 4000,
  name: "Intuition Wallet Client",
});

export const walletClient = createWalletClient({
  account: privateKeyToAccount(getPrivateKey()),
  chain: base,
  transport: http(),
  pollingInterval: 4000,
  name: "Intuition Wallet Client",
});
