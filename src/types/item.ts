export interface ItemRequestResponse {
  item: Item;
}

export interface Item {
  name: string;
  description: string;
  properties: ItemProperty[];
  unlockableContent: string;
  tokenId: number;
  collectionAddress: string;
  chainId: number;
  royalty: number;
  creatorAddress: string;
  mintDate: Date;
  stackable: boolean;
  supply: number;
  maxSupply: number;
  image: string;
  imageHash: string;
  imageUrl: string;
  fileType: string;
  isVideo: boolean;
  allImages: AllImage[];
  otherImageVisibility: string;
  holders: number;
  listers: number;
  likes: number;
  views: number;
  isListed: boolean;
  nsfw: boolean;
  isVerified: boolean;
  hasUnlockableContent: boolean;
  didLike: boolean;
  imageIndex: number;
  imageCount: number;
}

export interface AllImage {
  _id: string;
  imageHash: string;
  image: string;
  fileType: string;
  isVideo: boolean;
}

export interface ItemProperty {
  _id?: string;
  name: string;
  value: string;
  static: boolean;
}
