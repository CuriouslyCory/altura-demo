import { Altura } from "@altura/altura-js";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
const altura = new Altura(process.env.ALTURA_KEY);

export const alturaRouter = router({
  getItem: publicProcedure
    .input(
      z.object({
        itemId: z.number(),
      })
    )
    .query(({ input }) => {
      const altura = new Altura(process.env.ALTURA_KEY);
      const itemResponse = altura.getItem(
        "0x2374b2380760e9ff066ef396ebbf752cc65c1ec3",
        input.itemId
      );
      return itemResponse;
    }),
  getUser: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(({ input }) => {
      const userResponse = altura.getUser(input.address);
      return userResponse;
    }),
  verifyAultraGuard: publicProcedure
    .input(
      z.object({
        address: z.string(),
        alturaGuard: z.string(),
      })
    )
    .mutation(({ input }) => {
      return altura
        .authenticateUser(input.address, input.alturaGuard)
        .then((response: { authenticated: boolean }) => {
          console.log("response", response);
          return response.authenticated;
        });
    }),
});
