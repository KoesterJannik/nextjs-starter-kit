"use server";

import { signIn, signOut } from "../../../auth";

export async function logout() {
  await signOut();
}

export async function signInToApp(provider: string) {
  await signIn(provider, {
    redirectTo: "/dashboard",
  });
}
