"use client";

import { uploadImageToStorage } from "~/firebase/client/firebase";
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
  const { mutate, isLoading } = api.image.create.useMutation({
    onSuccess: () => {
      refetchImages();
    },
  });

  async function uploadFiles() {
    setUploading(true);

    if (!files || files.length === 0) return;

    const uploadedFiles = await uploadImageToStorage({ files, eventId });

    console.log("uploadedFiles", uploadedFiles);

    mutate({ images: uploadedFiles });
    setUploading(false);
    setFiles(null);
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:gap-4">
      <div>
        <h3>Adicionar novo</h3>
        <div className="mb-4 text-sm text-gray-500">JPG ou PNG</div>
      </div>

      <div className="flex flex-1 gap-2">
        <input
          className="focus:border-primary focus:shadow-te-primary m-0 flex w-full min-w-0 flex-auto rounded-lg border border-gray-200 bg-white bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:bg-gray-100 hover:file:bg-neutral-200 focus:text-neutral-700 focus:outline-none focus:ring-4 focus:ring-gray-200"
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
    </div>
  );
}
