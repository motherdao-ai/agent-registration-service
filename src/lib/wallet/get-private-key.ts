import { isAddress } from "viem";

export const getPrivateKey = () => {
  if (!process.env.PRIVATE_KEY) {
    throw "PRIVATE_KEY not set";
  }

  if (!isAddress(process.env.PRIVATE_KEY)) {
    throw new Error("PRIVATE_KEY is wrong fomat");
  }

  return process.env.PRIVATE_KEY;
};
