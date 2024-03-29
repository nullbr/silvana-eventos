import { eventRouter } from "~/server/api/routers/event";
import { createTRPCRouter } from "~/server/api/trpc";
import { tagRouter } from "./routers/tag";
import { imageRouter } from "./routers/image";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  tag: tagRouter,
  image: imageRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
