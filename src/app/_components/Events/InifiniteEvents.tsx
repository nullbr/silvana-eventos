"use client";

import { api } from "~/trpc/react";
import LoadingIndicator from "../Shared/LoadingIndicator";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "./Card";

export function InfiniteEvents() {
  const eventsQuery = api.event.infiniteEvents.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const events = eventsQuery.data?.pages.flatMap((page) => page.events) ?? [];

  if (eventsQuery.isLoading) return <LoadingIndicator />;
  if (eventsQuery.error) return <div>{eventsQuery.error.message}</div>;

  return (
    <div className="container py-12">
      <InfiniteScroll
        className="-m-4 flex flex-wrap"
        dataLength={eventsQuery.data.pages.length}
        next={eventsQuery.fetchNextPage}
        hasMore={eventsQuery.hasNextPage ?? false}
        loader={<LoadingIndicator />}
      >
        {events.map((event) => (
          <Card
            key={event.slug}
            event={event}
            image={event.defaultImage ?? event.eventImages[0]}
            eventTags={event.eventTags}
            imageCount={event.eventImages.length}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
