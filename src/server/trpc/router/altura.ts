import { Altura } from "@altura/altura-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { SHA256 } from "crypto-js";
import { newCharacterTemplate } from "../../../features/character/constants/new-character";

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
        "0xc7e23bc42571735c1b5e9c00775de5103994efcf",
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
          if (!response.authenticated)
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Failed to authenticate user",
            });
          const newSessionId = SHA256(
            `${input.address}${Date.now()}`
          ).toString();
          return prisma.character.upsert({
            where: { walletAddress: input.address },
            create: {
              walletAddress: input.address,
              session: newSessionId,
              ...newCharacterTemplate,
            },
            update: { session: newSessionId },
          });
        })
        .then((response) => {
          return response;
        });
    }),
});
