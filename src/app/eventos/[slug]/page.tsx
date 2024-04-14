// import Image from "next/image";
import { Header } from "~/app/_components/Events/Header";
import { api } from "~/trpc/server";

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await api.event.find.query({ slug: params.slug });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <Header
        title={event?.title ?? ""}
        tags={event?.eventTags.map((eventTag) => eventTag.tagId)}
        date={event?.date}
      />

      <div>
        <p className="pt-4 text-center text-lg leading-7 text-gray-500 dark:text-gray-400">
          {event?.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          {(event?.eventImages ?? []).map((image) => (
            <div
              key={image.id}
              className="h-56 w-56 overflow-hidden rounded-lg border border-gray-300 shadow-lg dark:border-gray-600"
            >
              {/* <Image */}
              <img
                // placeholder="blur"
                // blurDataURL="/images/default.jpeg"
                className="h-full w-full object-contain"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={`/api/imagens/${image.fileName}`}
                alt={image.fileName}
                height={224}
                width={224}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
