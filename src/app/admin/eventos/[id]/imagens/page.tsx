"use client";

import { useParams } from "next/navigation";
import LoadingIndicator from "~/app/_components/Shared/LoadingIndicator";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import NotFound from "~/app/not-found";
import { api } from "~/trpc/react";

export default function Images() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = api.image.all.useQuery({ eventId: id });
  const { data: event } = api.event.find.useQuery({ id });

  if (!id && !isLoading) return <NotFound />;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title={`Adicionar imagens a ${event?.title}`} />

      <div className="pt-4">
        {!event || isLoading ? <LoadingIndicator /> : <p>imagens</p>}
      </div>
    </div>
  );
}
