"use client";

import { Form } from "~/app/_components/Images/Form";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import NotFound from "~/app/not-found";
import { api } from "~/trpc/react";
import { ImagesList } from "~/app/_components/Images/ImagesList";
import LoadingIndicator from "~/app/_components/Shared/LoadingIndicator";

export default function Images({ params }: { params: { id: string } }) {
  if (!params?.id) return <NotFound />;

  const {
    data: images,
    refetch,
    isLoading,
  } = api.image.all.useQuery({
    eventId: params.id,
  });
  const { data: event } = api.event.find.useQuery({ id: params.id });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title={`Adicionar imagens a ${event?.title}`} />

      <div className="pt-4">
        <Form eventId={params.id} refetchImages={refetch} />

        {!images && isLoading ? (
          <LoadingIndicator />
        ) : (
          <ImagesList images={images?.images ?? []} />
        )}
      </div>
    </div>
  );
}
