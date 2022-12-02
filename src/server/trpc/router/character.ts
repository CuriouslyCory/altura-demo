import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { newCharacterTemplate } from "../../../features/character/constants/new-character";

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
      });
      return getPlayerResponse;
    }),
  create: publicProcedure
    .input(
      z.object({
        address: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.character.create({
        data: {
          ...newCharacterTemplate,
          walletAddress: input.address,
        },
      });
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
