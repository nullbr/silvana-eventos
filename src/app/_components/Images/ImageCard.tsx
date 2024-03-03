"use client";

import type { Image as ImageType } from "@prisma/client";
import { FaXmark } from "react-icons/fa6";
import { MdDragIndicator } from "react-icons/md";
import { deleteImageFromStorage } from "~/firebase/client/firebase";
import { ConfirmationModal } from "../Shared/ConfirmationModal";
import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";

export function ImageCard({ image }: { image: ImageType }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate } = api.image.delete.useMutation({
    onSuccess: () => {
      deleteImageFromStorage({ filename: image.fileName });
    },
  });

  function deleteImage() {
    setShowDeleteModal(false);
    mutate({ id: image.id });
  }

  return (
    <>
      <div className="h-56 w-56 overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-lg dark:border-gray-600 dark:bg-gray-700">
        <Image
          placeholder="blur"
          className="h-full w-full object-contain"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          src={`/api/imagens/${image.fileName}`}
          alt={image.fileName}
        />
        <div className="z-10 -mt-56 flex justify-between">
          <MdDragIndicator className="m-1 h-6 w-6 hover:text-blue-400 dark:hover:text-blue-200" />
          <button onClick={() => setShowDeleteModal(true)} type="button">
            <FaXmark className="m-1 h-6 w-6 hover:text-blue-400 dark:hover:text-blue-200" />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          onAccept={deleteImage}
          onCancel={() => setShowDeleteModal(false)}
          message="Realmente deseja excluir esta imagem? Esta ação é irreversível"
        />
      )}
    </>
  );
}
