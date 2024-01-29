"use client";

import { useRouter } from "next/navigation";
import { Form, FormEntries } from "~/app/_components/Events/Form";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { api } from "~/trpc/react";

export default function NewEventPage() {
  const router = useRouter();

  const { mutateAsync: createEvent, isLoading } = api.event.create.useMutation({
    onSuccess: (newEvent) => {
      console.log("Evento criado com sucesso!");
      router.push(`/admin/eventos/${newEvent.id}/imagens`);
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  async function handleSubmit(entries: FormEntries) {
    const newEvent = await createEvent(entries);

    return newEvent;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Novo Evento" />

      <div className="pt-4">
        <Form handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
