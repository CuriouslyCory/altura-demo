import { Altura } from "@altura/altura-js";
import { contractAddresses } from "../../constants/contractAddresses";

type GetAllAbilitiesParams = {
  walletAddress: string;
};

export const getAllAbilities = async ({
  walletAddress,
}: GetAllAbilitiesParams) => {
  const altura = new Altura(process.env.ALTURA_KEY);
  const alturaUser = await altura.getUser(walletAddress);
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
  ("");
};
