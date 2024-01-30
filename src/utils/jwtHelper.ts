import { encode, decode } from "next-auth/jwt";
import { env } from "../env.js";
import { JWT } from "next-auth/jwt";

export type AuthUser = { id: string; email: string } & JWT;

export const tokenOneDay = 24 * 60 * 60;
export const tokenOnWeek = tokenOneDay * 7;

const createJWT = (token: AuthUser, duration: number) =>
  encode({ token, secret: env.JWT_SECRET, maxAge: duration });

export const jwtHelper = {
  createAcessToken: (token: AuthUser) => createJWT(token, tokenOneDay),
  createRefreshToken: (token: AuthUser) => createJWT(token, tokenOnWeek),
  verifyToken: (token: string) => decode({ token, secret: env.JWT_SECRET }),
};
