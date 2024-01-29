import type { Image as ImageType } from "@prisma/client";

export function ImagesList({ images }: { images: ImageType[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="h-56 w-56 overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-lg dark:border-gray-600 dark:bg-gray-700"
        >
          <img
            className="h-full w-full object-contain"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={`/api/imagens/${image.fileName}`}
            alt={image.fileName}
          />
        </div>
      ))}
    </div>
  );
}
