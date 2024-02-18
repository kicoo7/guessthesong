import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export const MAX_NUMBER_ROUNDS = 10;
export const CORRECT_ANSWER_POINTS = 100;
export const WRONG_ANSWER_POINTS = 0;

export async function getSessionOrFail() {
  const session = await auth();
  let validSession = null;

  const SessionSchema = z.object({
    user: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    access_token: z.string(),
    refresh_token: z.string(),
    error: z.null().optional(),
  });

  try {
    validSession = SessionSchema.parse(session);
  } catch (e) {
    console.error("Error in getSessionOrFail(): ", e);
    redirect("/");
  }

  return validSession;
}
