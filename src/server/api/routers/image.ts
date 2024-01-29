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
      });

      return { images };
    }),
  create: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        url: z.string(),
        default: z.boolean(),
        extension: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(({ input: image, ctx }) => ctx.db.image.create({ data: image })),
  createMultiple: protectedProcedure
    .input(
      z.object({
        images: z.array(
          z.object({
            fileName: z.string(),
            url: z.string(),
            default: z.boolean(),
            extension: z.string(),
            eventId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input: { images }, ctx }) => {
      const newImages = await ctx.db.image.createMany({
        data: images,
      });

      return newImages;
    }),
});
