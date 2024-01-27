"use client";

import { useParams, useRouter } from "next/navigation";
import { Form } from "~/app/_components/Events/Form";
import LoadingIndicator from "~/app/_components/Shared/LoadingIndicator";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import NotFound from "~/app/not-found";
import { api } from "~/trpc/react";

export default function EventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const { data: event, isLoading } = api.event.find.useQuery({ id });
  const updateEvent = api.event.update.useMutation({
    onSuccess: () => {
      console.log("Evento atualizado com sucesso!");
      router.push("/admin/eventos");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    selectedTags: string[],
  ) {
    e.preventDefault();

    if (!event) return;

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      date: string;
      tags: string;
    };

    updateEvent.mutate({
      id: event.id,
      title: entries.title,
      slug: entries.title.toLowerCase().replace(/\s/g, "-"),
      date: new Date(entries.date),
      description: entries.description,
      tags: selectedTags,
    });
  }

  if (!event && !isLoading) return <NotFound />;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title={`Editar ${event?.title}`} />

      <div className="pt-4">
        {!event || isLoading ? (
          <LoadingIndicator />
        ) : (
          <Form event={event} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
