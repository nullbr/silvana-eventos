import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  allTags: publicProcedure
    .input(z.object({ ids: z.array(z.string()).optional() }).optional())
    .query(async ({ input, ctx }) => {
      const tags = await ctx.db.tag.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        where: input?.ids ? { id: { in: input.ids } } : undefined,
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return { tags };
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input: { name }, ctx }) => {
      const existingTag = await ctx.db.tag.findFirst({
        where: { name },
      });

      if (existingTag != null) return;

      return await ctx.db.tag.create({
        data: {
          name,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: id, ctx }) => {
      return await ctx.db.tag.delete({
        where: { id },
      });
    }),
});
