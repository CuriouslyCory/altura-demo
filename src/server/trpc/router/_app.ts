import { router } from "../trpc";
import { alturaRouter } from "./altura";
import { characterRouter } from "./character";

export const appRouter = router({
  altura: alturaRouter,
  character: characterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
