import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { Altura } from "@altura/altura-js";
import { contractAddresses } from "../../../constants/contractAddresses";

const altura = new Altura(process.env.ALTURA_KEY);

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
      const altura = new Altura(process.env.ALTURA_KEY);
      const alturaUser = await altura.getUser(input.walletAddress);
      const itemResponse = alturaUser
        .getItems(
          {}, // default options
          {
            collectionAddress: contractAddresses[5].abilityCollection,
          }
        )
        .then((getItemResponse) =>
          getItemResponse.items.map((ability) => ({
            tokenId: ability.tokenId,
            name: ability.name,
            userBalance: ability.userBalance,
            image: ability.imageUrl,
            properties: ability.properties,
            collectionAddress: ability.collectionAddress,
          }))
        ); // fetching items with the specified collection address only);
      return itemResponse;
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
