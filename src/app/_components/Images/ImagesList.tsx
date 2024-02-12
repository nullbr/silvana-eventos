import type { Image as ImageType } from "@prisma/client";
import { ImageCard } from "./ImageCard";

export function ImagesList({ images }: { images: ImageType[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
