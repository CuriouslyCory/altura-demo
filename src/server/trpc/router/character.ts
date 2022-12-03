import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

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
  updateName: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(40),
        walletAddress: z.string().startsWith("0x"),
        session: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.character.update({
        where: {
          walletAddress_session: {
            walletAddress: input.walletAddress,
            session: input.session,
          },
        },
        data: { name: input.name },
      });
    }),
});
