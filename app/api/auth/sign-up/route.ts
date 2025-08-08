import { NextRequest, NextResponse } from "next/server";
import { saveUser, findUser } from "@/lib/users";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const existing = await findUser(email);
  if (existing)
    return NextResponse.json({ error: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await saveUser({ id: Date.now().toString(), email, password: hashed });

  return NextResponse.json({ success: true });
}
