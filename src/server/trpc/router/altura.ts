import { Altura } from "@altura/altura-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { SHA256 } from "crypto-js";
import {
  diceTemplate,
  newCharacterTemplate,
} from "../../../features/character/constants/new-character";
import { contractAddresses } from "../../../constants/contractAddresses";

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
        contractAddresses[5].abilityCollection,
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
              ...newCharacterTemplate,
              walletAddress: input.address,
              session: newSessionId,
              dice: {
                create: [
                  { ...diceTemplate, diceIndex: 0 },
                  { ...diceTemplate, diceIndex: 1 },
                  { ...diceTemplate, diceIndex: 2 },
                ],
              },
            },
            update: { session: newSessionId },
            include: { dice: { include: { sides: true } } },
          });
        })
        .then((response) => {
          altura
            .mintAdditionalSupply(
              contractAddresses[5].abilityCollection,
              2,
              6,
              input.address
            )
            .then((mintResponse) => {
              console.log("mintResponse", mintResponse);
              return altura.mintAdditionalSupply(
                contractAddresses[5].abilityCollection,
                3,
                6,
                input.address
              );
            })
            .then((mintResponse) => {
              console.log("mintResponse", mintResponse);
              return altura.mintAdditionalSupply(
                contractAddresses[5].abilityCollection,
                4,
                6,
                input.address
              );
            })
            .catch((error) => {
              console.log(error);
            });
          return response;
        });
    }),
});
