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
          defaultImageId: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { eventImages: true } },
          defaultImage: true,
          eventImages: true,
          eventTags: true,
          preview: true,
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
        defaultImageId: z.string().optional(),
        preview: z.boolean(),
      }),
    )
    .mutation(
      async ({
        input: {
          title,
          slug,
          description,
          date,
          tags,
          defaultImageId,
          preview,
        },
        ctx,
      }) => {
        const newEvent = await ctx.db.event.create({
          data: {
            title,
            slug,
            description,
            date,
            defaultImageId,
            preview,
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
  find: publicProcedure
    .input(z.object({ id: z.string().optional(), slug: z.string().optional() }))
    .query(({ input: { slug, id }, ctx }) => {
      if (!slug && !id) throw new Error("Must provide id or slug");

      return ctx.db.event.findUnique({
        where: { id, slug },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          date: true,
          createdAt: true,
          updatedAt: true,
          defaultImageId: true,
          defaultImage: true,
          eventImages: true,
          eventTags: true,
          preview: true,
        },
      });
    }),
  remove: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: id, ctx }) => {
      await ctx.db.event.update({
        where: { id },
        data: {
          defaultImageId: null,
        },
      });

      await ctx.db.image.deleteMany({ where: { eventId: id } });

      const result = await ctx.db.event.delete({ where: { id } });
      return result;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        date: z.date().optional(),
        tags: z.array(z.string()),
        defaultImageId: z.string().optional(),
        preview: z.boolean(),
      }),
    )
    .mutation(
      async ({
        input: {
          id,
          title,
          slug,
          description,
          date,
          tags,
          defaultImageId,
          preview,
        },
        ctx,
      }) => {
        const result = await ctx.db.event.update({
          where: { id },
          data: {
            title,
            slug,
            description,
            date,
            defaultImageId,
            preview,
          },
        });

        if (tags != null) {
          await ctx.db.eventTag.deleteMany({ where: { eventId: id } });
          await ctx.db.eventTag.createMany({
            data: tags.map((tag) => ({ eventId: id, tagId: tag })),
          });
        }

        return result;
      },
    ),
  updateDefaultImage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        defaultImageId: z.string().optional(),
      }),
    )
    .mutation(async ({ input: { id, defaultImageId }, ctx }) => {
      const result = await ctx.db.event.update({
        where: { id },
        data: {
          defaultImageId,
        },
      });

      return result;
    }),
});
