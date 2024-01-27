import type { Image as ImageType } from "@prisma/client";

export function ImagesList({ images }: { images: ImageType[] }) {
  return (
    <div>
      {images.map((image) => (
        <div className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <img
              className="h-48 w-full object-cover object-center"
              src={`/api/imagens/${image.fileName}`}
              alt={image.fileName}
            />

            <div className="p-4">
              <h3 className="text-base font-medium text-gray-900">
                {image.fileName}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
