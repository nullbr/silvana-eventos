import "server-only";

import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const getImageFromStorage = async (path: string) => {
  const bucket = getStorage().bucket();
  const file = bucket.file(path);
  const imageUrl = await getDownloadURL(file);

  return imageUrl;
};
