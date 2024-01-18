"use client";

import { api } from "~/trpc/react";
import LoadingIndicator from "../Shared/LoadingIndicator";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";

export function InfiniteEvents() {
  const eventsQuery = api.event.infiniteEvents.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const events = eventsQuery.data?.pages.flatMap((page) => page.events);

  if (eventsQuery.isLoading) return <LoadingIndicator />;
  if (eventsQuery.error) return <div>{eventsQuery.error.message}</div>;
  if (!eventsQuery.data)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Nenhum evento encontrado
      </p>
    );

  console.log(events);

  return (
    <div className="container py-12">
      <InfiniteScroll
        className="-m-4 flex flex-wrap"
        dataLength={eventsQuery.data.pages.length}
        next={eventsQuery.fetchNextPage}
        hasMore={eventsQuery.hasNextPage as boolean}
        loader={<LoadingIndicator />}
      >
        {(events ?? []).map((event) => (
          <Card
            key={event.id}
            event={{
              slug: event.slug,
              title: event.title,
              description: event.description,
              date: new Date(event.date),
              tags: event.eventTags.map((tag) => tag.tagId) as string[],
              images: event.eventImages.map((image) => image.url),
            }}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
