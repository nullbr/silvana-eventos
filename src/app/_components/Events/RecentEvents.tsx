"use client";

import { api } from "~/trpc/react";
import { Card } from "./Card";
import CustomLink from "../Shared/Link";

const MAX_DISPLAY = 6;

export default function RecentEvents() {
  const events =
    api.event.infiniteEvents
      .useInfiniteQuery(
        {},
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      )
      .data?.pages?.flatMap((page) => page.events) ?? [];

  return (
    <>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {events.slice(0, MAX_DISPLAY).map((event) => (
            <Card
              key={event.slug}
              event={event}
              image={event.defaultImage ?? event.eventImages[0]}
              eventTags={event.eventTags}
              imageCount={event.eventImages.length}
            />
          ))}
        </div>
      </div>
      {events.length > MAX_DISPLAY && (
        <div className="flex justify-center text-base font-medium leading-6">
          <CustomLink
            href="/eventos"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Todos eventos"
          >
            Todos eventos &rarr;
          </CustomLink>
        </div>
      )}
    </>
  );
}
