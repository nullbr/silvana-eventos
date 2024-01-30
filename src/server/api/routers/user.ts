import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  findByEmail: publicProcedure
    .input(z.object({ email: z.string().optional() }))
    .query(async ({ input: { email }, ctx }) => {
      const user = await ctx.db.user.findUnique({ where: { email } });

      if (user == null) {
        throw new Error("User not found");
      }

      return user;
    }),
});
