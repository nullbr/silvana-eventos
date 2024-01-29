"use client";

import { uploadImagesToStorage } from "~/firebase/client/firebase";
import { Button } from "../Shared/Button";
import { api } from "~/trpc/react";
import { useState } from "react";

export function Form({
  eventId,
  refetchImages,
}: {
  eventId: string;
  refetchImages: () => void;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = api.image.createMultiple.useMutation({
    onSuccess: () => {
      refetchImages();
    },
  });

  async function uploadFiles() {
    setUploading(true);

    if (!files || files.length === 0) return;

    const uploadedFiles = await uploadImagesToStorage({ files, eventId });

    mutate({ images: uploadedFiles });
    setUploading(false);
    setFiles(null);
  }

  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="files"
      >
        Adicionar
      </label>
      <div className="flex flex-1 gap-2">
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          id="files"
          name="files"
          onChange={(e) => setFiles(e.target.files)}
        />

        <Button
          name="Enviar"
          style="green"
          onAction={uploadFiles}
          loading={isLoading || uploading}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        PNG, JPG, JPEG.
      </p>
    </div>
  );
}
