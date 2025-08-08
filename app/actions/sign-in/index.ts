"use server";
import { findUser } from "@/lib/users";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { IUser } from "@/types";
import { cookies } from "next/headers";

export async function signInAction(data: IUser) {
  const { email, password } = data;
  const user = await findUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { sucess: false, error: "Invalid credentials", status: 401 };
  }

  const token = signJwt({ id: user.id, email: user.email });

  const res = { success: true };
  const cookiesStore = await cookies();
  cookiesStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
