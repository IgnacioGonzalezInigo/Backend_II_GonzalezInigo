import jwt from "jsonwebtoken";

export function signJwt(payload, secret, expiresIn = "1h") {
  return jwt.sign(payload, secret, { expiresIn });
}