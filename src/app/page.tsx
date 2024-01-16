"use client";

import CustomLink from "./_components/Shared/Link";
import { siteMetadata } from "~/server/siteMetadata";
import Card from "./_components/Events/Card";
import { api } from "~/trpc/react";

const MAX_DISPLAY = 5;

export default async function Home() {
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
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Recentes
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {!events.length && "Nenhum evento encontrado."}
            {events.slice(0, MAX_DISPLAY).map((event) => (
              <Card
                key={event.slug}
                event={{
                  ...event,
                  date: new Date(event.date),
                  tags: event.EventTags.map((tag) => tag.tagId),
                }}
              />
            ))}
          </div>
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
