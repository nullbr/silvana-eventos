import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";

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
  eventId,
}: {
  files: FileList;
  eventId: string;
}) {
  const images = await Promise.all(
    Array.from(files).map(async (file) =>
      uploadImageToStorage({ file, eventId }),
    ),
  );

  return images;
}

function formatFileName(originalFileName: string) {
  const formattedFileName = originalFileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const finalFileName = formattedFileName.replace(/_+/g, "_");

  return finalFileName;
}

export async function uploadImageToStorage({
  file,
  eventId,
}: {
  file: File;
  eventId: string;
}) {
  const fileName = formatFileName(file.name);
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return {
    url,
    fileName,
    extension: file.type,
    eventId: eventId,
    default: false,
  };
}
