import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  infiniteEvents: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      }),
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const events = await ctx.db.event.findMany({
        take: limit + 1,
        cursor: cursor ? { id_createdAt: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          date: true,
          createdAt: true,
          _count: { select: { EventImages: true } },
          EventImages: {
            select: { id: true, fileName: true, url: true },
          },
          EventTags: {
            select: { id: true, tagId: true },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (events.length > limit) {
        const nextItem = events.pop();
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }

      return { events, nextCursor };
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        date: z.date(),
      }),
    )
    .mutation(async ({ input: { title, slug, description, date }, ctx }) => {
      return await ctx.db.event.create({
        data: {
          title,
          slug,
          description,
          date,
          userId: ctx.session.user.id,
        },
      });
    }),
});