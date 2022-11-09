import { Altura } from "@altura/altura-js";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .query(() => {
      const altura = new Altura(process.env.ALTURA_KEY);
      return altura.getItem("0x2374b2380760e9ff066ef396ebbf752cc65c1ec3", 2);
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});