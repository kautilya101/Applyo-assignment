import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_JWT_KEY || "";

export function signJwt(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
