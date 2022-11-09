import { router } from "../trpc";
import { alturaRouter } from "./altura";

export const appRouter = router({
  altura: alturaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
