import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { getAllAbilities } from "../../utils/altura";

export const characterRouter = router({
  get: publicProcedure
    .input(
      z.object({
        walletAddress: z.string().startsWith("0x"),
      })
    )
    .query(({ input }) => {
      const getPlayerResponse = prisma.character.findUnique({
        where: { walletAddress: input.walletAddress },
        include: { dice: { include: { sides: true } } },
      });
      return getPlayerResponse;
    }),
  getAllAbilitiesOnChain: publicProcedure
    .input(
      z.object({
        walletAddress: z.string().startsWith("0x"),
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return getAllAbilities({ walletAddress: input.walletAddress });
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(40),
      })
    )
    .mutation(({ input, ctx }) => {
      return prisma.character.update({
        where: {
          walletAddress: ctx.session.character.walletAddress,
        },
        data: { name: input.name },
      });
    }),
});
