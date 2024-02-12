import { initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLX0yeqImC7rHBuLPyrHLIALVSu_wEm5s",
  authDomain: "silvana-eventos.firebaseapp.com",
  projectId: "silvana-eventos",
  storageBucket: "silvana-eventos.appspot.com",
  messagingSenderId: "861173185601",
  appId: "1:861173185601:web:e5fbe7780dd2d124f15ac0",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadImagesToStorage({
  files,
}: {
  files: FileList;
}): Promise<UploadedImage[]> {
  const images = await Promise.all(
    Array.from(files).map(async (file) => uploadImageToStorage({ file })),
  );

  return images;
}

export async function uploadImageToStorage({
  file,
}: {
  file: File;
}): Promise<UploadedImage> {
  const fileName = formatFileName(file.name);
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return {
    url,
    fileName,
    extension: file.type,
  };
}

export function deleteImageFromStorage({ filename }: { filename: string }) {
  const storageRef = ref(storage, filename);
  deleteObject(storageRef)
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

export type UploadedImage = {
  fileName: string;
  url: string;
  extension: string;
};

function formatFileName(originalFileName: string) {
  const formattedFileName = originalFileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const finalFileName = formattedFileName.replace(/_+/g, "_").slice(0, 50);

  return finalFileName;
}
