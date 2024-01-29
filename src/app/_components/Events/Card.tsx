"use client";

import type {
  Event,
  EventTag,
  Image as ImageType,
  Tag as TagType,
} from "@prisma/client";
import Link from "../Shared/Link";
import Tag from "../Shared/Tag";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

export function Card({
  event,
  eventTags,
  image,
}: {
  event: Event;
  eventTags: EventTag[];
  image?: ImageType;
}) {
  const { slug, date, title, description } = event;
  const imgSrc = image
    ? `/api/imagens/${image.fileName}`
    : "/images/default.jpeg";
  const href = `/eventos/${slug}`;
  const [tags, setTags] = useState<TagType[]>([]);
  const { data: tagsQuery } = api.tag.allTags.useQuery();

  useEffect(() => {
    if (!tagsQuery) return;

    const eventTagIds = eventTags.map((tag) => tag.tagId);
    const tagObjects = eventTagIds.map(
      (tagId) => tagsQuery?.tags.find((tag) => tag.id === tagId),
    ) as TagType[];

    setTags(tagObjects);
  }, [tagsQuery, eventTags]);

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && "h-full"
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc && (
          <Link href={href} aria-label={`Link to ${title}`}>
            <img
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        )}
        <div className="p-6">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString()}
              </time>
            </dd>
          </dl>
          <h2 className="my-3 text-2xl font-bold leading-8 tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag.name} />
            ))}
          </div>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Ver mais &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
