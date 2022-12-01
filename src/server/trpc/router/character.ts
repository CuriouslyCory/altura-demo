import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const characterRouter = router({
  getCharacter: publicProcedure.query(() => {
    const getPlayerResponse = prisma.character.findMany();
    return getPlayerResponse;
  }),
  createCharacter: publicProcedure
    .input(
      z.object({
        address: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.character.create({
        data: {
          name: input.name,
          hp: 10,
          mp: 0,
          exp: 0,
          walletAddress: input.address,
        },
      });
    }),
});
