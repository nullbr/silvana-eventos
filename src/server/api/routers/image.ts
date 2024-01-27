import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        eventId: z.string().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      }),
    )
    .query(async ({ input: { eventId }, ctx }) => {
      const images = await ctx.db.image.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        where: { eventId },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          fileName: true,
          url: true,
          default: true,
          event: { select: { id: true, title: true } },
        },
      });

      return { images };
    }),
});
