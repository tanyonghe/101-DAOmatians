import { DEFAULT_AVATAR_URL } from "../constants/homepage";

export const getImage = (imageUrl) => {
  if (!imageUrl) {
    imageUrl = DEFAULT_AVATAR_URL;
  }
  if (imageUrl.startsWith("ipfs://")) {
    const [_, id] = imageUrl.split("ipfs://");
    imageUrl = "https://cloudflare-ipfs.com/ipfs/" + id;
  }
  return imageUrl;
};
