"use server";

import { cookies } from "next/headers";
import { VERIFICATION_COOKIE } from "@/lib/storage";

const VERIFICATION_MAX_AGE = 30 * 86400;

/** Sets HttpOnly verification cookie — readable on the server in layout.tsx */
export async function setVerificationCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(VERIFICATION_COOKIE, "1", {
    path: "/",
    maxAge: VERIFICATION_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

export async function clearVerificationCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(VERIFICATION_COOKIE);
}
