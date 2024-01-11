import "server-only";

import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const getImageFromStorage = async (path: string) => {
  const bucket = getStorage().bucket();
  const file = bucket.file(path);
  const imageUrl = await getDownloadURL(file);

  return imageUrl;
};

export const uploadImageToStorage = async (path: string, file: Buffer) => {
  const bucket = getStorage().bucket();
  const fileRef = bucket.file(path);

  await fileRef.save(file, {
    contentType: "image/jpeg",
  });

  const imageUrl = await getDownloadURL(fileRef);

  return imageUrl;
};
