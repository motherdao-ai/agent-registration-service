"use server";

import { redirect } from "next/navigation";
import { createRegistration } from "@/lib/registration/create-registration";
import { registrationSchema } from "@/lib/schemas";

export async function registerAgent(formData: FormData) {
  // Extract all form fields and create nested structure
  const rawFormData = {
    developer: {
      name: formData.get("developer.name"),
      ...(formData.get("developer.twitterHandle") && {
        twitterHandle: formData.get("developer.twitterHandle"),
      }),
      ...(formData.get("developer.telegramHandle") && {
        telegramHandle: formData.get("developer.telegramHandle"),
      }),
    },
    agent: {
      name: formData.get("agent.name"),
      description: formData.get("agent.description"),
      primaryFunction: formData.get("agent.primaryFunction"),
      ethWallet: formData.get("agent.ethWallet"),
      ...(formData.get("agent.twitterHandle") && {
        twitterHandle: formData.get("agent.twitterHandle"),
      }),
      tools: formData
        .get("agent.tools")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    },
  };

  // Validate the data
  const validationResult = registrationSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.log(validationResult.error);
    throw new Error(
      "Validation failed: " +
        validationResult.error.errors.map((e) => e.message).join(", ")
    );
  }

  // Create registration with validated data
  await createRegistration(validationResult.data);

  // Redirect on success
  redirect("/register/success");
}
