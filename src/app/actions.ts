"use server";

import { redirect } from "next/navigation";
import { createRegistration } from "@/lib/registration/create-registration";
import { registrationSchema } from "@/lib/schemas";
import { AgentRegistrationFormData } from "@/app/types";

export async function registerAgent(formData: FormData) {
  // Extract all form fields and create nested structure
  const rawFormData: AgentRegistrationFormData = {
    developer: {
      name: formData.get("developer.name") as string,
      twitterHandle: formData.get("developer.twitterHandle")?.toString() ?? "",
      telegramHandle:
        formData.get("developer.telegramHandle")?.toString() ?? "",
    },
    agent: {
      name: formData.get("agent.name") as string,
      description: formData.get("agent.description") as string,
      primaryFunction: formData.get("agent.primaryFunction") as string,
      ethWallet: formData.get("agent.ethWallet") as string,
      twitterHandle: formData.get("agent.twitterHandle")?.toString() ?? "",
      tools: formData
        .get("agent.tools")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) as string[],
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
