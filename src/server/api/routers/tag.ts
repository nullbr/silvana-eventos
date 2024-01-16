import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  allTags: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db.tag.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return { tags };
  }),
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
