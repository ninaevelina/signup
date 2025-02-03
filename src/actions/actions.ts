"use server";

import { userSchema } from "@/lib/schema";
import { Inputs } from "@/lib/types";

export async function addUser(data: Inputs) {
  const result = userSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
