import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ input: { name, eventId }, ctx }) => {
      return await ctx.db.tag.create({
        data: {
          name,
          eventId,
        },
      });
    }),
});
