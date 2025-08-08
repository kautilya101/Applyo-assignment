import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const decoded = verifyJWT(token);
  return decoded;
}
