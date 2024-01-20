import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  paginatedEvents: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
      }),
    )
    .query(async ({ input: { limit = 10, page = 1 }, ctx }) => {
      const events = await ctx.db.event.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });
      const eventsCount = await ctx.db.event.count();
      const pages = Math.ceil(eventsCount / limit);

      return { events, pages, size: eventsCount };
    }),
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
          updatedAt: true,
          _count: { select: { eventImages: true } },
          eventImages: true,
          eventTags: true,
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
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(
      async ({ input: { title, slug, description, date, tags }, ctx }) => {
        const newEvent = await ctx.db.event.create({
          data: {
            title,
            slug,
            description,
            date,
            userId: ctx.session.user.id,
          },
        });

        if (tags != null) {
          await ctx.db.eventTag.createMany({
            data: tags.map((tag) => ({ eventId: slug, tagId: tag })),
          });
        }

        return {
          ...newEvent,
          eventTags: tags,
        };
      },
    ),
  find: publicProcedure.input(z.string()).query(({ input: slug, ctx }) =>
    ctx.db.event.findUnique({
      where: { slug },
      include: {
        eventImages: true,
        eventTags: true,
      },
    }),
  ),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: id, ctx }) => {
      const result = await ctx.db.event.delete({ where: { id } });
      return result;
    }),
});
