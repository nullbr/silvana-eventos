import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async ({ input: { title, description, date }, ctx }) => {
      return await ctx.db.event.create({
        data: {
          title,
          description,
          date,
          userId: ctx.session.user.id,
        },
      });
    }),
});
