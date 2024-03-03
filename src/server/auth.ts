import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import type { AuthUser } from "~/utils/jwtHelper";
import { jwtHelper, tokenOnWeek, tokenOneDay } from "~/utils/jwtHelper";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // credentials provider:  Save the access token and refresh token in the JWT on the initial login
      if (user) {
        const authUser = { id: user.id, email: user.email } as AuthUser;

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() / 1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() / 1000 + tokenOnWeek;

        return {
          ...token,
          accessToken,
          refreshToken,
          accessTokenExpired,
          refreshTokenExpired,
          user: authUser,
        };
      } else {
        if (token) {
          // In subsequent requests, check access token has expired, try to refresh it
          if (Date.now() / 1000 > token.accessTokenExpired) {
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken) {
              const user = await db.user.findFirst({
                where: {
                  email: (token.user as AuthUser).email,
                },
              });

              if (user) {
                const accessToken = await jwtHelper.createAcessToken(
                  token.user as AuthUser,
                );
                const accessTokenExpired = Date.now() / 1000 + tokenOneDay;

                console.log("refresh token", accessToken);
                console.log("refresh token", accessTokenExpired);

                return { ...token, accessToken, accessTokenExpired };
              }
            }

            return { ...token, error: "RefreshAccessTokenError" };
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          email: (token.user as AuthUser).email,
          id: (token.user as AuthUser).id,
        };
      }
      session.error = token.error;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "next-auth",
      name: "Login with email",
      async authorize(credentials, _req) {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (user && credentials) {
            const validPassword = await bcrypt.compare(
              credentials?.password,
              user.password ?? "",
            );

            if (validPassword) {
              return {
                id: user.id,
                name: user.name,
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
