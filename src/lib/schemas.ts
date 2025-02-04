import { z } from "zod";

// Schemas

export const ethWalletSchema = z
  .string()
  .regex(/^0x[0-9a-fA-F]{40}$/, "Must be a valid Ethereum wallet address");

/**
 * twitter handles have to start with @, contain max 3-15 characters after @
 */
export const twitterHandleSchema = z
  .string()
  .regex(/^@[\w_]{3,15}$/, "Must be a valid Twitter handle")
  .max(15 + 1)
  .optional();

export const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  primaryFunction: z.string().min(1, "Primary function is required"),
  tools: z.array(z.string()).optional(),
  ethWallet: ethWalletSchema,
  twitterHandle: twitterHandleSchema.optional(),
});

export const developerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  twitterHandle: twitterHandleSchema.optional(),
  telegramHandle: z.string().min(1, "Telegram handle is required").optional(),
});

export const registrationSchema = z.object({
  developer: developerSchema,
  agent: agentSchema,
});

// Infered Types
export type EthWallet = z.infer<typeof ethWalletSchema>;
export type TwitterHandle = z.infer<typeof twitterHandleSchema>;
export type Agent = z.infer<typeof agentSchema>;
export type Developer = z.infer<typeof developerSchema>;
export type Registration = z.infer<typeof registrationSchema>;
